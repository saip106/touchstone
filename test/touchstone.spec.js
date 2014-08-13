/*jshint node:true, strict:false*/
/*globals describe, it*/

'use strict';

var assert = require("assert");
var helper = require('../lib/helper');

describe('when accessing touchstone', function () {
    it('should be defined', function () {
        assert.notEqual(helper, undefined, "undefined");
        assert.notEqual(helper, null, "null");
        assert.equal(typeof helper, 'object', 'not an object');
    });
});

describe('when making a GET request to google.com', function() {
    it('should get a 200 status code', function() {
        helper.get('http://www.google.com', function (response) {
            assert.equal(response.statusCode, '200', 'Status code is not ok');
        });
    });
});

