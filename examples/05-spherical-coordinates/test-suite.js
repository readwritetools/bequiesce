//=============================================================================
//
// File:         bequiesce/examples/05-spherical-coordinates/test-suite.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Bequiesce test runner for sphericoords.js
//
//=============================================================================

"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libBequiesceClass = require('../../lib/bequiesce.class');

var _libBequiesceClass2 = _interopRequireDefault(_libBequiesceClass);

_libBequiesceClass2["default"].getInstance().testPackage("./test/case/sphericoords.1.test.js").testPackage("./test/case/sphericoords.2.test.js").runTests();
