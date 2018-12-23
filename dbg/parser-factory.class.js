//=============================================================================
//
// File:         bequiesce/src/parser-factory.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Parser that creates CommonSection, SituationSection, TestGroup, and TestCase objects
//
//=============================================================================

var expect = require('joezone').expect;
var CommonSection = require('./common-section.class.js');
var CommonCode = require('./common-code.class.js');
var SituationSection = require('./situation-section.class.js');
var SituationCode = require('./situation-code.class.js');
var TestGroup = require('./test-group.class.js');
var TestCase = require('./test-case.class.js');

module.exports = class ParserFactory {
	
    constructor(packageNumber) {
    	expect(packageNumber, 'Number');
    	
    	this.packageNumber = packageNumber;		// the 0-based index into the Bequiesce._testPackages array currently being parsed
    	this.currentSituationSection = null;	// the current SituationSection being parsed
    	this.currentTestGroup = null;			// the current testGroup being parsed
    	this.parsingState = 0;					// 0 uninitialized; 1 inside "@common"; 2 inside "@using"; inside "@testing"
    	this.multiLineComment = 0;				// 0 outside comment; 1 inside comment
    	Object.seal(this);
    }
        
    inCommonSection() {
    	return (this.parsingState == 1);
    }
    
    inSituationSection() {
    	return (this.parsingState == 2);
    }
    
    inTestSection() {
    	return (this.parsingState == 3);
    }
    
    //^ Determine what to do with this line of text from the user's test case file
    //< returns an object of type SituationSection, TestGroup, TestCase, String, or null
    parseLine(sourceline, lineNumber) {
    	expect(sourceline, 'String');
    	expect(lineNumber, 'Number');

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
    	while (doubleSolidus != -1) {
    		// be careful of false positives with http[s]://
        	if (doubleSolidus > 0 && sourceline.charAt(doubleSolidus-1) == ':') {		
        		doubleSolidus = sourceline.indexOf("//", doubleSolidus+2);
        		continue;
        	}
			// look for an odd number of single quotes to the left and right of the double solidus
			var leftS  = sourceline.substr(0, doubleSolidus).match(/'/g);
			var rightS = sourceline.substr(doubleSolidus+2).match(/'/g);
			if ((leftS != null) && (rightS != null) && ((leftS.length % 2 == 1) && (rightS.length % 2 == 1))) {
        		doubleSolidus = sourceline.indexOf("//", doubleSolidus+2);
				continue;
    		}
			// look for an odd number of double quotes to the left and right of the double solidus
			var leftD  = sourceline.substr(0, doubleSolidus).match(/"/g);
			var rightD = sourceline.substr(doubleSolidus+2).match(/"/g);
			if ((leftD != null) && (rightD != null) && ((leftD.length % 2 == 1) && (rightD.length % 2 == 1))) {
        		doubleSolidus = sourceline.indexOf("//", doubleSolidus+2);
				continue;
    		}
			break;
    	}
    	
    	var atCommon = sourceline.indexOf("@common", doubleSolidus);
    	var atUsing = sourceline.indexOf("@using", doubleSolidus);
    	var atTesting = sourceline.indexOf("@testing", doubleSolidus);

    	if (doubleSolidus != -1 && atCommon != -1) {
    		this.parsingState = 1;
    		var description = sourceline.substr(atCommon + "@common".length).trim();
    		var cs = new CommonSection(description, this.packageNumber, lineNumber);
    		return cs;
    	}
    	else if (doubleSolidus != -1 && atUsing != -1) {
    		this.parsingState = 2;
    		var description = sourceline.substr(atUsing + "@using".length).trim();
    		var cs = new SituationSection(description, this.packageNumber, lineNumber);
    		this.currentSituationSection = cs;
    		return cs;
    	}
    	else if (doubleSolidus != -1 && atTesting != -1) {
    		this.parsingState = 3;
    		var description = sourceline.substr(atTesting + "@testing".length).trim();
    		var cg = new TestGroup(description, this.packageNumber, lineNumber);
    		this.currentTestGroup = cg;
    		return cg;
    	}
    	else if (doubleSolidus == 0 || sourceline.length == 0) {
        	// skip C++ style comment lines and blank lines
    		return null;
    	}
    	else if (doubleSolidus > 0 ) {
        	// Strip trailing C++ style comment
    		sourceline = sourceline.substr(0, doubleSolidus);
    	}
    	
    	if (this.inCommonSection()) {
    		return new CommonCode(sourceline);
    	}
    	else if (this.inSituationSection()) {
    		return new SituationCode(sourceline);
    	}
    	else if (this.inTestSection()) {
    		// split the JavaScript into a proposition and a proof
    		var parts = sourceline.split(';;');
    		var propositionJS = parts[0].trim();
    		var proofJS = (parts.length < 2) ? "" : parts[1].trim();
    		return new TestCase(propositionJS, proofJS, this.currentSituationSection, this.currentTestGroup, this.packageNumber, lineNumber);
    	}
    	else {
    		log.abnormal(`Is this code or test? "${sourceline}"`);
    		return null;
    	}
    }
}
