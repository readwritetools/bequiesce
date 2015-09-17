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

import FS from 'fs';

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
    
    //< return true if the proof succeeds
    //< return false if the proof fails
    runTests() {
    	var proofs = this.proofJS.split('&&');
    	for (let oneProof of proofs) {
          	var b = this.evaluate(this.propositionJS, this.codeSection.situationJS, oneProof.trim());		// HERE deal with multiple &&
          	
          	if (b)
          		jot.trace("pass:" + oneProof);
          	else
          		jot.trace("fail:" + oneProof);
    	}
    }
    
    //^ evaluate the JavaScript
    //> propositionJS
    //> situationJS
    //> proofJS
    //< return true if the proof succeeds
    //< return false if the proof fails
    evaluate(propositionJS, situationJS, proofJS) {
    	log.expect(propositionJS, 'String');
    	log.expect(situationJS, 'String');
    	log.expect(proofJS, 'String');

    	var code = `${propositionJS}\n${situationJS}\nglobal.__b = (${proofJS});`

    	jot.trace("===================================");
    	jot.trace(code);
    	
    	var js1 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/sphericoords.js");
    	var js2 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/remquo.js");
    	var js3 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/number.js");
    	eval( js1 + js2 + js3 + code);
    	return global.__b;
    }
}