'use strict';

function create(molecules, options) {
    var options=options || {};
    var molfileAttributeName=options.molfileAttributeName || 'molfile';
    var crlf = options.crlf || '\n';

    var emptyMolfile='empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

    var start = Date.now();
    var sdf=createSDF(molecules);

    function normaliseMolfile(molfile) {
        if (!molfile) molfile=emptyMolfile;
        var molCRLF = '\n';
        if (molfile.indexOf('\r\n') > -1) {
            molCRLF = '\r\n';
        } else if (header.indexOf('\r') > -1) {
            molCRLF = '\r';
        }
        var lines=molfile.replace(/[\r\n]+$/,'').split(molCRLF);
        return lines.join(crlf);
    }


    function createSDF() {
        var result=[];
        for (var i=0; i<molecules.length; i++) {
            var molecule=molecules[i];
            result.push(normaliseMolfile(molecule[molfileAttributeName]));
            for (var key in molecule) {
                if (key!==molfileAttributeName) {
                    result.push('>  <'+key+'>');
                    result.push(molecule[key]+crlf);
                }
            }
            result.push('$$$$');
        }
        return result.join(crlf);
    }

    return {
        time: Date.now() - start,
        sdf: sdf
    };

}

module.exports = create;
