/*
 * analytics.js - Report and log events
 * fusiform.logger - a server for reporting and logging events and errors
 * Notes:
 *  -
 * Issues:
 *  -
 */

module.exports = function(app, router) {

  var tvConfig = app.get('tvConfig');

  // Announce a new event
  router.post('/', app.get('jwtCheckInternal'), function(req, res) {
    if (!req.body.event) {
      // Must specify an event name
      res.status(400);
      res.json({
        success: false,
        message: "Must specify an event name"
      });
    } else if (!req.body.user) {
      // Must specify a user id
      res.status(400);
      res.json({
        success: false,
        message: "Must specify a user id"
      });
    } else {
      // If all required fields are there, log the event...
      var doc = {
        "event": req.body.event,
        "timestamp": Date.now(),
        "user": req.body.user
      }
      app.get('tv').documents.create(
        tvConfig.TV_ANALYTICS_VAULT_ID,
        tvConfig.TV_ANALYTICS_SCHEMA_ID,
        doc,
        function(err, document_id) {
          if (!err) {
            res.status(200);
            res.json({
              success: true,
              document_id: doc
            });
          } else {
            res.status(400);
            res.json({
              success: false,
              message: err
            });
          }
        });
    }
  });

  // Get a full summary of events
  router.post('/summary', app.get('jwtCheckInternal'), function(req, res) {
    if (!req.body.event) {
      // Must specify an event name
      res.status(400);
      res.json({
        success: false,
        message: "Must specify an event name."
      });
    } else if (!req.body.user) {
      // Must specify a user id
      res.status(400);
      res.json({
        success: false,
        message: "Must specify a user id."
      });
    } else {
      var search_option = {
        "filter": {
          "timestamp": {
            "type": "gte",
            "value": "0",
            "case_sensitive": true
          },
          "user": {
            "type": "eq",
            "value": req.body.user,
            "case_sensitive": true
          },
          "event": {
            "type": "eq",
            "value": req.body.event,
            "case_sensitive": true
          }
        },
        "filter_type": "and",
        "full_document": false,
        "schema_id": tvConfig.TV_ANALYTICS_SCHEMA_ID
      }
      if (req.body.since) {
        req.body.since = parseInt(req.body.since);
        search_option.filter["timestamp"] = {
          "type": "gte",
          "value": Date.now()-(req.body.since*24*3600*1000),
          "case_sensitive": true
        }
      }
      // Search for any existing digest documents
      app.get('tv').search.runQuery(tvConfig.TV_ANALYTICS_VAULT_ID, search_option,
        function(err, info, documents) {
          if (err) {
            // If something went wrong...
            res.status(400);
            res.json({
              success: false,
              message: err
            });
          } else {
            res.status(200);
            res.json({
              success: true,
              message: documents
            });
          }
        });
    }
  });

  return router;
}
