//=============================================================================
//
// File:         src/cli.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 22, 2015
// Contents:     Command Line Interface for Bequiesce
//
//=============================================================================

import Bequiesce from './bequiesce.class';
import Pfile from "./pfile.class";
import Bunch from "./bunch.class";

export default class CLI {
	
    constructor() {
    	Object.seal(this);
    }
    
    //^ Check to see if all the necessary command line arguments are present and valid
    //< returns false on failure
    validateOptions() {
    	if (process.argv.length < 3)
    		log.invalidHalt("usage: bequiesce testdir");
    	return true;
    }

    //^ Parse the instructions file to get project paths and files, then read the manuscripts
    execute() {

    	var bequiesce = Bequiesce.getInstance();
    	
    	// argv[2] is the test directory, and Bunch requires an absolute path
    	var pfile = new Pfile(process.argv[2]).makeAbsolute();
    	
    	// find all *.test.js files in the specified dir and add them as packages
    	var bunch = new Bunch(pfile.getPath(), '*.test.js');    	
    	var testPackages = bunch.find(true);
    	for (let tp of testPackages) {
    		log.trace(`adding package ${tp.getFQN()}`);
        	bequiesce.testPackage(tp.getFQN());
    	}
    	
    	// perform the tests
    	bequiesce.runTests();
   	}
}
