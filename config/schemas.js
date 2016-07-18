// TrueVault Document schemas
module.exports = {
  ANALYTICS : {
    "name": "analytics",
    "fields": [
      {
        "name": "event",
        "index": true,
        "type": "string"
      },
      {
        "name": "timestamp",
        "index": true,
        "type": "string"
      },
      {
        "name": "user",
        "index": true,
        "type": "string"
      }
    ]
  }
}
