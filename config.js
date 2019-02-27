/**
 * The configuration for the API
 */
var environments = {};

// Defining staging environment
environments.staging = {
    port: 3000,
    host: 'https://localhost',
    name: 'staging'
};

// Defining production environment
environments.production = {
    port: 5000,
    host: 'https://localhost',
    name: 'production'
}

// Determine which environment should be exported
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments['staging'];

module.exports = environmentToExport;