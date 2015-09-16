//=============================================================================
//
// File:         src/parser-factory.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Parser that creates CodeSection, TestGroup, and TestCase objects
//
//=============================================================================

import CodeSection from "./code-section.class";
import TestGroup from "./test-group.class";
import TestCase from "./test-case.class";

export default class ParserFactory {
	
    constructor(packageNumber) {
    	log.expect(packageNumber, 'Number');
    	
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array currently being parsed
    	this.currentCodeSection = null;			// the current codeSection being parsed
    	this.parsingState = 0;					// 0 uninitialized; 1 inside "using"; 2 inside "testing"
    	Object.seal(this);
    }
        
    inCodeSection() {
    	return (this.parsingState == 1);
    }
    
    inTestSection() {
    	return (this.parsingState == 2);
    }
    
    //^ Determine what to do with this line of text from the user's test case file
    //< returns an object of type CodeSection, TestGroup, TestCase, String, or null
    parseLine(sourceline, lineNumber) {
    	log.expect(sourceline, 'String');
    	log.expect(lineNumber, 'Number');

    	if (sourceline.indexOf("// using") != -1) {
    		this.parsingState = 1;
    		var description = sourceline.substr("// using".length).trim();
    		var cs = new CodeSection(description, this.packageNumber, lineNumber);
    		this.currentCodeSection = cs;
    		return cs;
    	}
    	else if (sourceline.indexOf("// testing") != -1) {
    		this.parsingState = 2;
    		var description = sourceline.substr("// testing".length).trim();
    		return new TestGroup(description, this.packageNumber, lineNumber);
    	}
    	else if (sourceline.indexOf("//") == 0 || sourceline.length == 0) {
    		return null;
    	}
    	else if (this.inCodeSection()) {
    		// this is situationJS
    		return sourceline;
    	}
    	else if (this.inTestSection()) {
    		var commentAt = sourceline.lastIndexOf("//");
    		if (commentAt != -1) {
    			sourceline = sourceline.substr(0, commentAt);
    		}
    		// split the JavaScript into a proposition and a proof
    		var parts = sourceline.split(';;');
    		var propositionJS = parts[0].trim();
    		var proofJS = (parts.length == 0) ? "" : parts[1].trim();
    		return new TestCase(propositionJS, proofJS, this.currentCodeSection, this.packageNumber, lineNumber);
    	}
    	else {
    		log.abnormal(`Is this code or test? "${sourceline}"`);
    		return null;
    	}
    }
}
