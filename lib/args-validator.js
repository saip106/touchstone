'use strict';

var commander = require('commander');

function validate(args) {
    if(!args.filepath) {
        commander.help();
        process.exit(1);
    }
}

module.exports = {
    validate: validate
}