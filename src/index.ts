export interface CreateOptions {
  /**
   * Throw errors if no molfile is found.
   * @default false
   */
  strict?: boolean;
  /**
   * Name of the property containing the molfile.
   * @default 'molfile'
   */
  molfilePropertyName?: string;
  /**
   * Regular expression filter for the properties to add.
   * @default /.* /
   */
  filter?: RegExp;
  /**
   * String to use as end-of-line delimiter.
   * @default '\n'
   */
  eol?: string;
}

export interface CreateResult {
  /** Time in milliseconds to create the SDF. */
  time: number;
  /** The generated SDF string. */
  sdf: string;
}

/**
 * Converts an array of objects containing molfile to a SDF string.
 * @param molecules - Array of molecule objects with molfile and properties.
 * @param options - Options to create the SDF.
 * @returns An object with the generated SDF string and the time taken.
 */
export function create(
  molecules: Array<Record<string, string>>,
  options: CreateOptions = {},
): CreateResult {
  const {
    molfilePropertyName = 'molfile',
    eol = '\n',
    filter = /.*/,
    strict = false,
  } = options;

  const emptyMolfile =
    'empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

  const start = Date.now();

  function normaliseMolfile(molfile: string | undefined): string {
    if (!molfile) {
      if (strict) throw new Error('Array containing emtpy molfiles');
      molfile = emptyMolfile;
    }
    let molfileEOL = '\n';
    if (molfile.includes('\r\n')) {
      molfileEOL = '\r\n';
    } else if (molfile.includes('\r')) {
      molfileEOL = '\r';
    }
    const lines = molfile.replace(/[\r\n]+$/, '').split(molfileEOL);
    return lines.join(eol);
  }

  const result: string[] = [];
  for (const molecule of molecules) {
    result.push(normaliseMolfile(molecule[molfilePropertyName]));
    for (const key in molecule) {
      if (
        key !== molfilePropertyName &&
        (!filter || key.match(filter)) &&
        molecule[key]
      ) {
        result.push(`>  <${key}>`, molecule[key] + eol);
      }
    }
    result.push('$$$$');
  }
  const sdf = result.join(eol);

  return {
    time: Date.now() - start,
    sdf,
  };
}
