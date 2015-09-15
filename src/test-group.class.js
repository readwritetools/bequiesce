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

export default class TestGroup {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description.trim();	// the text that immediately follows "// testing"
    	if (this.description.length == 0)
    		this.description = "[unnamed test group]";

    	this.cases = new Array();				// an array of one-line TestCases
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;			// current 1-based line number where the "// testing" occurs 
    	Object.seal(this);
    }
    
    addTestCase(tc) {
    	log.expect(tc, 'TestCase');
    	this.cases.push(tc);
    }

    runTests() {
		log.trace(`${this.cases.length} test cases`);
    	for (let i = 0; i < this.cases.length; i++) {
    		//log.trace(`        case ${i}`);
    		this.cases[i].runTests();
    	}
    }
}