"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libBequiesceClass = require('../../lib/bequiesce.class');

var _libBequiesceClass2 = _interopRequireDefault(_libBequiesceClass);

var b = new _libBequiesceClass2["default"]();

var rc = b
//		.testPackage("./test/case/sphericoords.1.test.js")
.testPackage("./test/case/sphericoords.2.test.js").reportLineByLine().reportSummary().shuntReportsTo("./test/case/results/05-results.txt").runTests();
