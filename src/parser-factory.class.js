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
    	Object.seal(this);
    }
        
    parseLine(sourceline, lineNumber) {
    	log.expect(sourceline, 'String');
    	log.expect(lineNumber, 'Number');
    	
    	log.trace(lineNumber, sourceline);
    	
    	if (sourceline.indexOf("// using") != -1) {
    		var description = sourceline.substr("// using".length);
    		return new CodeSection(description, this.packageNumber, lineNumber);
    	}
    	else {
    		return null;
    	}
    }
}
