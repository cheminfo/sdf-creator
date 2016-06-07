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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function create(molecules, options) {
	    var options=options || {};
	    var molfilePropertyName=options.molfilePropertyName || 'molfile';
	    var eol = options.eol || '\n';

	    var emptyMolfile='empty.mol\n  Spectrum generator\n\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END\n';

	    var start = Date.now();
	    var sdf=createSDF(molecules);

	    function normaliseMolfile(molfile) {
	        if (!molfile) molfile=emptyMolfile;
	        var molfileEOL = '\n';
	        if (molfile.indexOf('\r\n') > -1) {
	            molfileEOL = '\r\n';
	        } else if (header.indexOf('\r') > -1) {
	            molfileEOL = '\r';
	        }
	        var lines=molfile.replace(/[\r\n]+$/,'').split(molfileEOL);
	        return lines.join(eol);
	    }


	    function createSDF() {
	        var result=[];
	        for (var i=0; i<molecules.length; i++) {
	            var molecule=molecules[i];
	            result.push(normaliseMolfile(molecule[molfilePropertyName]));
	            for (var key in molecule) {
	                if (key!==molfilePropertyName) {
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


/***/ }
/******/ ])
});
;