/*
 * .js
 * fusiform.authentication -
 * Notes:
 *  -
 * Issues:
 *  -
 */

// ### Export Express routes.
module.exports = function(app, router) {

    router.get('/status', function(req, res) {

        res.status(200);
        res.json({
            success: true,
            message: "Healthy :3"
        });
    });

    router.post('/post', function(req, res) {
        console.log(req.body)
        res.status(200);
        res.json({
            success: true,
            message: "hello world"
        });
    });
    return router;
}
