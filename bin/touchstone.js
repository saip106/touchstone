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

        function callback(response) {
            console.log(response.statusCode);
        }

        for(var i = 0; i < nodes.length; i++) {

            if(nodes[i].type !== 'Request') return;
            
            var request = nodes[i].request;
            if(request.name === 'GET') {
                var url = request.scheme.name + '://' + request.uri.path;
                helper.get(url, callback);
            }
            else {
                console.log('some other method: ' + request.name);
            }
        }
    }

    run();

}.call(this));
