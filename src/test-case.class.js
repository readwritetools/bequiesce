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
	
    constructor(propositionJS, proofJS, codeSection, packageNumber, lineNumber) {
    	log.expect(propositionJS, 'String');
    	log.expect(proofJS, 'String');
    	log.expect(codeSection, 'CodeSection');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.propositionJS = propositionJS;		// the first half of the line, that contains context and values
    	this.proofJS = proofJS;					// the second half of the line, that contains assertion about the proposition
    	this.codeSection = codeSection;			// the codeSection that contains the situationJS for this case
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;			// current 1-based line number where the "// testing" occurs 
    	Object.seal(this);
    }
    
    runTests() {
    	jot.trace("===================================");
    	jot.trace( this.propositionJS );
    	jot.trace( this.codeSection.situationJS );
    	jot.trace( this.proofJS );
    	
    	if (this.propositionJS.length % 3 == 0)
    		return false;
    	else
    		return true;
    }
}