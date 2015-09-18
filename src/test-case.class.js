//=============================================================================
//
// File:         src/test-case.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 14, 2015
// Contents:     A single line of a TestGroup that contains a proposition and
//               a proof, where the pair is separated by ";;"
//               Each proof may contain one or more snippets to be asserted.
//
//=============================================================================

import FS from 'fs';
import StatsRecoder from './stats-recorder.class';

export default class TestCase {
	
    constructor(propositionJS, proofJS, codeSection, testGroup, packageNumber, lineNumber) {
    	log.expect(propositionJS, 'String');
    	log.expect(proofJS, 'String');
    	log.expect(codeSection, 'CodeSection');
    	log.expect(testGroup, 'TestGroup');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.propositionJS = propositionJS;			// the first half of the line, that contains context and values
    	this.proofJS = proofJS;						// the second half of the line, that contains assertions about the proposition
    	this.snippetsJS = new Array();				// the parts of the proofJS (separated by '&&') that are to be individually tested
    	this.codeSection = codeSection;				// the codeSection that contains the situationJS for this case
    	this.testGroup = testGroup;					// the testGroup that contains this testCase
    	this.packageNumber = packageNumber;			// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// testing" occurs
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.initialize();
    	Object.seal(this);
    }

    initialize() {
    	var pieces = this.proofJS.split('&&');
    	for (let snippet of pieces) {
    		snippet = snippet.trim();
    		if (snippet.length > 0)
    			this.snippetsJS.push(snippet);
    	}
    }
    
    runTests() {
    	for (let snippetJS of this.snippetsJS) {
         	var b = this.evaluate(this.propositionJS, this.codeSection.situationJS, snippetJS);
          	if (b) {
          		this.statsRecorder.incrementSuccess();
          		//jot.trace("pass: " + snippetJS);
          	}
          	else {
          		this.statsRecorder.incrementFailure();
          		this.printDetails(this.propositionJS, this.codeSection.situationJS, snippetJS);
          	}
    	}
    }
    
    //^ suitable for failures
    printDetails(propositionJS, situationJS, proofJS) {
    	log.expect(propositionJS, 'String');
    	log.expect(situationJS, 'String');
    	log.expect(proofJS, 'String');

    	jot.trace("");
    	jot.trace("==== Test Case =====================");
    	jot.trace(this.codeSection, ` Section:     ${this.codeSection.description}`);
    	jot.trace(this.testGroup,   ` Group:       ${this.testGroup.description}`);
    	jot.trace(this, ` Proposition: ${propositionJS}`);
    	jot.trace(this, ` Proof:       ${proofJS} <-- FAILED`);
    	jot.trace(this.codeSection, " Situation:");
       	jot.trace(situationJS);
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

    	var js1 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/sphericoords.js");
    	var js2 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/remquo.js");
    	var js3 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/number.js");
    	eval( js1 + js2 + js3 + code);
    	return global.__b;
    }
}