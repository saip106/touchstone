/*jshint node:true*/

'use strict';

var http = require('http');
var request = require('request');

function get(url, callback) {
    request(url, function (error, response, body) {
	    callback(error, response, body);
    });
}

module.exports = {
    get: get
};