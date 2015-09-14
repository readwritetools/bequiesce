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
    	
    	// log.trace(lineNumber, sourceline);
    	
    	if (sourceline.indexOf("// using") != -1) {
    		this.parsingState = 1;
    		var description = sourceline.substr("// using".length);
    		return new CodeSection(description, this.packageNumber, lineNumber);
    	}
    	else if (sourceline.indexOf("// testing") != -1) {
    		this.parsingState = 2;
    		var description = sourceline.substr("// testing".length);
    		return new TestGroup(description, this.packageNumber, lineNumber);
    	}
    	else if (sourceline.indexOf("//") != -1 || sourceline.length == 0) {
    		return null;
    	}
    	else if (this.inCodeSection()) {
    		return sourceline;
    	}
    	else if (this.inTestSection()) {
    		return new TestCase(sourceline, this.packageNumber, lineNumber);		// TODO split at ;;
    	}
    	else {
    		log.abnormal(`Is this code or test? "${sourceline}"`);
    		return null;
    	}
    }
}
