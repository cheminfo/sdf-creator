/**
 * Converts an array of objects containing molfile to a SDF
 * @param {*} molecules
 * @param {Object} [options={}] options to create the SDF
 * @param {boolean} [options.strict=false] throw errors in no molfile
 * @param {string} [options.molfilePropertyName="molfile"] contains the name of the property containing the molfile
 * @param {RegExp} [options.filter=/.*\/] - regular expression containing a filter for the properties to add
 * @param {string} [options.eol='\n'] - string to use as end-of-line delimiter
 * @returns {object}
 */

export function create(molecules, options = {}) {
  let {
    molfilePropertyName = 'molfile',
    eol = '\n',
    filter = /.*/,
    strict = false,
  } = options;

  let emptyMolfile =
    'empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

  let start = Date.now();
  let sdf = createSDF(molecules, filter);

  function normaliseMolfile(molfile) {
    if (!molfile) {
      if (strict) throw new Error('Array containing emtpy molfiles');
      molfile = emptyMolfile;
    }
    let molfileEOL = '\n';
    if (molfile.indexOf('\r\n') > -1) {
      molfileEOL = '\r\n';
    } else if (molfile.indexOf('\r') > -1) {
      molfileEOL = '\r';
    }
    let lines = molfile.replace(/[\r\n]+$/, '').split(molfileEOL);
    return lines.join(eol);
  }

  function createSDF(molecules, filter) {
    let result = [];
    for (let i = 0; i < molecules.length; i++) {
      let molecule = molecules[i];
      result.push(normaliseMolfile(molecule[molfilePropertyName]));
      for (let key in molecule) {
        if (
          key !== molfilePropertyName &&
          (!filter || key.match(filter)) &&
          molecule[key]
        ) {
          result.push(`>  <${key}>`);
          result.push(molecule[key] + eol);
        }
      }
      result.push('$$$$');
    }
    return result.join(eol);
  }

  return {
    time: Date.now() - start,
    sdf: sdf,
  };
}
