// Create a new conversations vault

var config = require('../config/tv-config.js')
var schemas = require('../config/schemas.js');

var tvInterface = require('tv-interface')(config.PROD);

var fs = require('fs');
var path = require('path');

tvInterface.documents.get(config.PROD.TV_CONVO_VAULT_ID, "d9dfdeb5-b79c-44ac-9a20-a256044890e6", function(error, reply) {
  console.log("ERROR: " + error);
  console.log("REPLY: " + JSON.stringify(reply));
})
