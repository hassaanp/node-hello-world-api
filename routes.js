/**
 * Defines all the routes for the API
 */

// Dependencies
var handlers = require('./handlers');

var router = {
    'hello': handlers.hello
};

module.exports = router;