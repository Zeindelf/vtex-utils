
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;

describe('String Methods', () => {
    const strToCapitalize = 'foo for bar to baz';
    const strToRemoveAccents = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
    const strToSlugifyText = 'fòÖ bâr bàz';
    const strToReplace = 'Foo to bar into baz foo';

    const strCapitalize = globalHelpers.capitalize(strToCapitalize);
    const strRemoveAccents = globalHelpers.removeAccent(strToRemoveAccents);
    const strSlugifyText = globalHelpers.slugifyText(strToSlugifyText);
    const strReplace = globalHelpers.strReplace(['foo', 'bar'], ['replaced_foo', 'replaced_bar'], strToReplace);

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
});
