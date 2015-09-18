//=============================================================================
//
// File:         src/code-section.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
// Contents:     A section of a test package that begins with the keyphrase "// using"
//               and contains lines of JavaScript,and one or more "// testing" groups
//
//=============================================================================

import TestGroup from "./test-group.class";
import TestCase from "./test-case.class";
import StatsRecoder from './stats-recorder.class';

export default class CodeSection {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description.trim();	// the text that immediately follows "// using"
    	if (this.description.length == 0)
    		this.description = "[unnamed code section]";
    	
    	this.situationJS = "";						// a multi-line string containing this Test Group's common Javascript code
    	this.groups = new Array();					// an array of TestGroups identified by '// testing'
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.packageNumber = packageNumber;			// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// using" occurs 
    	this.groupIndex = null;						// current index into the array of TestGroups
    	Object.seal(this);
    }

    addTestGroup(tg) {
    	log.expect(tg, 'TestGroup');
    	this.groups.push(tg);
		this.groupIndex = this.groups.length-1;
    }
    
    currentTestGroup() {
    	if (this.groupIndex == null) {
    		log.abnormal("Adding a default TestGroup because none found");
    		this.addTestGroup( new TestGroup("auto", this.packageNumber, this.lineNumber) );
    	}    		
    	return this.groups[this.groupIndex];
    }

    addTestCase(tc) {
    	log.expect(tc, 'TestCase');
    	this.currentTestGroup().addTestCase(tc);
    }

    addJavascript(js) {
    	log.expect(js, 'String');
    	
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
    
	reportResults(prefix, reportLineByLine, reportSummary, shuntReportsTo) {
		log.expect(prefix, 'String');
		log.expect(reportLineByLine, 'Boolean');
		log.expect(reportSummary, 'Boolean');
		log.expect(shuntReportsTo, 'String');
		
		prefix += (" " + this.description);
    	for (let group of this.groups) {
    		group.reportResults(prefix, reportLineByLine, reportSummary, shuntReportsTo);
    	}
	}
}