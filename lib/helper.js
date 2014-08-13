/*jshint node:true*/

'use strict';

var http = require('http');
var request = require('request');

function get(options, callback) {
    request(options, function (error, response, body) {
	    callback(error, response, body, options);
    });
}

function parseUrl(uri) {
    var parsedUri = uri.scheme.name + '://' + uri.path;
    if(uri.query) {
        var items = uri.query.items;
        if (uri.query && items.length > 0) {
            var queryString = '';
            for (var j = 0; j < items.length; j++) {
                if (items[j].enabled) {
                    queryString += items[j].name + '=' + items[j].value;
                }
            }
            parsedUri += '?' + queryString;
        }
    }
    return parsedUri;
}

function extractHeaders(headers) {
    var result = {};
    for(var i = 0; i < headers.length; i++) {
        if(headers[i].enabled) {
            result[headers[i].name] = headers[i].value;
        }
    }
    return result;
}

module.exports = {
    get: get,
    parseUrl: parseUrl,
    extractHeaders: extractHeaders
};