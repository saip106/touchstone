/*jshint node:true, strict:false*/
/*globals describe, it*/

'use strict';

var assert = require("assert");
var touchstone = require('../lib/touchstone');

describe('when accessing touchstone', function () {
    it('should be defined', function () {
        assert.notEqual(touchstone, undefined, "undefined");
        assert.notEqual(touchstone, null, "null");
        assert.equal(typeof touchstone, 'object', 'not an object');
    });
});

describe('when making a GET request to google.com', function() {
    it('should get a 200 status code', function() {
        touchstone.get('http://www.google.com', function (response) {
            assert.equal(response.statusCode, '200', 'Status code is not ok');
        });
    });
});