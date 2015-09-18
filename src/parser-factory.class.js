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
    	this.currentTestGroup = null;			// the current testGroup being parsed
    	this.parsingState = 0;					// 0 uninitialized; 1 inside "using"; 2 inside "testing"
    	this.multiLineComment = 0;				// 0 outside comment; 1 inside comment
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

    	// strip embedded comments
    	while (sourceline.indexOf("/*") != -1 && sourceline.indexOf("*/") != -1) {
    		var open = sourceline.indexOf("/*");
    		var close = sourceline.indexOf("*/", open+2);
    		var before = sourceline.substr(0, open); 
    		var after = sourceline.substr(close+2);
    		sourceline = before + after;
    	}
    	
    	// exiting multiline comment
    	if (sourceline.indexOf("*/") != -1) {
    		var close = sourceline.indexOf("*/");
    		sourceline = sourceline.substr(close+2); 
    		this.multiLineComment = 0;
    	}
    	
    	// if still inside a multiline comment, skip
    	if (this.multiLineComment == 1) {
    		return null;
    	}

    	// entering multiline comment
    	if (sourceline.indexOf("/*") != -1) {
    		var open = sourceline.indexOf("/*");
    		sourceline = sourceline.substr(0, open); 
    		this.multiLineComment = 1;
    	}
    	
    	var doubleSolidus = sourceline.indexOf("//");
    	var atUsing = sourceline.indexOf("@using", doubleSolidus);
    	var atTesting = sourceline.indexOf("@testing", doubleSolidus);

    	if (doubleSolidus != -1 && atUsing != -1) {
    		this.parsingState = 1;
    		var description = sourceline.substr(atUsing + "@using".length).trim();
    		var cs = new CodeSection(description, this.packageNumber, lineNumber);
    		this.currentCodeSection = cs;
    		return cs;
    	}
    	else if (doubleSolidus != -1 && atTesting != -1) {
    		this.parsingState = 2;
    		var description = sourceline.substr(atTesting + "@testing".length).trim();
    		var cg = new TestGroup(description, this.packageNumber, lineNumber);
    		this.currentTestGroup = cg;
    		return cg;
    	}
    	else if (sourceline.indexOf("//") == 0 || sourceline.length == 0) {
        	// skip C++ style comment lines and blank lines
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
    		var proofJS = (parts.length < 2) ? "" : parts[1].trim();
    		return new TestCase(propositionJS, proofJS, this.currentCodeSection, this.currentTestGroup, this.packageNumber, lineNumber);
    	}
    	else {
    		log.abnormal(`Is this code or test? "${sourceline}"`);
    		return null;
    	}
    }
}
