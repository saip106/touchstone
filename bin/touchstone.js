#!/usr/bin/env node
/*jshint node:true*/

(function () {
    'use strict';

    var commander = require('commander');
    var commandLineArgsReader = require('../lib/command-line-args-reader');
    var validator = require('../lib/args-validator');
    var webRequestsProcessor = require('../lib/web-requests-processor');

    function run () {
        var args = commandLineArgsReader.read();
        validator.validate(args);
        webRequestsProcessor.process(args.filepath);
    }

    run();

}.call(this));
