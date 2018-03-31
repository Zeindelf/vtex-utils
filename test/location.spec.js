
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const VtexUtils = require('./../dist/vtex-utils.common.js');
const vtexUtils = new VtexUtils();
const globalHelpers = vtexUtils.globalHelpers;
const locationHelpers = vtexUtils.locationHelpers;

describe('Location Methods', () => {
    const filteredRegionAcUpper = locationHelpers.filteredRegion('AC');
    const filteredRegionAlUpper = locationHelpers.filteredRegion('AL');
    const filteredRegionDfUpper = locationHelpers.filteredRegion('DF');
    const filteredRegionEsUpper = locationHelpers.filteredRegion('ES');
    const filteredRegionPrUpper = locationHelpers.filteredRegion('PR');

    const filteredRegionAcLower = locationHelpers.filteredRegion('ac');
    const filteredRegionAlLower = locationHelpers.filteredRegion('al');
    const filteredRegionDfLower = locationHelpers.filteredRegion('df');
    const filteredRegionEsLower = locationHelpers.filteredRegion('es');
    const filteredRegionPrLower = locationHelpers.filteredRegion('pr');

    const filteredStateUpper = locationHelpers.filteredState('SP');
    const filteredStateLower = locationHelpers.filteredState('sp');

    it('filter region', (done) => {
        expect(filteredRegionAcUpper).to.equal('Norte');
        expect(filteredRegionAlUpper).to.equal('Nordeste');
        expect(filteredRegionDfUpper).to.equal('Centro Oeste');
        expect(filteredRegionEsUpper).to.equal('Sudeste');
        expect(filteredRegionPrUpper).to.equal('Sul');

        expect(filteredRegionAcLower).to.equal('Norte');
        expect(filteredRegionAlLower).to.equal('Nordeste');
        expect(filteredRegionDfLower).to.equal('Centro Oeste');
        expect(filteredRegionEsLower).to.equal('Sudeste');
        expect(filteredRegionPrLower).to.equal('Sul');
        done();
    });

    it('filter state', (done) => {
        expect(filteredStateUpper).to.deep.equal({name: 'São Paulo', initials: 'SP', region: 'Sudeste'});
        expect(filteredStateLower).to.deep.equal({name: 'São Paulo', initials: 'SP', region: 'Sudeste'});
        done();
    });
});
