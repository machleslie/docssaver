/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iEXWyen` ON `document` (\n  `reponameandowner`,\n  `field`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  collection.indexes = []

  return dao.saveCollection(collection)
})
