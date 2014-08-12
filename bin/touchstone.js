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
            helper.get(nodes[i].request.scheme.name + '://' + nodes[i].request.uri.path, callback);
        }
    }

    run();
}.call(this));
