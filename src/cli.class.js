//=============================================================================
//
// File:         bequiesce/src/cli.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 22, 2015
// Contents:     Command Line Interface for Bequiesce
//
//=============================================================================

import Bequiesce from './bequiesce.class';
import Pfile from "../../joezone/src/pfile.class";
import Bunch from "../../joezone/src/bunch.class";

export default class CLI {
	
    constructor() {
    	Object.seal(this);
    }
    
    //^ Check to see if all the necessary command line arguments are present and valid
    //< returns false on failure
    validateOptions() {
    	if (process.argv.length < 3)
    		log.invalidHalt("Usage: bequiesce {testfile | testdir}\n   (only *.test.js files will be included if {testdir} is provided)");
    	return true;
    }

    //^ Parse the instructions file to get project paths and files, then read the manuscripts
    execute() {
    	var bequiesce = Bequiesce.getInstance();

    	// argv[2] is the test directory, and Bunch requires an absolute path
    	var pfile = new Pfile(process.argv[2]).makeAbsolute();
    	
    	// single file provided on the command line
    	if (pfile.isFile()) {
    		bequiesce.testPackage(pfile.getFQN());
    	}
    	// find all *.test.js files in the specified dir and add them as packages
    	else if (pfile.isDirectory()) {
	    	var bunch = new Bunch(pfile.getPath(), '*.test.js');    	
	    	var testPackages = bunch.find(true);
	    	for (let tp of testPackages) {
	        	bequiesce.testPackage(tp.getFQN());
	    	}
    	}
    	
    	// perform the tests
    	bequiesce.runTests();
   	}
    
    
}
