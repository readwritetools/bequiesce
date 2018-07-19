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

var terminal = require('joezone').terminal;
var Pfile = require('joezone').Pfile;
var Bunch = require('joezone').Bunch;
var Bequiesce = require('./bequiesce.class.js');
var fs = require('fs');

module.exports = class CLI {
	
    constructor() {
    	Object.seal(this);
    }
    
    //^ Check to see if all the necessary command line arguments are present and valid
	// argv[0] node
	// argv[1] main.js
	// argv[2] testfile or testdir or --option
    //< returns false to prevent actual execution
    validateOptions() {
    	
    	if (process.argv.length == 2)
    		this.usageAndExit();
    	
    	switch (process.argv[2]) {
	    	case '--version':
	    		this.exit(this.showVersion());
	    		return false;
	    		
	    	case '--syntax':
	    		this.exit(this.listSyntax());
	    		return false;
	    		
	    	case '--examples':
	    		this.exit(this.listExamples());
	    		return false;
	    		
	    	case '--help':
	    		this.exit(this.listHelp());
	    		return false;
	    		
	    	default:
	    		return true;
    	}
    }

    usageAndExit() {
		var s = [];
		s.push("usage: bequiesce [testfile | testdir] [options]");
		s.push("");
		s.push("options:");
		s.push("    --version");
		s.push("    --syntax     explains the bequiesce test file syntax");
		s.push("    --examples   show examples of bequiesce test files");
		s.push("    --help       show bequiesce syntax, examples");
		this.exit(s.join("\n"));
    }
    
    showVersion() {
    	try {
    		var packageFile = new Pfile(__dirname).addPath('../package.json').name;
	    	var contents = fs.readFileSync(packageFile, 'utf-8');
	    	var obj = JSON.parse(contents);
	    	return `version v${obj.version}`;
    	}
    	catch (err) {
    		return `version unknown ${err.message}`;
    	}
    }

    listSyntax() {
		var s = [];
		s.push("Syntax:");
		s.push("Test files contain JavaScript-compliant syntax within three sections,");
		s.push("where each section is preceeded by one of these special comment delimiters:");
		s.push("  // @common  code that follows this comment defines code to be executed for each test case (optional)");
		s.push("  // @using   code that follows this comment defines code to be executed for each test case (required)");
		s.push("  // @testing code that follows this comment defines a single test case per line, executing @common and @using code for each test case");
		s.push("");
		s.push("Each line in the @testing section must contain a proposition and one or more proofs.");
		s.push("  The proposition and proofs are separated by ';;'");
		s.push("  When multiple proof statements are provided, they are separated by '&&'");
		s.push("");
		s.push("Execution is procedural, from top to bottom.");
		s.push("The @common section is optional, but may be specified only once.");
		s.push("There may be more than one @using or @testing section per test file.");
		s.push("");
		return s.join("\n")
    }
    
    listExamples() {
		var s = [];
		s.push("Examples:");
		s.push("");
		s.push("// @using");
		s.push("var z = x + y;");
		s.push("");
		s.push("// @testing strings");
		s.push("x = 'Hello '; y = 'World!';   ;;   z == 'Hello World!'");
		s.push("x = '1'; y = '2'              ;;   (typeof x == 'string') && (typeof y == 'string') && (typeof z == 'string') && z == '12'");
		s.push("");
		s.push("// @testing numbers");
		s.push("x = 1; y = 2                  ;;   Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z) && z == 3");
		s.push("x = 1.0; y = 2.0              ;;   z == 3.0");
		s.push("");
		s.push("// @using");
		s.push("var sc = new SpheriCoords(radians);");
		s.push("var dms = sc.asDegreesMinutesSeconds();");
		s.push("");
		s.push("// @testing");
		s.push("var radians = 1.0;           ;;  dms.degrees == 57  && dms.arcminutes == 17 && dms.arcseconds == 45");
		s.push("var radians = 2.0;           ;;  dms.degrees == 114 && dms.arcminutes == 35 && dms.arcseconds == 30");
		s.push("var radians = 3.0;           ;;  dms.degrees == 171 && dms.arcminutes == 53 && dms.arcseconds == 14");
		s.push("var radians = Math.PI;       ;;  dms.degrees == 180 && dms.arcminutes == 0  && dms.arcseconds == 0");
		s.push("var radians = 4.0;           ;;  dms.degrees == 229 && dms.arcminutes == 10 && dms.arcseconds == 59");
		s.push("var radians = 5.0;           ;;  dms.degrees == 286 && dms.arcminutes == 28 && dms.arcseconds == 44");
		s.push("var radians = 6.0;           ;;  dms.degrees == 343 && dms.arcminutes == 46 && dms.arcseconds == 29");
		s.push("var radians = 2*Math.PI;     ;;  dms.degrees == 360 && dms.arcminutes == 0  && dms.arcseconds == 0");
		return s.join("\n")
    }

    listHelp() {
		var s = [];
		s.push("");
		s.push("usage: bequiesce [testfile | testdir] [options]");
		s.push("");
		s.push( this.listSyntax() );
		s.push("");
		s.push( this.listExamples() );
		return s.join("\n")
    }
    
    exit(message) {
		terminal.writeToConsoleOrStderr("\nBequiesce is a test harness to run JavaScript test files\n");
		terminal.writeToConsoleOrStderr(message + "\n");
		process.exit(0);
    
    }

    //^ Parse the instructions file to get project paths and files, then read the test files
    execute() {
    	var bequiesce = Bequiesce.getInstance();

    	// argv[2] is the test directory, and Bunch requires an absolute path
    	var pfile = new Pfile(process.argv[2]).makeAbsolute();
    	
    	if (!pfile.exists()) {
    		terminal.writeToConsoleOrStderr(`${pfile.name} not found`);
    		return;
    	}
    	
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
    	var rc = bequiesce.runTests();
		process.exit(rc);
   	}
        
}
