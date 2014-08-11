'use strict';

var http = require('http');
var request = require('request');

function get(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body)
        }
    });
}

module.exports = {
    get: get
};