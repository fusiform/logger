/*
 * error.js - error handling middleware, for pretty error on bad requests
 * fusiform.tvaccess - a server for connecting to Truevault
 * Author: Alex Mathews
 * Notes:
 *  -
 * Issues:
 *  -
 */

module.exports = function(err, req, res, next) {
    console.log("In error middleware");
    console.log(err)
    console.log(typeof err);
    if (err instanceof SyntaxError) {
        console.log(err.message)
        res.status(400);
        res.json({
            success: false,
            message: "Malformed request - " + err.message
        });
        next()
    } else if (err.name) {
        if (err.name == "UnauthorizedError") {
            if (err.code) {
                if (err.code == 'credentials_required') {
                    res.status(401);
                    res.json({
                        success: false,
                        message: "No token provided."
                    });
                } else if (err.code == 'invalid_token') {
                    res.status(401);
                    res.json({
                        success: false,
                        message: "Invalid token."
                    });
                }
            } else {
                res.status(401);
                res.json({
                    success: false,
                    message: "Unexpected Authentication Error."
                });
            }
        } else {
            res.status(500);
            res.json({
                success: false,
                message: "An unexpected error occured."
            });
        }
    } else {
        res.status(500);
        res.json({
            success: false,
            message: "An unexpected error occured."
        });
    }

    next();
};
