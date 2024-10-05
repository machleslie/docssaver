/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
