/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zhawyvrc",
    "name": "field2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  // remove
  collection.schema.removeField("zhawyvrc")

  return dao.saveCollection(collection)
})
