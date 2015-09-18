//=============================================================================
//
// File:         src/common-section.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 18, 2015
// Contents:     A section of a test package that begins with the annotation
//               "@common" and which contains lines of JavaScript to be
//               evaluated with every test case.
//
//=============================================================================

import FS from 'fs';

export default class CodeSection {
	
    constructor(description = '', packageNumber, lineNumber) {
    	log.expect(description, 'String');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.description = description.trim();		// the text that immediately follows "@common"
    	if (this.description.length == 0)
    		this.description = "[unnamed common section]";
    	
    	this.commonJS = "";							// a multi-line string containing this section's ommon JavaScript code
    	this.packageNumber = packageNumber;			// the 0-based index into the BeQuiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// using" occurs 
    	Object.seal(this);
    }

    addJavascript(js) {
    	log.expect(js, 'String');
    	
    	if (this.commonJS.length == 0)
    		this.commonJS = js;
    	else
    		this.commonJS += "\n" + js;
    }
    
    importExpansion() {
    }
}