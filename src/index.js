'use strict';


function create(molecules, options={}) {
    var {
        molfilePropertyName= 'molfile',
        eol = '\n',
        filter = /.*/
    } = options;


    var emptyMolfile='empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

    var start = Date.now();
    var sdf=createSDF(molecules, filter);

    function normaliseMolfile(molfile) {
        if (!molfile) molfile=emptyMolfile;
        var molfileEOL = '\n';
        if (molfile.indexOf('\r\n') > -1) {
            molfileEOL = '\r\n';
        } else if (molfile.indexOf('\r') > -1) {
            molfileEOL = '\r';
        }
        var lines=molfile.replace(/[\r\n]+$/,'').split(molfileEOL);
        return lines.join(eol);
    }


    function createSDF(molecules, filter) {
        var result=[];
        for (var i=0; i<molecules.length; i++) {
            var molecule=molecules[i];
            result.push(normaliseMolfile(molecule[molfilePropertyName]));
            for (var key in molecule) {
                if (key!==molfilePropertyName && (! filter || key.match(filter))) {
                    result.push('>  <'+key+'>');
                    result.push(molecule[key]+eol);
                }
            }
            result.push('$$$$');
        }
        return result.join(eol);
    }

    return {
        time: Date.now() - start,
        sdf: sdf
    };

}

module.exports = create;
