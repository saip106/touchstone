/*jshint node:true*/

'use strict';

var http = require('http');

function get(url) {
    http.get(url, function(response) {
        return response;
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = {
    get: get
};