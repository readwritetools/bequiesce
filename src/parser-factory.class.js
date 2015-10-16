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

import CommonSection from './common-section.class';
import CommonCode from './common-code.class';
import SituationSection from './situation-section.class';
import SituationCode from './situation-code.class';
import TestGroup from './test-group.class';
import TestCase from './test-case.class';
import expect from '../../joezone/src/expect.function.js';

export default class ParserFactory {
	
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
    	else if (sourceline.indexOf("//") == 0 || sourceline.length == 0) {
        	// skip C++ style comment lines and blank lines
    		return null;
    	}
    	else if (this.inCommonSection()) {
    		return new CommonCode(sourceline);
    	}
    	else if (this.inSituationSection()) {
    		return new SituationCode(sourceline);
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
    		return new TestCase(propositionJS, proofJS, this.currentSituationSection, this.currentTestGroup, this.packageNumber, lineNumber);
    	}
    	else {
    		log.abnormal(`Is this code or test? "${sourceline}"`);
    		return null;
    	}
    }
}
