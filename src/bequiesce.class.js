//=============================================================================
//
// File:         bequiesce/src/bequiesce.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Be Quiet Test Harness
//
//=============================================================================

import {expect} from 'joezone';
import {Pfile} from 'joezone';
import {Log} from 'joezone';
import Jot from "./jot.class";
import TestPackage from "./test-package.class";
import StatsRecoder from './stats-recorder.class';

export default class Bequiesce {
	
    constructor() {
    	if (global._bequiesceInstance != undefined)
    		return global._bequiesceInstance;
    	
    	this._rootPath = null;						// absolute path to the project; dynamically determined upon initialization
    	this._testPackages = new Array();			// an array of TestPackage(testfilename, success count, fail count, Array(line number of failures))
    	this._shuntReportsTo = "stdout";			// the keyword "stdout" or a Pfile
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.initialize();
    	global._bequiesceInstance = this;			// singleton
    	Object.seal(this);
    }
    
    //^ singleton
    static getInstance() {
    	if (global._bequiesceInstance == undefined) {
    		return new Bequiesce();
    	}
   		return global._bequiesceInstance;
    }

    //^ capture the path to the user's test suite script file
    initialize() {
    	if (process.argv.length < 1)
    		log.hopelessHalt("Expected argv to contain the path to the script.");
    	var usersScriptFile = process.argv[1];
    	expect(usersScriptFile, 'String');
    	this._rootPath = new Pfile(usersScriptFile).getPath();
    }
    
    //^ A userland function to add a filename to the list of packages to be evaluated
    //> filename is FQN
    testPackage(filename) {
    	expect(filename, 'String');
    	var pfile = new Pfile(filename);
    	if (pfile.exists()) {
    		var packageNumber = this._testPackages.length;
    		var pkg = new TestPackage(pfile, packageNumber);
    		this._testPackages.push(pkg);
    	}
    	else
    		log.invalid(`Test package ${pfile.getFQN()} not found, skipping`);
    	return this;
    }

	//^ Get the package object at the given index
	//> an 0-index into the _testPackages array
	//< a TestPackage object
	getPackage(packageNumber) {
		expect(packageNumber, 'Number');
		
		if (packageNumber >= this._testPackages.length) {
			log.invalidHalt(`Invalid packageNumber ${packageNumber}`);
		}
		var tp = this._testPackages[packageNumber];
		expect(tp, 'TestPackage');
		return tp;
	}
	
	//^ Userland command
	shuntReportsTo(filename) {
    	expect(filename, 'String');
		this._shuntReportsTo = new Pfile(filename).getFQN();
    	return this;
	}

	//^ Userland function to execute Bequiesce
	runTests() {
		for (let pkg of this._testPackages) { 
			if (pkg.parse()) {
				pkg.runTests();
				pkg.reportResults("", this._shuntReportsTo);
	    		this.statsRecorder.incrementSuccess( pkg.statsRecorder.passCount );
	   			this.statsRecorder.incrementFailure( pkg.statsRecorder.failCount );
			}
		}
    	jot.trace("");
    	//jot.trace("==== Done ======================");
    	//jot.trace(`Packages: ${ this._testPackages.length}`);
    	//jot.trace(`Pass:     ${this.statsRecorder.passCount}`);
       	//jot.trace(`Fail:     ${this.statsRecorder.failCount}`);
		var passCount = Jot.rightJustify(this.statsRecorder.success.toString(), 3);
		var failCount = Jot.rightJustify(this.statsRecorder.failure.toString(), 3);
		//var prefix = Jot.rightJustify(prefix, 45);
   		var s = `Bequiesce                        Pass ${passCount}    Fail ${failCount}`;
   		jot.trace("                                 ========    ========");
   		jot.trace(s);
    	jot.trace("");
    	
    	return (failCount > 0) ? 1 : 0;    		
	}
	
}

// The only globals
global.log = new Log();
global.jot = new Jot();
