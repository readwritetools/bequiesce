//=============================================================================
//
// File:         src/test-group.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 14, 2015
// Contents:     A section of a test package that begins with the annotation
//               "@testing" followed by one-line test cases.
//
//=============================================================================

import StatsRecoder from './stats-recorder.class';
import Jot from './jot.class';

export default class TestGroup {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description.trim();		// the text that immediately follows "@testing"
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
    	for (let i = 0; i < this.cases.length; i++) {

    		var testCase = this.cases[i];
    		testCase.runTests();
    		
   			this.statsRecorder.incrementSuccess( testCase.statsRecorder.passCount );
   			this.statsRecorder.incrementFailure( testCase.statsRecorder.failCount );
    	}
    }

    reportResults(prefix, shuntReportsTo) {
		log.expect(prefix, 'String');
		log.expect(shuntReportsTo, 'String');
		
		var passCount = Jot.rightJustify( this.statsRecorder.success.toString(), 3);
		var failCount = Jot.rightJustify( this.statsRecorder.failure.toString(), 3);
		var prefix = Jot.rightJustify( prefix, 45);
		var description = this.description;
   		var s = ` Pass ${passCount}    Fail ${failCount} ${prefix} -> ${description}`;
   		jot.trace(this, s);
	}
}