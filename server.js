/*
 * server.js - main server logic
 * fusiform.tvaccess - a server for connecting to Truevault
 * Author: Alex Mathews
 * Notes:
 *  - set FSFRM_ENV to DEV for port 8000
 *  - set FSFRM_ENV to PROD for port 3000
 * Issues:
 *  -
 */

var express = require('express')
var morgan = require('morgan')
var cors = require('cors')
var bodyParser = require('body-parser');
var fs = require('fs');

// Start application and declare default port
var app = express()
var jwt = require('express-jwt');
var port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Determine port to listen from based off environment variable
if (process.env.FSFRM_ENV && process.env.FSFRM_ENV == "PROD") {
    console.log("Running in PRODUCTION MODE");
    var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));
    port = 3000;
    var tvConfig = require('./config/tv-config.js').PROD;

} else {
    console.log("Running in DEV MODE");
    app.use(morgan('dev'));
    var tvConfig = require('./config/tv-config.js').DEV;

    // Dev logging configuration for better traceback
    ['log', 'warn'].forEach(function(method) {
        var old = console[method];
        console[method] = function() {
            var stack = (new Error()).stack.split(/\n/);
            if (stack[0].indexOf('Error') === 0) {
                stack = stack.slice(1);
            }
            var args = [].slice.apply(arguments).concat([stack[1].trim()]);
            return old.apply(console, args);
        };
    });
}

// Configurations and Interfaces ===============================================

// Webhook
var webhookConfig = require('./config/webhook-config.js')
app.set('webhookConfig', webhookConfig);

// Authorization (JWT check)
var authConfig = require('./config/auth-config.js');
var jwtCheck = jwt(authConfig().JWT_OPTIONS);
app.set('jwtCheck', jwtCheck);
var jwtCheck_i = jwt(authConfig().JWT_OPTIONS_INTERNAL);
app.set('jwtCheckInternal', jwtCheck_i);

// TrueVault
app.set('tvConfig', tvConfig);
var tv = require('tv-interface')(tvConfig);
app.set('tv', tv);
app.set('schemas', require('./config/schemas.js'));

// Routes ======================================================================

// Add route logic
app.use('/health', require('./routes/health')(app, express.Router()));
app.use('/user', require('./routes/user_error')(app, express.Router()));
app.use('/service', require('./routes/server_error')(app, express.Router()));
app.use('/truevault', require('./routes/truevault_error')(app, express.Router()));
app.use('/analytics', require('./routes/analytics')(app, express.Router()));

// Error parsing middleware - because standard errors are no bueno
app.use(require('./errors'));

// Begin listening and print successful startup
app.listen(port);
console.log("Startup sucessful. Running on " + port + ".");
