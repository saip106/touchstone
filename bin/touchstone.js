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

        function callback(error, response, body) {
	        if (!error && response.statusCode === 200) {
		        console.log(body);
	        }
	        else {
		        console.log('Error');
	        }
        }

        for(var i = 0; i < nodes.length; i++) {

            if(nodes[i].type !== 'Request') continue;
            
            if (nodes[i].method.name === 'GET') {

	            try {
		            var url = nodes[i].uri.scheme.name + '://' + nodes[i].uri.path;
		            var items = nodes[i].uri.query.items;
		            if (items.length > 0) {
			            var queryString;
			            for (var j; j < items.length; j++) {
				            if (items[j].enabled) {
					            queryString += items[j].name + '=' + items[j].value;
				            }
			            }
			            url += '?' + queryString;
		            }
		            helper.get(url, callback);
	            }
	            catch (error) {
		            console.log(nodes[i]);
	            }

            }
            else {
                //console.log('some other method: ' + nodes[i].method.name);
            }
        }
    }

    run();

}.call(this));
