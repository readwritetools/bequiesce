//=============================================================================
//
// File:         bequiesce/src/jot.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 15, 2015
// Contents:     Formatted output to stdout
//
//=============================================================================

import FilenameResolver from "./filename-resolver.class";
import expect from '../../joezone/src/expect.function.js';

export default class Jot {
	
    constructor() {    	
    	Object.seal(this);
    }

    //> if the first argument has the {packageNumber, lineNumber}
    //  interface use it to prefix the message with the filename and linenumber
    trace(obj, message) {
    	if (message == undefined) message = '';

    	if (obj.hasOwnProperty('packageNumber') && obj.hasOwnProperty('lineNumber')) {
    		
    		var filename = FilenameResolver.packageStem(obj.packageNumber);
    		var lineNumber = obj.lineNumber.toString();
    		var fl = Jot.leftJustify(`[${filename}:`, 26);
    		var ln = Jot.rightJustify(`${lineNumber}]`, 5);
    		this.stdout(`${fl}${ln} ${message}`);
    	}
    	else
    		this.stdout(obj.toString());
    }
    
    //^ Send message to stdout
    stdout(s) {
    	process.stdout.write(`${s}\n`);
    }
    
    
    //^ Left justify the given string, padding with spaces.
    //> sIn is the string to pad
    //> fixedLen is the desired length
    //> clip anything longer than the fixed length
    static leftJustify(sIn, fixedLen, clip) {
    	if (clip == undefined) clip = true;

    	expect(sIn, 'String');
    	expect(fixedLen, 'Number');
    	expect(clip, 'Boolean');
    	
    	if (clip == true)
    		sIn = sIn.substr(0, fixedLen);
    	
    	if (sIn.length >= fixedLen)
    		return sIn;
    	else
    		return sIn + "                                                       ".substr(0, fixedLen - sIn.length);		// s/b " ".repeat(...)
    }
    
    //^ Right justify the given string, padding with spaces.
    //> sIn is the string to pad
    //> fixedLen is the desired length
    //> clip anything longer than the fixed length
    static rightJustify(sIn, fixedLen, clip) {
    	if (clip == undefined) clip = true;

    	expect(sIn, 'String');
    	expect(fixedLen, 'Number');
    	expect(clip, 'Boolean');
    	
    	if (clip == true)
    		sIn = sIn.substr(0, fixedLen);
    	
    	if (sIn.length >= fixedLen)
    		return sIn;
    	else
    		return "                                                       ".substr(0, fixedLen - sIn.length) + sIn;		// s/b " ".repeat(...)
    }
}