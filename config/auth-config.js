var request = require("request")
var jwt = require('jsonwebtoken')

module.exports = function() {
    var toExport = {};

    // JWT config and options
    var payload = {
        aud: "e0PzlflGINFV63b7aSmSilNptz4h5mbq",
        scopes: {
            users: {
                actions: [
                    "create",
                    "update"
                ]
            }
        }
    };
    var secret = new Buffer('FISLGHAIK19rmlwk-cjdlfoag93404l2mfsldoc13494021-120', 'base64')
    var options = {
        algorithm: 'HS256'
    };

    toExport.JWT_OPTIONS = {
        secret: new Buffer('XHfu_XH6xLTI9hlpPhlGT7Fw4NXOtzVfNZdyF5HMYwGSBftLtXfbThAL-Ht9WfIr', 'base64'),
        audience: 'B7azUx2b1k13rkoxzLDDjQ0cCfG0E9Kg',
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Basic') {
              return req.headers.authorization.split(' ')[1];
            } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
              return req.query.token;
            }
            return null;
        }
    };

    toExport.JWT_OPTIONS_INTERNAL = {
        secret: 'password',
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Basic') {
              return req.headers.authorization.split(' ')[1];
            } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              return req.headers.authorization.split(' ')[1];
            } else if (req.headers.authorization) {
              return req.headers.authorization
            } else if (req.query && req.query.token) {
              return req.query.token;
            }
            return null;
        }
    };

    return toExport;

}
