/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const dbFile = path.join(__dirname, "db.json");
const router = jsonServer.router(dbFile);
const queryString = require("querystring");
const _ = require("lodash");
const fs = require("fs");

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
/*
server.use(function (req, res, next) {
  setTimeout(next, 2000);
});
*/

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.post("/songs/", function (req, res, next) {
  const error = validateSong(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.name); // Generate a slug for new songs.
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Constants
const VIEW_SIZE = 1;

const VIEW_NEW = "new";
const VIEW_POPULAR = "popular";
const VIEW_LIKE = "like";
const VIEW_RANDOM = "random";

const ORDER_ASC = "asc";
const ORDER_DESC = "desc";

const SORT_BY_NAME = "name";
const SORT_BY_VIEWS = "views";
const SORT_BY_LIKES = "likes";

const COLUMN_NAME = "name";
const COLUMN_SLUG = "slug";
const COLUMN_VIEWS = "views";
const COLUMN_LIKES = "likes";
const COLUMN_CREATE_DATE = "createDate";
const COLUMN_UPDATE_DATE = "updateDate";

// Helpers
const toNumber = (value, defaultValue) => {
  return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
};

function parseJson(str) {
  return _.attempt(JSON.parse.bind(null, str));
}

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (err) {
    throw new Error("readFile failed - File: " + filePath);
  }
}

function findById(arr, id) {
  if (!id) return null;

  return _.find(arr, (item) => item.id == id);
}

function getById(arr, id) {
  const item = findById(arr, id);
  if (!item) throw new Error("Item cannot be found - id: " + id);

  return item;
}

function findBySlug(arr, slug) {
  if (!slug) return null;

  return _.find(arr, (item) => item.slug == slug);
}

function getBySlug(arr, slug) {
  const item = findBySlug(arr, slug);
  if (!item) throw new Error("Item cannot be found - slug: " + slug);

  return item;
}

function filterByIds(arr, ids) {
  return _.filter(arr, (item) => _.includes(ids, item.id));
}

function getDb() {
  const data = readFile(dbFile);
  const db = parseJson(data);

  return db;
}

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateSong(song) {
  if (!song.name) return "Name is required.";
  return "";
}

router.render = (req, res) => {
  if (res.statusCode === 200) {
    if (req.path === "/songs" || req.path === "/songs/") {
      const db = getDb();

      const filter = parseSongFilter(db, req);
      console.log(filter);

      const songs = getSongs(db, filter);
      res.jsonp(songs);
    } else {
      res.jsonp(res.locals.data);
    }
  }
};

const parseSongFilter = (db, req) => {
  const {
    view,
    author,
    poet,
    artist,
    start,
    sort,
    order,
    pageSize,
  } = queryString.parse(req._parsedUrl.query);

  return {
    view: view ? getView(view) : null,
    author: author ? getBySlug(db.authors, author) : null,
    poet: poet ? getBySlug(db.poets, poet) : null,
    artist: artist ? getBySlug(db.artists, artist) : null,
    start: toNumber(start, 0),
    sort: getSortColumn(sort),
    order: getSortOrder(order),
    pageSize: toNumber(pageSize, 25),
  };
};

function getView(view) {
  switch (view.toLowerCase()) {
    case VIEW_NEW:
    case VIEW_POPULAR:
    case VIEW_LIKE:
    case VIEW_RANDOM:
      return view.toLowerCase();
    default:
      throw new Error("Unsupported view: " + view);
  }
}

function getSortColumn(sort) {
  if (!sort) return COLUMN_SLUG;

  switch (sort.toLowerCase()) {
    case SORT_BY_NAME:
      return COLUMN_SLUG;
    case SORT_BY_LIKES:
      return COLUMN_LIKES;
    case SORT_BY_VIEWS:
      return COLUMN_VIEWS;
    default:
      throw new Error("Unsupported sort column: " + sort);
  }
}

function getSortOrder(order) {
  if (!order) return ORDER_ASC;

  switch (order.toLowerCase()) {
    case ORDER_ASC:
    case ORDER_DESC:
      return order.toLowerCase();
    default:
      throw new Error("Unsupported sort order: " + order);
  }
}

function getAllSongs(db) {
  const songs = db.songs.map(function (s) {
    return {
      id: s.id,
      name: s.name,
      slug: s.slug,
      genre: findById(db.genres, s.genreId),
      key: findById(db.keys, s.keyId),
      authors: filterByIds(db.authors, s.authorIds),
      poets: filterByIds(db.poets, s.poetIds),
      artists: filterByIds(db.artists, s.artistIds),
      preview: s.preview,
      lyrics: s.lyrics,
      views: s.views,
      likes: s.likes,
    };
  });

  return songs;
}

function filterSongs(songs, filter) {
  // By view
  if (filter.view) {
    let sort;
    let order;

    switch (filter.view) {
      case VIEW_NEW:
        sort = COLUMN_CREATE_DATE;
        order = ORDER_DESC;
        break;
      case VIEW_POPULAR:
        sort = COLUMN_VIEWS;
        order = ORDER_DESC;
        break;
      case VIEW_LIKE:
        sort = COLUMN_LIKES;
        order = ORDER_DESC;
        break;
    }

    if (sort) {
      return _(songs).orderBy([sort], [order]).take(VIEW_SIZE).value();
    } else {
      // radom
      return _(songs).shuffle().take(VIEW_SIZE).value();
    }
  }

  // By author
  if (filter.author)
    return _.filter(
      songs,
      (s) => findById(s.authors, filter.author.id) != null
    );

  // By poet
  if (filter.poet)
    return _.filter(songs, (s) => findById(s.poets, filter.poet.id) != null);

  // By artist
  if (filter.artist)
    return _.filter(
      songs,
      (s) => findById(s.artists, filter.artist.id) != null
    );

  return songs;
}

function getSongs(db, filter) {
  const songs = getAllSongs(db);

  const filteredSongs = filterSongs(songs, filter);

  const sortedSongs = filter.sort
    ? _(filteredSongs).orderBy([filter.sort], [filter.order]).value()
    : filteredSongs;

  if (filter.start >= filteredSongs.length) return [];

  const pageSize =
    filter.start + filter.pageSize > filteredSongs.length
      ? filteredSongs.length - filter.start
      : filter.pageSize;

  const pagedSongs = _(sortedSongs).drop(filter.start).take(pageSize).value();

  return pagedSongs;
}
