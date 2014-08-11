#!/usr/bin/env node
/*jshint node:true*/

'use strict';

var program = require('commander');

program
    .version('0.0.1')
    .usage('<keywords>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
}
else {
    console.log(process.argv);
}

var fileJSON = require('../test/sample.json');
