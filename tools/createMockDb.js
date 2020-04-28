/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { songs, authors, poets, artists, genres, keys, logs } = mockData;
const data = JSON.stringify({
  songs,
  authors,
  poets,
  artists,
  genres,
  keys,
  logs,
});
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
