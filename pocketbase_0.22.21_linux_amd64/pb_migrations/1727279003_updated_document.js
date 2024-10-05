/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  // remove
  collection.schema.removeField("ubcroxrx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5fhnkmjo",
    "name": "field",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w0odi73uugcjn8v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubcroxrx",
    "name": "field",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "application/pdf"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 11883378,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("5fhnkmjo")

  return dao.saveCollection(collection)
})
