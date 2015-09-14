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
    	
    	this.description = description;			// the text that immediately follows "// testing"
    	this.cases = new Array();				// an array of one-line TestCases
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;			// current 1-based line number where the "// testing" occurs 
    	Object.seal(this);
    }
}