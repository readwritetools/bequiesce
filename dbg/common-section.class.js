//=============================================================================
//
// File:         bequiesce/src/common-section.class.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT
// Initial date: Sep 18, 2015
// Contents:     A section of a test package that begins with the annotation
//               "@common" and which contains lines of JavaScript to be
//               evaluated with every test case.
//
//=============================================================================

var expect = require('joezone').expect;
var FS = require('fs');

module.exports = class CommonSection {
	
    constructor(description, packageNumber, lineNumber) {
    	expect(description, 'String');
    	expect(packageNumber, 'Number');
    	expect(lineNumber, 'Number');
    	
    	this.description = description.trim();		// the text that immediately follows "@common"
    	if (this.description.length == 0)
    		this.description = "[unnamed common section]";
    	
    	this.commonJS = "";							// a multi-line string containing this section's common JavaScript code
    	this.packageNumber = packageNumber;			// the 0-based index into the Bequiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "@common" occurs 
    	Object.seal(this);
    }

    isValid() {
    	return (this.description != '[auto]');
    }
    
    addJavascript(js) {
    	expect(js, 'String');
    	
    	if (this.commonJS.length == 0)
    		this.commonJS = js;
    	else
    		this.commonJS += "\n" + js;
    }
    
    importExpansion() {
    }
}
