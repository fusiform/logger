/*
 * user_error.js - Errors from the front end/users
 * fusiform.logger - a server for reporting and logging errors
 * Notes:
 *  -
 * Issues:
 *  -
 */

module.exports = function(app, router) {

    var request = require('request');
    var fs = require('fs');

    router.post('/', function(req, res) {

      // console.log(req.body.message);
      load = app.get('webhookConfig').service_payload
      load['text'] = "*Server*: " + req.body.server_id + "\n"
      + "*Application*: " + req.body.app_name + "\n"
      + "*Error*: " + req.body.message
      // console.log(load);

      // Write error to log
      var timestamp = new Date(Date.now()).toISOString();
      var log_message = timestamp + ", "
        + req.body.server_id + ", "
        + req.body.app_name + ", "
        + req.body.message + "\n"
      fs.open(app.get('webhookConfig').logs.service_log, 'a', 0666, function(e, id) {
        fs.write(id, log_message, null, 'utf8', function() {
          fs.close(id, function(){
            console.log('Error written to log');
          });
        });
      });

      request({
        url: app.get('webhookConfig').url,
        method: 'POST',
        form: {
          payload: JSON.stringify(load)
        }
      }, function (err, response) {
        if (err) {
          // console.log('Failed to post');
          res.send({
            'success': false,
            'message': 'Error not reported successfully'
          });
        } else {
          // console.log('Successful post');
          res.send({
            'success': true,
            'message': 'Error reported successfully'
          });
        }
      });
    });

    return router;
}
