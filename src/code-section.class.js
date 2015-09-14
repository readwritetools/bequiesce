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

export default class CodeSection {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description;			// the text that immediately follows "// using"
    	this.groups = new Array();				// an array of TestGroups identified by '// testing'
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;			// current 1-based line number where the "// using" occurs 
    	this.sectionIndex = null;				// current index into the array of Sections
    	Object.seal(this);
    }

    addTestGroup(tg) {
    	log.expect(tg, 'TestGroup');
    	
    	log.todo();
    }
    
    addTestCase(tc) {
    	log.expect(tc, 'TestCase');
    	
    	log.todo();
    }

    addJavascript(js) {
    	log.expect(js, 'String');

    	log.todo();
    }
   
}