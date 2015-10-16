//=============================================================================
//
// File:         bequiesce/src/code-section.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
// Contents:     A section of a test package that begins with the annotation
//               "@using" and which contains lines of JavaScript to be
//               evaluated, plus one or more "@testing" groups.
//
//=============================================================================

import TestGroup from "./test-group.class";
import TestCase from "./test-case.class";
import StatsRecoder from './stats-recorder.class';
import expect from '../../joezone/src/expect.function.js';

export default class SituationSection {
	
    constructor(description, packageNumber, lineNumber) {
    	expect(description, 'String');
    	expect(packageNumber, 'Number');
    	expect(lineNumber, 'Number');
    	
    	this.description = description.trim();		// the text that immediately follows "@using"
    	if (this.description.length == 0)
    		this.description = "[unnamed code section]";
    	
    	this.situationJS = "";						// a multi-line string containing this code section's JavaScript to be evaled
    	this.groups = new Array();					// an array of child TestGroups identified by '@testing'
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.packageNumber = packageNumber;			// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "@using" occurs 
    	this.groupIndex = null;						// current index into the array of TestGroups
    	Object.seal(this);
    }

    addTestGroup(tg) {
    	expect(tg, 'TestGroup');
    	this.groups.push(tg);
		this.groupIndex = this.groups.length-1;
    }
    
    currentTestGroup() {
    	if (this.groupIndex == null) {
    		log.abnormal("Adding a default TestGroup because none found");
    		this.addTestGroup( new TestGroup("[auto]", this.packageNumber, this.lineNumber) );
    	}    		
    	return this.groups[this.groupIndex];
    }

    addTestCase(tc) {
    	expect(tc, 'TestCase');
    	this.currentTestGroup().addTestCase(tc);
    }

    addJavascript(js) {
    	expect(js, 'String');
    	
    	if (this.situationJS.length == 0)
    		this.situationJS = js;
    	else
    		this.situationJS += "\n" + js;
    }
    
    runTests() {
    	for (let group of this.groups) {
    		group.runTests();
    		this.statsRecorder.incrementSuccess( group.statsRecorder.passCount );
   			this.statsRecorder.incrementFailure( group.statsRecorder.failCount );
    	}
    }
    
	reportResults(prefix, shuntReportsTo) {
		expect(prefix, 'String');
		expect(shuntReportsTo, 'String');
		
		prefix += (" " + this.description);
    	for (let group of this.groups) {
    		group.reportResults(prefix, shuntReportsTo);
    	}
	}
}