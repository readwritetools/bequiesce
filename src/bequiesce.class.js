//=============================================================================
//
// File:         src/bequiesce.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Be Quiet Test Harness
//
//=============================================================================

import Pfile from "./pfile.class";
import Log from "./log.class";
import Jot from "./jot.class";
import TestPackage from "./test-package.class";

export default class Bequiesce {
	
	static _instance;

    constructor() {
    	if (Bequiesce._instance !== undefined)
    		return Bequiesce._instance;
    	
    	this._rootPath = null;						// absolute path to the project; dynamically determined upon initialization
    	this._testPackages = new Array();			// an array of TestPackage(testfilename, success count, fail count, Array(line number of failures))
    	this._shuntReportsTo = "stdout";			// the keyword "stdout" or a Pfile
    	this.initialize();
    	Bequiesce._instance = this;					// singleton
    	Object.seal(this);
    }
    
    //^ singleton
    static getInstance() {
    	if (Bequiesce._instance === undefined) {
    		return new Bequiesce();
    	}
   		return Bequiesce._instance;
    }

    //^ capture the path to the user's test suite script file
    initialize() {
    	if (process.argv.length < 1)
    		log.hopelessHalt("Expected argv to contain the path to the script.");
    	var usersScriptFile = process.argv[1];
    	log.expect(usersScriptFile, 'String');
    	this._rootPath = new Pfile(usersScriptFile).getPath();
    }
    
    testPackage(filename) {
    	log.expect(filename, 'String');
    	var pfile = new Pfile(this._rootPath).addPath(filename)
    	if (pfile.exists()) {
    		var packageNumber = this._testPackages.length;
    		var pkg = new TestPackage(pfile, packageNumber);
    		this._testPackages.push(pkg);
    	}
    	else
    		log.invalid(`Test package ${pfile.getFQN()} not found, skipping`);
    	return this;
    }
    
	shuntReportsTo(filename) {
    	log.expect(filename, 'String');
		this._shuntReportsTo = new Pfile(filename).getFQN();
    	return this;
	}

	runTests() {
		for (let pkg of this._testPackages) { 
			if (pkg.parse()) {
				pkg.runTests();
				pkg.reportResults("", this._shuntReportsTo);
			}
		}
    	jot.trace("");
    	jot.trace("==== Done =========================");
	}
	
	//^ Get the filename of the package at the given index
	packageNameFromIndex(packageNumber) {
		log.expect(packageNumber, 'Number');
		
		if (packageNumber >= this._testPackages.length) {
			log.invalid(`Invalid packageNumber ${packageNumber}`);
			return '';
			}
		
		return this._testPackages[packageNumber].pfile.getStem();
	}
}

// The only globals
global.log = new Log();
global.jot = new Jot();
