//=============================================================================
//
// File:         src/test-package.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     A TestPackage object corresponds to a single user test case
//               file containing several "using" sections, each with one or more "testing" groups
//
//=============================================================================

import Pfile from "./pfile.class";
import TextReader from "./text-reader.class";
import ParserFactory from "./parser-factory.class";
import CodeSection from "./code-section.class";

export default class TestPackage {
	
    constructor(pfile, packageNumber) {
    	log.expect(pfile, 'Pfile');
    	log.expect(packageNumber, 'Number');
    	
    	this.pfile = pfile;						// the user's test case file
    	this.packageNumber = packageNumber;		// the 0-based index into the BeQuiesce._testPackages array for this TestPackage
    	this.sections = new Array();			// an array of CodeSections identified by '// using'
    	this.lineNumber = 1;					// current 1-based line number of the user's test case file being parsed 
    	this.sectionIndex = null;				// current index into the array of Sections
    	Object.seal(this);
    }
    
    get filename() {
    	return this.pfile.getFQN();
    }
    
    //^ read the user specifiied test case file and find the '// using' TestSections and corresponding  '// testing' TestGroups
    parse() {
    	var pf = new ParserFactory(this.packageNumber);		// packageNumber is passed into each object it creeates
    	var tr = new TextReader();
    	tr.open(this.pfile.getFQN());
    	
    	var sourceline = null;
		while ((sourceline = tr.getline()) != null) {
			var obj = pf.parseLine(sourceline, this.lineNumber++);
	    	
			if (obj == null){
				// no-op
			}
			else if (obj instanceof CodeSection) {
	    		this.addCodeSection(obj);
	    	}
	    	else if (obj instanceof TestGroup) {
	    		this.addTestGroup(obj);
	    	}
	    	else if (obj instanceof TestCase) {
	    		this.addTestCase(obj);
	    	}
	    	else if (obj instanceof String) {
	    		this.addJavascript(obj);
	    	}
	    	else {
	    		log.abnormal(`Unable to parse this line: "${sourceline}"`);
	    	}
    	}
    	tr.close();
    }
    
    addCodeSection(cs) {
    	log.expect(cs, 'CodeSection');
		this.sections.push(cs);
		this.sectionIndex = this.sections.length-1;
    }
    
    currentCodeSection() {
    	if (this.sectionIndex == null) {
    		log.abnormal("Adding a default CodeSection because none found");
    		this.addCodeSection( new CodeSection() );
    	}    		
    	return this.sections[this.sectionIndex];
    }
    
    addTestGroup(tg) {
    	log.expect(tg, 'TestGroup');
    	this.currentCodeSection().addTestGroup(tg);
    }
    
    addTestCase(tc) {
    	log.expect(tc, 'TestCase');
    	this.currentCodeSection().addTestCase(tc);
    }

    addJavascript(js) {
    	log.expect(js, 'String');
    	this.currentCodeSection().addJavascript(js);
    }
   
    executeSections() {
    	// loop on this.sections
    	for (section in this.sections) {
    		log.trace(`executing ${section.description}`);
    	}
    	trace.todo();
    }
}