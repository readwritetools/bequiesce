import Bequiesce from '../../lib/bequiesce.class';

var b = new Bequiesce();

var rc = b
//		.testPackage("./test/case/sphericoords.1.test.js")
		.testPackage("./test/case/sphericoords.2.test.js")
		.reportLineByLine()
		.reportSummary()
		.shuntReportsTo("./test/case/results/05-results.txt")
		.runTests();

