'use strict';

var helper = require('../lib/helper');

function process(filepath) {
    var input = require(filepath);
    var nodes = input.nodes;

    function callback (error, response, body, options) {
        if(!error && response.statusCode === 200) {
            console.log(options.url + " success");
        }
        else {
            console.log(options.url + ' failed with error code: ' + response.statusCode);
        }
    }

    for(var i = 0; i < nodes.length; i++) {

        if(nodes[i].type !== 'Request') {
            continue;
        }

        if(nodes[i].method.name === 'GET') {
            var options = {
                url : helper.parseUrl(nodes[i].uri),
                headers : helper.extractHeaders(nodes[i].headers)
            };
            helper.get(options, callback);
        }
    }
}

module.exports = {
    process: process
}