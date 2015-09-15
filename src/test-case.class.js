//=============================================================================
//
// File:         src/test-case.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 14, 2015
// Contents:     A single line of a TestGroup that contains a proposition and its truth
//
//=============================================================================

export default class TestCase {
	
    constructor(proposition, truth, packageNumber, lineNumber) {
    	log.expect(proposition, 'String');
    	log.expect(truth, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.proposition = proposition;			// the first half of the line, that contains context and values
    	this.truth = truth;						// the second half of the line, that contains assertion about the proposition
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;			// current 1-based line number where the "// testing" occurs 
    	Object.seal(this);
    }
    
    runTests() {
//    	log.trace(`        P ${this.proposition}`);
//    	log.trace(`        T ${this.truth}`);
    	jot.trace(this, `${this.proposition} ---> ${this.truth}`);
    }
}