
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;

describe('General Methods', () => {
    const urlToStrip = 'https://zeindelf.com/foo/bar';
    const emailToPassTest = 'zeindelf@hotmail.com';
    const emailToNotPassTest = 'zeindelf@hotmail';
    const queryStringUrl = 'http://www.site.com?param1=foo&param2=bar&param3=baz';

    const stripHost = globalHelpers.stripHost(urlToStrip);
    const stripHttp = globalHelpers.stripHttp(urlToStrip);
    const isEmail = globalHelpers.isEmail(emailToPassTest);
    const isNotEmail = globalHelpers.isEmail(emailToNotPassTest);
    const getUrlParameter1 = globalHelpers.getUrlParameter('param1', queryStringUrl);
    const getUrlParameter2 = globalHelpers.getUrlParameter('param2', queryStringUrl);
    const unserialize = globalHelpers.unserialize(queryStringUrl);

    it('url strip host', (done) => {
        expect(stripHost).to.equal('/foo/bar');
        done();
    });

    it('url strip http', (done) => {
        expect(stripHttp).to.equal('//zeindelf.com/foo/bar');
        done();
    });

    it('query string param', (done) => {
        expect(getUrlParameter1).to.equal('foo');
        expect(getUrlParameter2).to.equal('bar');
        done();
    });

    it('unserialize query string', (done) => {
        expect(unserialize).to.deep.equal({param1: 'foo', param2: 'bar', param3: 'baz'});
        done();
    });
});
