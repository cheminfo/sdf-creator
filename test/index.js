var create = require('..');

var fs = require('fs');

var molecules = JSON.parse(fs.readFileSync(__dirname + '/test.json', 'utf-8'));

describe('SDF Creator', function () {

    it('Check result without field filter', function () {
        var result = create(molecules);
        result.sdf.indexOf('mf').should.be.equal(439);
        result.sdf.indexOf('density').should.be.equal(480);
        result.sdf.split('$$$$').length.should.be.equal(11);
    });

    it('Check result with key filter', function () {
        var result = create(molecules, {filter:/^(mf|mw|den)/});
        result.sdf.indexOf('bp').should.be.equal(-1);
        result.sdf.indexOf('density').should.be.above(100);
        result.sdf.indexOf('mf').should.be.above(100);
        result.sdf.split('$$$$').length.should.be.equal(11);
    });

    it('check strict mode', function () {
        (() => create(molecules, {filter:/^(mf|mw|den)/, strict: true})).should.throw('Array containing emtpy molfiles');
        
    });

    it('check empty fields', function () {
        var result = create(molecules);
        result.sdf.split('density').length.should.be.equal(11);
        result.sdf.split('unique').length.should.be.equal(2);
    });
});
