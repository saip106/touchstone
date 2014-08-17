'use strict';

var commander = require('commander');

function read() {
    commander
        .version('0.0.1')
        .usage('[options]')
        .option('-f, --filepath [filepath]', 'path of the file that contains test json data')
        .parse(process.argv)

    return {
        filepath: commander.filepath
    }
}

module.exports = {
    read: read
}