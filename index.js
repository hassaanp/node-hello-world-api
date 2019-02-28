/**
 * Main file for the API
 */

// Dependencies
var http = require('http');
var { URL } = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var router = require('./routes');
var handlers = require('./handlers');
var config = require('./config');

var httpServer = http.createServer(function(req, res){
    // get url and parse it
    var parsedUrl = new URL(req.url, config.host);

    // get path from the url
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/|\/$/g,'');
    
    // get query params
    var queryParams = {};
    for(var key of parsedUrl.searchParams.keys()){
        queryParams[key] = parsedUrl.searchParams.getAll(key);
    }

    // get method
    var method = req.method.toLowerCase();

    // get headers
    var headers = req.headers;

    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = ''
    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();
        
        // select handler
        var selectedHandler = router[trimmedPath] ? router[trimmedPath]: handlers.notFound;
        
        // create the data object to send to handler
        var data = {
            trimmedPath: trimmedPath,
            queryParams: queryParams,
            method: method,
            headers: headers,
            payload: buffer
        };
        
        // invoke the router handler if it exists or call not found
        selectedHandler(data, function(statusCode, payload){
            // use statusCode or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode :  200;

            // use payload returned or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};
            
            // stringify payload
            payloadStringified = JSON.stringify(payload);
            
            // set response headers
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadStringified);
            console.log('Returned this response: ', statusCode ,payloadStringified);
        })
    });
});

httpServer.listen(config.port, function(){
    console.log(`Server listening on port ${config.port} in ${config.name}`);
})