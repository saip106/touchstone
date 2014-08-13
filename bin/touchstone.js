#!/usr/bin/env node
/*jshint node:true*/

(function () {
    'use strict';

    var commander = require('commander');
    var helper = require('../lib/helper');

    function run() {
        var args = readCommandLineArgs();
        validate(args);
        processInputFile(args.filepath);
    }

    function readCommandLineArgs() {
        commander
            .version('0.0.1')
            .usage('[options]')
            .option('-f, --filepath [filepath]', 'path of the file that contains test json data')
            .parse(process.argv);

        return {
            filepath: commander.filepath
        }
    }

    function validate(args) {
        if(!args.filepath) {
            commander.help();
            process.exit(1);
        }
    }

    function processInputFile(filepath) {
        var input = require(filepath);

        var nodes = input.nodes;

        function callback(error, response, body, options) {
	        if (!error && response.statusCode === 200) {
		        console.log(options.url + " success");
	        }
	        else {
		        console.log(options.url + response.statusCode);
	        }
        }

        for(var i = 0; i < nodes.length; i++) {

            if(nodes[i].type !== 'Request') {
                continue;
            }
            
            if (nodes[i].method.name === 'GET') {
                var options = {
                    url: helper.parseUrl(nodes[i].uri),
                    headers: helper.extractHeaders(nodes[i].headers)
                };
                helper.get(options, callback);
            }
        }
    }

    run();

}.call(this));
