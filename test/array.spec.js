
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;

describe('Array Methods', () => {
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
});
