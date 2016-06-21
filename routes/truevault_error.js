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
      load = app.get('webhookConfig').truevault_payload
      load['text'] = "*IP Address*: " + req.body.address + "\n"
      + "*Error*: " + req.body.message
      // console.log(load);

      // Write error to log
      var timestamp = new Date(Date.now()+1000*60*60).toISOString();
      var log_message = timestamp + ", "
        + req.body.address + ", "
        + req.body.message + "\n"
      fs.open(app.get('webhookConfig').logs.truevault_log, 'a', 0666, function(e, id) {
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
