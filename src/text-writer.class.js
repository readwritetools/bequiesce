//=============================================================================
//
// File:         /joezone/src/text-writer.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 10, 2015
// Contents:     Class for writing text files one line at a time
//
//=============================================================================

import FS from 'fs';
import Log from './log.class';

export default class TextWriter {
		
    constructor() {
    	this.fd = null;								// file descriptor from open()
    	Object.seal(this);
    }
    
    //< returns true or false
    open(filename) {
    	log.expect(filename, 'String');
    	try {
    		this.fd = FS.openSync(filename, 'w');
   			return true;
    	} catch (e) {
    		log.abnormal(e.message);
    		return false;
    	}
    }
    
    isOpen() {
    	return (this.fd != null);
    }
    
    close() {
    	if (!this.isOpen())
    		return;
    	
    	try {
    		this.fd = FS.closeSync(this.fd);
   			this.fd = null;
    	} catch (e) {
    		log.abnormal(e.message);
   			this.fd = null;
    	}
    }

    //^ Write a sequence of chars
    puts(s) {
    	log.expect(s, 'String');
    	if (!this.isOpen())
    		return null;
    	
    	try {
        	FS.writeSync(this.fd, s);
    	} catch (e) {
    		log.abnormal(e.message);
    	}
    }
    
    //^ Write a line of text adding a linefeed at the end
    putline(line) {
    	this.puts(line + "\n");
    }
}

