//=============================================================================
//
// File:         src/jot.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 15, 2015
// Contents:     Formatted output to stdout
//
//=============================================================================

import Bequiesce from "./bequiesce.class";

export default class Jot {
	
    constructor() {    	
    	Object.seal(this);
    }
    
    trace(obj, message='') {
    	if (obj.hasOwnProperty('packageNumber') && obj.hasOwnProperty('lineNumber')) {
    		
    		var lineNumber = Jot.rightJustify( obj.lineNumber.toString(), 4);
    		var packageNumber = obj.packageNumber;
    		var filename = Bequiesce.getInstance().packageNameFromIndex(packageNumber);
    			
    		this.stdout(`[${filename}:${lineNumber}] ${message}`);
    	}
    	else
    		this.stdout(message);
    }
    
    //^ Send message to stdout
    stdout(s) {
    	process.stdout.write(`${s}\n`);
    }
    
    
    //> string to pad
    //> fixed length to achieve
    static rightJustify(sIn, fixedLen) {
    	log.expect(sIn, 'String');
    	log.expect(fixedLen, 'Number');
    	
    	sIn = sIn.substr(0, fixedLen);
    	if (sIn.length == fixedLen)
    		return sIn;
    	else
    		return "                           ".substr(0, fixedLen - sIn.length) + sIn;		// s/b " ".repeat(...)
    }
}