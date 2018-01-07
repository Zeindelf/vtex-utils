
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;

describe('Global Methods', () => {
    // Arrays
    const arrToUnique = [1, 2, 2, 3, 4, 4, 4, 5];
    const arrToClean = [1, 2, , 3, , 4];
    const arrToShuffle = [1, 2, 3, 4, 5];
    const arrToImplode = ['Foo', 'Bar', 'Baz'];
    const arrToCount = [1, 2, 3, 4, 5, 6, 7];

    const unique = globalHelpers.arrayUnique(arrToUnique);
    const cleanArray = globalHelpers.cleanArray(arrToClean);
    const shuffle = globalHelpers.shuffleArray(arrToShuffle);
    const implode = globalHelpers.implode(arrToImplode);
    const arrLength = globalHelpers.length(arrToCount);

    // Objects
    const objToCount = {foo: 'Foo', bar: 'Bar', baz: 'Baz'};
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
    const objEmpty = globalHelpers.isObjectEmpty({});
    const objectSearch = globalHelpers.objectSearch(objToSearch, {id: 4});

    // Strings
    const strToCapitalize = 'foo for bar to baz';
    const strToRemoveAccents = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
    const strToSlugify = 'fòÖ bâr bàz';
    const strToReplace = 'Foo to bar into baz foo';

    const strCapitalize = globalHelpers.capitalize(strToCapitalize);
    const strRemoveAccents = globalHelpers.removeAccent(strToRemoveAccents);
    const strSlugifyText = globalHelpers.slugifyText(strToSlugify);
    const strReplace = globalHelpers.strReplace(['foo', 'bar'], ['replaced_foo', 'replaced_bar'], strToReplace);

    // General
    const urlToStrip = 'https://zeindelf.com/foo/bar';
    const emailToPassTest = 'zeindelf@hotmail.com';
    const emailToNotPassTest = 'zeindelf@hotmail';

    const stripHost = globalHelpers.stripHost(urlToStrip);
    const stripHttp = globalHelpers.stripHttp(urlToStrip);
    const isEmail = globalHelpers.isEmail(emailToPassTest);
    const isNotEmail = globalHelpers.isEmail(emailToNotPassTest);

    // Array methods test
    it('array unique', (done) => {
        expect(unique).to.deep.equal([1, 2, 3, 4, 5]);
        done();
    });

    it('clean array', (done) => {
        expect(cleanArray).to.deep.equal([1, 2, 3, 4]);
        done();
    });

    it('array shuffle', (done) => {
        expect(shuffle).to.not.deep.equal(arrToShuffle);
        done();
    });

    it('implode array', (done) => {
        expect(globalHelpers.implode(arrToImplode)).to.equal('Foo,Bar,Baz');
        expect(globalHelpers.implode(arrToImplode, ' - ')).to.equal('Foo - Bar - Baz');
        done();
    });

    it('array length', (done) => {
        expect(arrLength).to.equal(7);
        done();
    });

    // Object methods test
    it('object length', (done) => {
        expect(objLength).to.equal(3);
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

    // String methods test
    it('string capitalize', (done) => {
        expect(strCapitalize).to.equal('Foo For Bar To Baz');
        done();
    });

    it('string remove accents', (done) => {
        expect(strRemoveAccents).to.equal('aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
        done();
    });

    it('string slugify text', (done) => {
        expect(strSlugifyText).to.equal('foo-bar-baz');
        done();
    });

    it('string replace', (done) => {
        expect(strReplace).to.equal('Foo to replaced_bar into baz replaced_foo');
        done();
    });

    // General
    it('url strip host', (done) => {
        expect(stripHost).to.equal('/foo/bar');
        done();
    });

    it('url strip http', (done) => {
        expect(stripHttp).to.equal('//zeindelf.com/foo/bar');
        done();
    });

    it('email test', (done) => {
        expect(isEmail).to.equal(true);
        expect(isNotEmail).to.equal(false);
        done();
    });
});
