var create = require('..');

var fs = require('fs');

var molecules = JSON.parse(fs.readFileSync(__dirname + '/test.json', 'utf-8'));

describe('SDF Creator', function () {

    var result = create(molecules);

    it('Check result', function () {
        result.sdf.indexOf('mf').should.be.equal(439);
        result.sdf.indexOf('density').should.be.equal(480);
        result.sdf.split('$$$$').length.should.be.equal(11);
    });
});
