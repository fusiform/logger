var forever = require('forever-monitor');
var request = require('request');
var ip = require('ip');

var child = new(forever.Monitor)('server.js', {
    'env': {
        'FSFRM_ENV': 'PROD'
    },
    'minUptime': 2000
});

var report_error = function (message) {
    var options = {
        method: 'POST',
        url: 'https://api.fusiform.co/errors/service/',
        method: 'POST',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: {
            server_id: process.env.HOSTNAME,
            app_name: 'messaging',
            message: message

        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) {
            console.log("error reporting error ");
        }
    });
}


child.on('start', function() {
    report_error('Started up');
});

child.on('restart', function() {
    report_error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    report_error('Forever detected script exited with code ' + code);
});

child.start()
