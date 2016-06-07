# sdf-creator

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Allow to create a SDF file from an array of object containing the molfile property

## Use of the package

```bash
npm install sdf-creator
```

In node script:
```js

// allows to create a SDF file a file test.json in the same directory

var create = require('sdf-creator');

var molecules = JSON.parse(fs.readFileSync(__dirname + '/test.json', 'utf-8'));

var result = create(molecules);

console.log(result.sdf);

```

## require('sdf-creator') (array, options)

options:
* crlf : end of line separator, by default '\n'
* molfileAttributeName : name of the attribute containing the molfile, by default: 'molfile'

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/sdf-parser.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/sdf-parser
[travis-image]: https://img.shields.io/travis/cheminfo-js/sdf-parser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/sdf-parser
[david-image]: https://img.shields.io/david/cheminfo-js/sdf-parser.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/sdf-parser
[download-image]: https://img.shields.io/npm/dm/sdf-parser.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/sdf-parser
