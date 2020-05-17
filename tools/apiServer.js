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
const jwt = require("jsonwebtoken");
const helper = require("./helper");
const dbHelper = require("./dbHelper");

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Authenticate
server.use(function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token) return next();

  token = token.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, function (err, user) {
    if (err) {
      res.status(401).send(err);
    } else {
      //set the user to req so other routes can use it
      req.user = user;
      next();
    }
  });
});

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

server.get("/songs/", function (req, res, next) {
  if (hasSongFilter(req)) {
    const db = router.db;

    const filter = parseSongFilter(db, req);
    const songs = getSongs(db, filter);

    res.jsonp(songs);
  } else next();
});

server.get("/songs/:slug", function (req, res) {
  const db = router.db;
  let song = dbHelper.getBy(db, "songs", "slug", req.params.slug);

  if (song) {
    res.jsonp(song);
  } else {
    res.sendStatus(404);
  }
});

server.post("/songs/", function (req, res, next) {
  const error = validateSong(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = helper.slugify(req.body.name); // Generate a slug for new songs.
    next();
  }
});

server.post("/users/", function (req, res /*, next*/) {
  const db = router.db;
  const userDto = req.body;

  const authId = userDto.authId;
  let user = dbHelper.getBy(db, "users", "authId", authId);

  // create or update user
  user = user
    ? dbHelper.update(db, "users", { ...userDto, id: user.id })
    : dbHelper.insert(db, "users", userDto);

  user.token = generateToken(user);

  res.status(200);
  res.locals.data = user;

  router.render(req, res);
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Constants
const VIEW_SIZE = 100;

const VIEW_NEW = "new";
const VIEW_POPULAR = "popular";
const VIEW_LIKE = "like";
const VIEW_RANDOM = "random";

const ORDER_ASC = "asc";
const ORDER_DESC = "desc";

const SORT_BY_NAME = "name";
const SORT_BY_VIEWS = "views";
const SORT_BY_LIKES = "likes";

const COLUMN_SLUG = "slug";
const COLUMN_VIEWS = "views";
const COLUMN_LIKES = "likes";
const COLUMN_CREATE_DATE = "createDate";

// Security helpers
const JWT_SECRET = "secret";
const JWT_EXPIRES_IN = 60 * 60 * 24; //  24 hours

function generateToken(user) {
  var payload = {
    id: user.id,
    name: user.name,
    roles: user.roles,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
}

// Song
function validateSong(song) {
  if (!song.name) return "Name is required.";
  return "";
}

const hasSongFilter = (req) => {
  const { pageSize } = queryString.parse(req._parsedUrl.query);
  return pageSize ? true : false;
};

const parseSongFilter = (db, req) => {
  const {
    view,
    author,
    poet,
    artist,
    search,
    start,
    sort,
    order,
    pageSize,
  } = queryString.parse(req._parsedUrl.query);

  return {
    view: view ? getView(view) : null,
    author: author ? dbHelper.getBySlug(db, "authors", author) : null,
    poet: poet ? dbHelper.getBySlug(db, "poets", poet) : null,
    artist: artist ? dbHelper.getBySlug(db, "artists", artist) : null,
    search,
    start: helper.toNumber(start, 0),
    sort: getSortColumn(sort),
    order: getSortOrder(order),
    pageSize: helper.toNumber(pageSize, 25),
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

function getExpandedSongs(db) {
  const songs = dbHelper.get(db, "songs").map((s) => {
    return {
      id: s.id,
      name: s.name,
      slug: s.slug,
      genre: dbHelper.getById(db, "genres", s.genreId),
      key: dbHelper.getById(db, "keys", s.keyId),
      authors: dbHelper.getByIds(db, "authors", s.authorIds),
      poets: dbHelper.getByIds(db, "poets", s.poetIds),
      artists: dbHelper.getByIds(db, "artists", s.artistIds),
      preview: s.preview,
      lyrics: s.lyrics,
      views: s.views,
      likes: s.likes,
    };
  });

  return songs;
}

function slugifySong(s) {
  return (
    "NAME-" +
    s.slug +
    (s.authors.length > 0
      ? "-AUTHORS-" + s.authors.map((i) => i.slug).join("-")
      : "") +
    (s.poets.length > 0
      ? "-POETS-" + s.poets.map((i) => i.slug).join("-")
      : "") +
    (s.artists.length > 0
      ? "-ARTISTS-" + s.artists.map((i) => i.slug).join("-")
      : "") +
    "-LYRICS-" +
    helper.slugify(s.lyrics.replace(/ *\[[^\]]*]/g, "")) // Remove chords (e.g. [Am]) from the lyrics
  );
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
      (s) => helper.findById(s.authors, filter.author.id) != null
    );

  // By poet
  if (filter.poet)
    return _.filter(
      songs,
      (s) => helper.findById(s.poets, filter.poet.id) != null
    );

  // By artist
  if (filter.artist)
    return _.filter(
      songs,
      (s) => helper.findById(s.artists, filter.artist.id) != null
    );

  // Search
  if (filter.search)
    return _.filter(songs, (s) => {
      const slug = slugifySong(s);
      return slug.includes(filter.search);
    });

  return songs;
}

function getSongs(db, filter) {
  const songs = getExpandedSongs(db);

  const filteredSongs = filterSongs(songs, filter);

  const sortedSongs = filter.sort
    ? _(filteredSongs).orderBy([filter.sort], [filter.order]).value()
    : filteredSongs;

  const count =
    filter.start + filter.pageSize > filteredSongs.length
      ? filteredSongs.length - filter.start
      : filter.pageSize;

  const pagedSongs =
    count > 0 ? _(sortedSongs).drop(filter.start).take(count).value() : [];

  const result = {
    meta: {
      start: filter.start,
      count,
      pageSize: filter.pageSize,
      totalCount: filteredSongs.length,
    },
    songs: pagedSongs.map((song) =>
      dbHelper.get(db, "songs").find((s) => s.id === song.id)
    ),
  };

  return result;
}
