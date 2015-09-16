//=============================================================================
//
// File:         src/test-group.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 14, 2015
// Contents:     A section of a test package that begins with the keyphrase "// testing"
//               followed by test cases.
//
//=============================================================================

import StatsRecoder from './stats-recorder.class';
import Jot from './jot.class';

export default class TestGroup {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description.trim();	// the text that immediately follows "// testing"
    	if (this.description.length == 0)
    		this.description = "[unnamed test group]";

    	this.cases = new Array();					// an array of one-line TestCases
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.packageNumber = packageNumber;			// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// testing" occurs 
    	Object.seal(this);
    }
    
    addTestCase(tc) {
    	log.expect(tc, 'TestCase');
    	this.cases.push(tc);
    }

    runTests() {
//    	jot.trace(this, `TEST GROUP ${this.description}`);
    	for (let i = 0; i < this.cases.length; i++) {
    		
    		if (this.cases[i].runTests() == true)
    			this.statsRecorder.incrementSuccess();
    		else
    			this.statsRecorder.incrementFailure();
    	}
    }

    reportResults(prefix, reportLineByLine, reportSummary, shuntReportsTo) {
		log.expect(prefix, 'String');
		log.expect(reportLineByLine, 'Boolean');
		log.expect(reportSummary, 'Boolean');
		log.expect(shuntReportsTo, 'String');
		
//    	jot.trace(this, `TEST GROUP ${this.description}`);
		var passCount = Jot.rightJustify( this.statsRecorder.success.toString(), 3);
		var failCount = Jot.rightJustify( this.statsRecorder.failure.toString(), 3);
		var prefix = Jot.rightJustify( prefix, 40);
		var description = this.description;
   		var s = `Pass:${passCount}  Fail:${failCount} ${prefix} -> ${description}`;
   		jot.trace(this, s);
	}
}