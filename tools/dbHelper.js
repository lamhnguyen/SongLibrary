function getBy(db, name, key, value) {
  const chain = db.get(name);

  const resource = chain.find((obj) => obj[key] == value).value();
  return resource;
}

function getById(db, name, id) {
  if (!id) return null;

  const chain = db.get(name);

  const resource = chain.getById(id).value();
  return resource;
}

function getByIds(db, name, ids) {
  if (ids.length == 0) return [];

  const chain = db.get(name);

  const resources = chain
    .filter((obj) => ids.find((id) => id == obj.id))
    .value();

  return resources;
}

function getBySlug(db, name, slug) {
  return getBy(db, name, "slug", slug);
}

function insert(db, name, data) {
  const chain = db.get(name);

  const resource = chain.insert(data).value();
  return resource;
}

function update(db, name, data) {
  let chain = db.get(name);
  const id = data.id;

  const resource = chain.replaceById(id, data).value();
  return resource;
}

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = { getBy, getById, getByIds, getBySlug, insert, update };
