/**
 * Defines all the routes for the API
 */

// Dependencies
var handlers = require('./handlers');

var router = {
    'hello': { handler: handlers.hello, method: 'post'}
};

module.exports = router;