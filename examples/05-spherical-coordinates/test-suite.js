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

var bequiesce = new _libBequiesceClass2["default"]();

bequiesce.testPackage("./test/case/sphericoords.1.test.js").testPackage("./test/case/sphericoords.2.test.js").reportLineByLine().reportSummary().shuntReportsTo("./test/case/results/05-results.txt").runTests();
