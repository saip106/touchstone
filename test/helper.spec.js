/*jshint node:true, strict:false*/
/*globals describe, it, beforeEach*/
'use strict';

var assert = require("assert");
var helper = require('../lib/helper');

describe('when extracting a url', function () {

    var url;
    beforeEach(function (done) {
        url = {
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
        it('should successfully parse the url', function () {
            var result = helper.parseUrl(url);
            assert.equal(result, 'http://localhost:8080');
        });
    });

    describe('with query params', function () {
        it('should successfully parse the url', function () {

            url.query.items.push({
                enabled: true,
                name: 'foo',
                value: 'bar'
            });

            url.query.items.push({
                enabled: true,
                name: 'token',
                value: '123'
            });

            var result = helper.parseUrl(url);
            assert.equal(result, 'http://localhost:8080?foo=bar&token=123');
        });

        describe('with query params defined in the url itself', function () {
            it('should successfully parse the url', function () {

                url.query = undefined;
                url.path = 'localhost:8080?patientKey=4'

                var result = helper.parseUrl(url);
                assert.equal(result, 'http://localhost:8080?patientKey=4');
            });
        });
    });
});

describe('when extracting headers', function () {
    it('should get proper http headers', function () {
        var headers = [{
                enabled: true,
                name: 'token',
                value: '123'
            },
            {
                enabled: true,
                name: 'clientName',
                value: 'foo'
            }];
        var result = helper.extractHeaders(headers);
        assert.equal(result.token, '123');
        assert.equal(result.clientName, 'foo');
    });
});