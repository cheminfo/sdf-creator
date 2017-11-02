/**
 * sdf-creator - SDF creator
 * @version v2.0.0
 * @link https://github.com/cheminfo-js/sdf-creator
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SDFCreator"] = factory();
	else
		root["SDFCreator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function create(molecules, options = {}) {
    var _options$molfilePrope = options.molfilePropertyName,
        molfilePropertyName = _options$molfilePrope === undefined ? 'molfile' : _options$molfilePrope,
        _options$eol = options.eol,
        eol = _options$eol === undefined ? '\n' : _options$eol,
        _options$filter = options.filter,
        filter = _options$filter === undefined ? /.*/ : _options$filter;


    var emptyMolfile = 'empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

    var start = Date.now();
    var sdf = createSDF(molecules, filter);

    function normaliseMolfile(molfile) {
        if (!molfile) molfile = emptyMolfile;
        var molfileEOL = '\n';
        if (molfile.indexOf('\r\n') > -1) {
            molfileEOL = '\r\n';
        } else if (molfile.indexOf('\r') > -1) {
            molfileEOL = '\r';
        }
        var lines = molfile.replace(/[\r\n]+$/, '').split(molfileEOL);
        return lines.join(eol);
    }

    function createSDF(molecules, filter) {
        var result = [];
        for (var i = 0; i < molecules.length; i++) {
            var molecule = molecules[i];
            result.push(normaliseMolfile(molecule[molfilePropertyName]));
            for (var key in molecule) {
                if (key !== molfilePropertyName && (!filter || key.match(filter))) {
                    result.push('>  <' + key + '>');
                    result.push(molecule[key] + eol);
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=sdf-creator.js.map