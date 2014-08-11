#!/usr/bin/env node
/*jshint node:true*/

'use strict';

var program = require('commander');
var helper = require('../lib/helper');

program
    .version('0.0.1')
    .usage('[options]')
    .option('-f, --filepath [filepath]', 'path of the file that contains test json data')
    .parse(process.argv);

if(!program.filepath) {
    program.help();
}
else {
    var testFilePath = program.filepath;
    console.log(testFilePath);
    var input = require(testFilePath);

    var nodes = input.nodes;
    for(var i = 0; i < nodes.length; i++) {
        helper.get(nodes[i].request.scheme.name + '://' + nodes[i].request.uri.path, function (response) {
            console.log(response.statusCode);
        });
    }
}

