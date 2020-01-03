//=============================================================================
//
// File:         bequiesce/src/test-case.class.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT
// Initial date: Sep 14, 2015
// Contents:     A single line of a TestGroup that contains a proposition and
//               a proof, where the pair is separated by ";;"
//               Each proof may contain one or more snippets to be asserted.
//
//=============================================================================

var expect = require('joezone').expect;
var TextWriter = require('joezone').TextWriter;
var Pfile = require('joezone').Pfile;
var FS = require('fs');
var StatsRecoder = require('./stats-recorder.class.js');
var FilenameResolver = require('./filename-resolver.class.js');

module.exports = class TestCase {
	
    constructor(propositionJS, proofJS, situationSection, testGroup, packageNumber, lineNumber) {
    	expect(propositionJS, 'String');
    	expect(proofJS, 'String');
    	expect(situationSection, 'SituationSection');
    	expect(testGroup, 'TestGroup');
    	expect(packageNumber, 'Number');
    	expect(lineNumber, 'Number');
    	
    	this.propositionJS = propositionJS;			// the first half of the line, that contains context and values
    	this.proofJS = proofJS;						// the second half of the line, that contains assertions about the proposition
    	this.snippetsJS = new Array();				// the parts of the proofJS (separated by '&&') that are to be individually tested
    	this.situationSection = situationSection;	// the SituationSection that contains the situationJS for this case
    	this.testGroup = testGroup;					// the testGroup that contains this testCase
    	this.packageNumber = packageNumber;			// the 0-based index into the Bequiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// testing" occurs
    	this.statsRecorder = new StatsRecoder();	// successes and failures
    	this.visited = [];							// an array of FQN filename that have been expanded, use this to prevent infinite recursion
    	this.initialize();
    	Object.seal(this);
    }

    initialize() {
    	var pieces = this.proofJS.split('&&');
    	for (let snippet of pieces) {
    		snippet = snippet.trim();
    		if (snippet.length > 0) {
    			// remove any trailing semicolon
        		if (snippet.lastIndexOf(';') == snippet.length-1)
        			snippet = snippet.substr(0, snippet.length-1);
    			this.snippetsJS.push(snippet);
    		}
    	}
    }
    
    //< CommonSection
    getCommonSection() {
    	var cs = FilenameResolver.getPackage(this.packageNumber).getCommonSection();
    	expect(cs, 'CommonSection');
    	return cs;
    }
    
    runTests() {
    	for (let snippetJS of this.snippetsJS) {
    		
    		// clear the list of visited requires
    		this.visited = [];    		
    		var enclosingFilename = FilenameResolver.packageFQN(this.packageNumber);
    		
        	var commonJS = this.getCommonSection().commonJS;
        	var expandedCommonJS = this.expandCode(commonJS, enclosingFilename);
        	var situationJS = this.situationSection.situationJS
        	var expandedSituationJS = this.expandCode(situationJS, enclosingFilename);
        	
         	var message = this.evaluate(expandedCommonJS, this.propositionJS, expandedSituationJS, snippetJS);
        	expect(message, ['String','Boolean']);
          	if (message === true) {
          		this.statsRecorder.incrementSuccess();
          	}
          	else {
          		this.statsRecorder.incrementFailure();
          		this.printDetails(this.propositionJS, situationJS, snippetJS, message);
          	}
    	}
    }
    
    //^ suitable for failures
    printDetails(propositionJS, situationJS, proofJS, message) {
    	expect(propositionJS, 'String');
    	expect(situationJS, 'String');
    	expect(proofJS, 'String');
    	expect(message, ['String','Boolean']);

    	jot.trace("");
    	jot.trace("==== Test Case =====================");
    	jot.trace(this.situationSection,` Section:     ${this.situationSection.description}`);
    	jot.trace(this.testGroup,   	` Group:       ${this.testGroup.description}`);
    	jot.trace(this, 				` Proposition: ${propositionJS}`);
    	jot.trace(this, 				` Proof:       ${proofJS} <-- FAILED`);
    	if (message.constructor.name == 'String')
    		jot.trace(this, 			` Exception:   ${message}`);
    	jot.trace(this.situationSection, " Situation:");
       	jot.trace(situationJS);
    }
    
    //^ evaluate the JavaScript
    //> commonJS
    //> propositionJS
    //> situationJS
    //> proofJS
    //< return true if the proof succeeds, false if the proof fails
    //< returns an exception message on catch()
    evaluate(commonJS, propositionJS, situationJS, proofJS) {
    	expect(commonJS, 'String');
    	expect(propositionJS, 'String');
    	expect(situationJS, 'String');
    	expect(proofJS, 'String');

    	var code = `${commonJS}\n${propositionJS}\n${situationJS}\nglobal.__b = (${proofJS});`
    	
    	try {
    		eval(code);
    		return global.__b;
    	} catch (e) {
    		if (true) { // @verbose
    			
    			// dump the code someplace where it can be run directly using "node --use_strict test/test-case-dump.js"
    			var tw = new TextWriter();
    			
    			var pFile = new Pfile('../test');
    			pFile.makeAbsolute();
    			if (!pFile.exists() ) {
    				jot.trace(`Creating test case dump directory ${pFile.name}`);
    				pFile.mkDir();
    			}
    			pFile.addPath('test-case-dump.js');
    			
    			tw.open(pFile.name);
    			tw.putline(code);
    			tw.close();
// TODO
// https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
    		}
   			return `${e.constructor.name}: ${e.message} (Exact line number is not available, be sure to check both @common and @using code sections)`;
    	}
    }
    
    //^ The given string contains JavaScript that may have import and export statements or require and module.exports statements
    //  Use this function to load those imports into the string.
    //> The JavaScript to expand
    //> The fully qualified filename where this JavaScript resides
    //< returns the expanded JavaScript
    expandCode(jsIn, enclosingFilename) {
    	expect(jsIn, 'String');
    	expect(enclosingFilename, 'String');
    	var jsOut = [];

    	var regexA = "import\\s+(.*?)";
    	var regexB = "\\s+from\\s+(.*)";
    	var regexC = new RegExp(regexA + regexB);

    	var regexD = "var\\s+(.*)\\s+=\\s+";
    	var regexE = "require\\('(.*?)'\\);";
    	var regexF = new RegExp(regexD + regexE);

    	var regexG = new RegExp("(module.exports\\s+=\\s+)(.*)");
    	
    	// read each line of JavaScript code to find all import statements
    	var lines = jsIn.split("\n");
    	for (let line of lines) {

    		// find "module.exports =" and strip out
    		var match = regexG.exec(line);
    		if (match != null) {
    			jsOut.push(match[2]);
    		}
    		else {
	    		// find "import" or "require" lines	
	    		match = regexC.exec(line);
	    		if (match == null)
	        		match = regexF.exec(line);
	    		if (match == null) {
	    			jsOut.push(line);
	    		}
	    		else {
	    			// resolve filename
	    			var importFilename = this.resolveFilename(match[2], enclosingFilename);

	    			// has this filename already been expanded 
	    			if (this.visited.indexOf(importFilename) == -1) {
	    				// since this filename hasn't been visited yet, add it to the list of visited files and recurse
	    				this.visited.push(importFilename);
	
	        			var pfile = new Pfile(importFilename);
	        			var fileOnly = pfile.getFilename();
	    				var bSystemImport = (fileOnly == 'fs' || fileOnly == 'path' || fileOnly == 'crypto' || fileOnly == 'http' || fileOnly == 'https' ||fileOnly == 'http2' || fileOnly == 'url' || fileOnly == 'child_process');

	    				// system imports, just echo the original line
	        			if (bSystemImport == true) {
	        				jsOut.push(line);
	        			}
    					// if the file exists, recurse
	        			else if (pfile.exists()) {
	        				var importContents = FS.readFileSync(importFilename, 'utf8');
        					var expandedImport = this.expandCode(importContents, importFilename);
	        				jsOut.push(expandedImport);
	        			}
	        			// file not found, report it
	        			else
	        				log.invalidHalt(`Import not found '${importFilename}' while parsing ${enclosingFilename}`);
	    			}
	    		}
    		}
    	}

    	return jsOut.join("\n");
    }
    
    // Given a filename found through regex, turn it into a real filename
    //> something like "../path/to/filename.class";
    //> The fully qualified filename where this JavaScript resides
    //< something like C:/full/path/to/filename.class.js
    resolveFilename(filename, enclosingFilename) {
    	expect(filename, 'String');
    	expect(enclosingFilename, 'String');

    	// remove any trailing semicolon
		if (filename.charAt(filename.length-1) == ';')
			filename = filename.substr(0, filename.length-1);
		
		// remove possible surrounding quotes
		var char0 = filename.charAt(0);
		var charN = filename.charAt(filename.length-1);
		if (char0 == charN && (char0 == '"' || char0 == "'"))
			filename = filename.substr(1, filename.length-2);

		// concatenate enclosing path and import path
		var path = new Pfile(enclosingFilename).getPath();
		var ppath = new Pfile(path).addPath(filename);
		
		// add '.js' if necessary
		if (!ppath.exists()) {
			var dotJS = new Pfile(ppath).addExtension('js');
			if (dotJS.exists())
				ppath = dotJS;
		}
		return ppath.getFQN();
    }
   
}
