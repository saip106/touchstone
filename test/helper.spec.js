/*jshint node:true, strict:false*/
/*globals describe, it, beforeEach*/
'use strict';

var assert = require("assert");
var helper = require('../lib/helper');

describe('when parsing a uri', function () {

    var uri;
    beforeEach(function (done) {
        uri = {
            scheme: {
                name: 'http'
            },
            path: 'localhost:8080',
            query: {
                items: []
            }
        };
        done();
    });

    describe('without any query params', function () {
        it('should successfully parse the uri', function () {
            var result = helper.parse(uri);
            assert.equal(result, 'http://localhost:8080');
        });
    });

    describe('with query params', function () {
        it('should successfully parse the uri', function () {

            uri.query.items.push({
                enabled: true,
                name: 'foo',
                value: 'bar'
            })

            var result = helper.parse(uri);
            assert.equal(result, 'http://localhost:8080?foo=bar');
        });
    });
});