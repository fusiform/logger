// Create a new conversations vault

var config = require('../config/tv-config.js')
var schemas = require('../config/schemas.js');

var tvInterface = require('tv-interface')(config.PROD);

var fs = require('fs');
var path = require('path');

tvInterface.vaults.create("conversations", function(err, vault_id) {
  console.log("Conversations vault created: " + vault_id);
  if (!err) {
    tvInterface.schemas.create(vault_id, schemas.CONVERSATION,
      function(err, schema_id) {
      if (!err) {
        console.log("Conversation schema added with ID: " + schema_id);
        tvInterface.schemas.getAll(vault_id, function(err, schemas) {
          if (!err) {
            console.log(schemas);
            config.PROD.TV_CONVO_VAULT_ID = vault_id;
            config.PROD.TV_CONVO_SCHEMA_ID = schema_id;
            // Write to file
            var filename = 'tv-config.js'
            var file = path.join("../config", filename);
            config = JSON.stringify(config, null, 2)
            var out = "module.exports = " + config
            fs.writeFileSync(file, out);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});
