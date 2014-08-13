/*jshint node:true*/

'use strict';

var http = require('http');
var request = require('request');

function get(url, callback) {
    request(url, function (error, response, body) {
	    callback(error, response, body);
    });
}

function parse(uri) {
    var parsedUri = uri.scheme.name + '://' + uri.path;
    var items = uri.query.items;
    if (items && items.length > 0) {
        var queryString = '';
        for (var j = 0; j < items.length; j++) {
            if (items[j].enabled) {
                queryString += items[j].name + '=' + items[j].value;
            }
        }
        parsedUri += '?' + queryString;
    }
    return parsedUri;
}

module.exports = {
    get: get,
    parse: parse
};