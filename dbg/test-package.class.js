//=============================================================================
//
// File:         bequiesce/src/test-package.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     A TestPackage object corresponds to a single user test case
//               file containing several "using" sections, each with one or more "testing" groups
//
//=============================================================================

var expect = require('joezone').expect;
var TextReader = require('joezone').TextReader;
var Pfile = require('joezone').Pfile;
var ParserFactory = require('./parser-factory.class.js');
var CommonSection = require('./common-section.class.js');
var CommonCode = require('./common-code.class.js');
var SituationSection = require('./situation-section.class.js');
var SituationCode = require('./situation-code.class.js');
var TestGroup = require('./test-group.class.js');
var TestCase = require('./test-case.class.js');
var StatsRecoder = require('./stats-recorder.class.js');
var Jot = require('./jot.class.js');

module.exports = class TestPackage {
	
    constructor(pfile, packageNumber) {
    	expect(pfile, 'Pfile');
    	expect(packageNumber, 'Number');

    	this.pfile = pfile;							// the user's test case file
    	this.packageNumber = packageNumber;			// the 0-based index into the Bequiesce._testPackages array for this TestPackage
    	this.commonSection = new CommonSection('[auto]', packageNumber, 0);	// a single CommonSection identified by @common
    	this.sections = new Array();				// an array of SituationSections identified by @using
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.lineNumber = 1;						// 1-based line number of the user's test case file currently being parsed 
    	this.sectionIndex = null;					// 0-based index into the array of SituationSections of the user's test case file currently being parsed 
    	Object.seal(this);
    }
    
    get filename() {
    	return this.pfile.getFQN();
    }
    
    getCommonSection() {
    	return this.commonSection;
    }
    
    //^ read the user specifiied test case file and find the '@common' CommonSections, the '@using' TestSections and the corresponding '@testing' TestGroups
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
			else if (obj.constructor.name =='CommonSection') {
	    		this.addCommonSection(obj);
	    	}
 			else if (obj.constructor.name == 'CommonCode') {
	    		this.addCommonCode(obj);
	    	}
			else if (obj.constructor.name =='SituationSection') {
	    		this.addSituationSection(obj);
	    	}
	    	else if (obj.constructor.name == 'SituationCode') {
	    		this.addSituationCode(obj);
	    	}
	    	else if (obj.constructor.name == 'TestGroup') {
	    		this.addTestGroup(obj);
	    	}
	    	else if (obj.constructor.name == 'TestCase') {
	    		this.addTestCase(obj);
	    	}
	    	else {
	    		log.hopelessHalt(`Encountered ${obj.constructor.name}`);
	    	}
    	}
    	tr.close();
    	return true;
    }
    
    addCommonSection(cs) {
    	expect(cs, 'CommonSection');
    	if (this.commonSection.isValid())
    		log.trace(`Replacing previous @common section ${this.commonSection.description}`);
		this.commonSection = cs;
    }
    
    addSituationSection(cs) {
    	expect(cs, 'SituationSection');
		this.sections.push(cs);
		this.sectionIndex = this.sections.length-1;
    }
    
    currentSituationSection() {
    	if (this.sectionIndex == null) {
    		log.abnormal("Adding a default SituationSection because none found");
    		this.addSituationSection( new SituationSection("[auto]", this.packageNumber, this.lineNumber) );
    	}    		
    	return this.sections[this.sectionIndex];
    }
    
    addTestGroup(tg) {
    	expect(tg, 'TestGroup');
    	this.currentSituationSection().addTestGroup(tg);
    }
    
    addTestCase(tc) {
    	expect(tc, 'TestCase');
    	this.currentSituationSection().addTestCase(tc);
    }

    addCommonCode(cc) {
    	expect(cc, 'CommonCode');
    	if (this.commonSection == null) {
    		log.abnormalHalt("No commonSection");
    	}
    	this.commonSection.addJavascript(cc.javascript);
    }

    addSituationCode(sc) {
    	expect(sc, 'SituationCode');
    	this.currentSituationSection().addJavascript(sc.javascript);
    }
    
    runTests() {
    	for (let section of this.sections) {

    		section.runTests();
    		this.statsRecorder.incrementSuccess( section.statsRecorder.passCount );
   			this.statsRecorder.incrementFailure( section.statsRecorder.failCount );
    	}
    }
    
	reportResults(prefix, shuntReportsTo) {
		expect(prefix, 'String');
		expect(shuntReportsTo, 'String');
		
		if (this.commonSection.isValid()) {
			/*
	    	jot.trace("");
	    	jot.trace("==== Common =======================");
	    	jot.trace(this.commonSection, this.commonSection.description);
	    	jot.trace(this.commonSection.commonJS);
	    	*/
		}
		
    	jot.trace("");
    	//jot.trace("==== Results ======================");
		prefix += " "; 
    	for (let section of this.sections) {
    		section.reportResults(prefix, shuntReportsTo);
    	}
    	
    	//jot.trace("");
    	//jot.trace("==== Summary ======================");
    	//jot.trace(`Package: ${this.pfile.getFQN()}`);
    	//jot.trace(`Pass:    ${this.statsRecorder.passCount}`);
       	//jot.trace(`Fail:    ${this.statsRecorder.failCount}`);
		var passCount = Jot.rightJustify(this.statsRecorder.success.toString(), 3);
		var failCount = Jot.rightJustify(this.statsRecorder.failure.toString(), 3);
		//var prefix = Jot.rightJustify(prefix, 45);
   		var s = ` Pass ${passCount}    Fail ${failCount}`;
   		jot.trace("                                 --------    --------");
   		jot.trace(this, s);
	}

}