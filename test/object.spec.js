
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;

describe('Object Methods', () => {
    const objToCount = {foo: 'Foo', bar: 'Bar', baz: 'Baz'};
    const objToExtendOne = {foo1: 'Foo 1', bar1: 'Bar 1'};
    const objToExtendTwo = {foo2: 'Foo 2', bar2: 'Bar 2'};
    const objToSearch = [{
        id: 0,
        name: 'key 0',
        children: [{
            id: 1,
            name: 'key 1',
            children: [{
                id: 2,
                name: 'key 2',
                item: [{
                    id: 3,
                    name: 'key 3'
                }],
                item: [{
                    id: 4,
                    name: 'key 4'
                }],
            }],
        }],
    }];

    const objLength = globalHelpers.length(objToCount);
    const objExtend = globalHelpers.extend({}, objToExtendOne, objToExtendTwo);
    const objValidateSuccess = globalHelpers.isObject({foo: 'Foo'});
    const objValidateError = globalHelpers.isObject('Foo');
    const objEmpty = globalHelpers.isObjectEmpty({});
    const objectSearch = globalHelpers.objectSearch(objToSearch, {id: 4});

    it('object length', (done) => {
        expect(objLength).to.equal(3);
        done();
    });

    it('object extend', (done) => {
        expect(objExtend).to.deep.equal({foo1: 'Foo 1', bar1: 'Bar 1', foo2: 'Foo 2', bar2: 'Bar 2'});
        done();
    });

    it('object validate', (done) => {
        expect(objValidateSuccess).to.equal(true);
        expect(objValidateError).to.equal(false);
        done();
    });

    it('object empty', (done) => {
        expect(objEmpty).to.equal(true);
        done();
    });

    it('object search', (done) => {
        expect(objectSearch).to.deep.equal({id: 4, name: 'key 4'});
        done();
    });
});
