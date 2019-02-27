/**
 * Business logic for handling calls sent to the router
 */
var handlers = {};

// the hello handler
handlers.hello = function(data, callback){
    callback(200, { message: "Hello world!"});
}

// the not found handler
handlers.notFound = function(data, callback){
    callback(404, {message:"requested route not found"});
}

module.exports = handlers;