
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const vtexHelpers = vtexUtils.vtexHelpers;

describe('Vtex Methods', () => {
    const imageResized = 'http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png';
    it('format price', (done) => {
        expect(vtexHelpers.formatPrice(1234)).to.equal('R$ 12,34');
        expect(vtexHelpers.formatPrice(123456)).to.equal('R$ 1.234,56');
        expect(vtexHelpers.formatPrice(123456, '.', ',', 3)).to.equal('R$ 1.234,560');
        expect(vtexHelpers.formatPrice(123456, ',', '.', 2, '$ ')).to.equal('$ 1,234.56');
        done();
    });

    it('get original image', (done) => {
        expect(vtexHelpers.getOriginalImage(imageResized)).to.equal('http://domain.vteximg.com.br/arquivos/ids/155242/image.png');
        done();
    });

    it('get resized image', (done) => {
        expect(vtexHelpers.getResizedImage(imageResized, 500, 600)).to.equal('http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png');
        expect(vtexHelpers.getResizedImage(imageResized, 100, 100)).to.equal('http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png');
        done();
    });

    it('replace breakLines', (done) => {
        expect(vtexHelpers.replaceBreakLines('foo\n\nbar\rbaz\n')).to.equal('foo<br /><br />bar<br />baz<br />');
        done();
    });
});
