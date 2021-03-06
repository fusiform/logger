// Delete a vaults and all their contents

var config = require('../config/tv-config.js')
var async = require('async');

var tvInterface = require('tv-interface')(config.PROD);

var vault_ids;

if (process.argv.length == 3) {
    vault_ids = [process.argv[2]];
} else {
    /**
     * CHANGE THESE VALUES TO CLEAR A VAULT
     */
    vault_ids = [
      "f2407e5f-4fb1-429c-b6c0-6c01d9ec3915"
    ];
}


vault_ids.forEach(function(vault_id, index, arr) {
    console.log("deleting vault_id " + vault_id);
    var willDelete = [tvInterface.documents, tvInterface.blobs, tvInterface.schemas];
    var tasks = [];

    willDelete.forEach(function(toDelete, index, arr) {
        tasks.push(function(callback) {
            toDelete.deleteAll(vault_id, function(error, results, success) {
                if (error) {
                    callback(error, results);
                } else if (!success) {
                    callback(new Error("Did not delete all "), results);
                } else {
                    callback(null, true);
                }
            });
        });
    });
    async.series(tasks, function(err, results) {
        console.log(results)
        var flag = true;
        results.forEach(function(value, index, arr) {
            if (!value) {
                flag = false;
            }
        });
        if (!flag) {
            console.log("Failed to delete all.")
        } else {
            tvInterface.vaults.delete(vault_id, function(error, results) {
                if(error) {
                    throw error;
                } else {
                    console.log("SUCCESS");
                }
            });
        }
    });

}) ;
