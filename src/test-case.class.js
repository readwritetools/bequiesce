//=============================================================================
//
// File:         src/test-case.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 14, 2015
// Contents:     A single line of a TestGroup that contains a proposition and
//               a proof, where the pair is separated by ";;"
//               Each proof may contain one or more snippets to be asserted.
//
//=============================================================================

import FS from 'fs';
import StatsRecoder from './stats-recorder.class';
import Pfile from './pfile.class';
import FilenameResolver from './filename-resolver.class';

export default class TestCase {
	
    constructor(propositionJS, proofJS, situationSection, testGroup, packageNumber, lineNumber) {
    	log.expect(propositionJS, 'String');
    	log.expect(proofJS, 'String');
    	log.expect(situationSection, 'SituationSection');
    	log.expect(testGroup, 'TestGroup');
    	log.expect(packageNumber, 'Number');
    	log.expect(lineNumber, 'Number');
    	
    	this.propositionJS = propositionJS;			// the first half of the line, that contains context and values
    	this.proofJS = proofJS;						// the second half of the line, that contains assertions about the proposition
    	this.snippetsJS = new Array();				// the parts of the proofJS (separated by '&&') that are to be individually tested
    	this.situationSection = situationSection;	// the SituationSection that contains the situationJS for this case
    	this.testGroup = testGroup;					// the testGroup that contains this testCase
    	this.packageNumber = packageNumber;			// the 0-based index into the Bequiesce._testPackages array for this object's containing TestPackage
    	this.lineNumber = lineNumber;				// current 1-based line number where the "// testing" occurs
    	this.statsRecorder = new StatsRecoder();	// successes and failures
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
    	log.expect(cs, 'CommonSection');
    	return cs;
    }
    
    runTests() {
    	for (let snippetJS of this.snippetsJS) {
    		
    		var enclosingFilename = FilenameResolver.packageFQN(this.packageNumber);
    		
        	var commonJS = this.getCommonSection().commonJS;
        	//var expandedCommonJS = this.expandCode(commonJS, enclosingFilename);
        	var expandedCommonJS = commonJS;

        	var situationJS = this.situationSection.situationJS
        	//var expandedSituationJS = this.expandCode(situationJS, enclosingFilename);
        	var expandedSituationJS = situationJS;
        	
         	var message = this.evaluate(expandedCommonJS, this.propositionJS, expandedSituationJS, snippetJS);
        	/* TODO log.expect(message,'String|Boolean'); */
         	
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
    	log.expect(propositionJS, 'String');
    	log.expect(situationJS, 'String');
    	log.expect(proofJS, 'String');
    	/* TODO log.expect(message,'String|Boolean'); */

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
    	log.expect(commonJS, 'String');
    	log.expect(propositionJS, 'String');
    	log.expect(situationJS, 'String');
    	log.expect(proofJS, 'String');

    	var code = `${commonJS}\n${propositionJS}\n${situationJS}\nglobal.__b = (${proofJS});`
//    	log.trace("\n" + code);
    	
    	var js1 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/sphericoords.js");
    	var js2 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/remquo.js");
    	var js3 = FS.readFileSync("./examples/05-spherical-coordinates/codebase/number.js");
    	
    	try {
    		eval( js1 + js2 + js3 + code);
    		//eval(code);
    		return global.__b;
    	} catch (e) {
    		return `${e.constructor.name}: ${e.message} (Exact line number is not available, be sure to check both @common and @using code sections)`;
    	}
    }
    
    //^ The given string contains JavaScript that may have import statement.
    //  Use this function to load those imports into the string.
    //> The JavaScript to expand
    //> The fully qualified filename where this JavaScript resides
    //< returns the expanded JavaScript
    expandCode(jsIn, enclosingFilename) {
    	log.expect(jsIn, 'String');
    	log.expect(enclosingFilename, 'String');

    	var jsOut = [];
		// circumvent exim parsing
    	var regexA = "import .*?";
    	var regexB = " from (.*)";
    	var regex = new RegExp(regexA + regexB);

    	// read each line of JavaScript code to find all import statements
    	var lines = jsIn.split("\n");
    	for (let line of lines) {
    		
    		var match = regex.exec(line);
    		if (match == null) {
    			jsOut.push(line);
    			log.trace(line);
    		}
    		else {
    			// resolve filename
    			var importFilename = this.resolveFilename(match[1], enclosingFilename);
    			log.trace('IMPORT ', importFilename);
    			var importContents = FS.readFileSync(importFilename, 'utf8');
    			
    			// recurse
    			var expandedImport = this.expandCode(importContents, importFilename);
    			jsOut.push(expandedImport);
    		}
    	}
    	
    	// parse the import statement to find the filename
    	
    	// call the loader to find the file and read its contents
    	
    	
    	// import Buddha from './buddha.class';

    	// remove the "export default"
    	/*
    	export default class Buddha {
    		
    	    constructor(text) {
    	    	log.expect(text, 'String');
    	    	
    	    	this.text = " Hello " + text;
    	    	Object.seal(this);
    	    }
    	}    	*/
    	
    	// loader keeps track of which files it has loaded
    	
    	return jsOut.join("\n");
    }
    
    // Given a filename found through regex, turn it into a real filename
    //> something like "../path/to/filename.class";
    //> The fully qualified filename where this JavaScript resides
    //< something like C:/full/path/to/filename.class.js
    resolveFilename(filename, enclosingFilename) {
    	log.expect(filename, 'String');
    	log.expect(enclosingFilename, 'String');
    	
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
		//log.trace(`E: [${ppath.getFQN()}]`);
		return ppath.getFQN();
    }
   
}