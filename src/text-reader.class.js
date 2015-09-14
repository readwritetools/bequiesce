//=============================================================================
//
// File:         src/text-reader.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 6, 2015
// Contents:     Class for reading text files one line at a time
//
//=============================================================================

import FS from 'fs';

export default class TextReader {
		
    constructor() {
    	this.fd = null;								// file descriptor from open()
    	this.readSize = 8192;						// number of bytes to transfer from file to buffer with each read
    	this.buffer = new Buffer(this.readSize);	// a nodejs Buffer (an array of octets outside the V8 heap)
    	this.bufferLength = null;					// number of valid bytes in the buffer; usually readSize but less when the last block of the file is retrieved
    	this.blockOffset = null;					// block offset into file for next readBlock()
    	this.bufferOffset = null;					// byte offset into the Buffer for next readOctet()
    	Object.seal(this);
    	
    	this.initialize();
    }
    
    initialize() {
    	this.buffer.fill(0x00);
    	this.bufferLength = 0;
    	this.blockOffset = 0;
    	this.bufferOffset = 0;
    }
    
    //< returns true or false
    open(filename) {
    	log.expect(filename, 'String');
    	try {
    		this.fd = FS.openSync(filename, 'r');
    		this.initialize();
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
    
    //^ get the next block of bytes from the disk
    //< returns true if something was read, false if nothing more was available
    readBlock() {
    	if (!this.isOpen())
    		return false;
    	
    	try {
	    	this.buffer.fill(0x00);
	    	this.bufferLength = FS.readSync(this.fd, this.buffer, 0, this.readSize, this.blockOffset);
	    	this.blockOffset += this.bufferLength;
	    	this.bufferOffset = 0;
	    	return (this.bufferLength > 0);
    	} catch(e) {
    		log.trace(e.message);
    		this.bufferLength = 0;
	    	this.bufferOffset = 0;
   			return false;
    	}
    }
    
    //^ get the next byte from the buffer.
    //  Automatically call readBlock when necessary
    //< returns a JavaScript Number from 0 to 255 corresponding to all possible 8-bit values
    //< returns the JavaScript Number -1 to indicate that nothing more was available
    readOctet() {    	
    	if (this.bufferOffset >= this.bufferLength) {
    		if (!this.readBlock())
    			return -1;
    	}

    	var octet = this.buffer[this.bufferOffset];
    	this.bufferOffset++;
    	return octet;
    }
       
    //^ Read a line of text from the internal buffer, stripping the trailing CRLF (Windows) or LF (Linux)
    //< returns a String, possibly empty; or a null when the end of file has been reached
    getline() {
    	if (!this.isOpen())
    		return null;
    	
    	var a = this.readOctet();
    	if (a == -1)
    		return null;			// previous call to getline() returned the last available text
    	
    	var octets = new Array();
    	while (a != -1) {
    		if (a == 0x0D) {		// CR (discard and continue)
        		a = this.readOctet();
    		}
    		else if (a == 0x0A)		// LF (discard and stop)
    			break;
    		else {
    			octets.push(a);
	    		a = this.readOctet();
    		}
    	}
    	
    	return TextReader.octetsToUtf8(octets);
    }
        
	// Originally from Masanao Izumo <iz@onicos.co.jp> Version: 1.0 (Dec 25 1999)
	//> an Array of Numbers with values from 0-255
	//< a String in UTF-8 encoding
	static octetsToUtf8(octets) {
	
		// sanity checks
		log.expect(octets, 'Array');
		for (let octet of octets) {
			log.expect(octet, 'Number');
			if (octet < 0 || octet > 255) {
				// emergency fallback
				log.invalid("The array of octets must contain number between 0 and 255");
				return octets.join('');
			}
		}
	
		var c, char2, char3, char4;
		var out = "";
		var len = octets.length;
		var i = 0;
		while (i < len) {
			c = octets[i++];
			switch(c >> 4)
			{
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					// --byte1--
					out += String.fromCharCode(c);
					break;
				case 12: case 13:
					// 110x xxxx  10xx xxxx
					// --byte1--  --byte2--
					char2 = octets[i++];
					out += String.fromCharCode(
							((c & 0x1F) << 6) |
							((char2 & 0x3F) << 0));
					break;
				case 14:
					// 1110 xxxx  10xx xxxx  10xx xxxx
					// --byte1--  --byte2--  --byte3--
					char2 = octets[i++];
					char3 = octets[i++];
					out += String.fromCharCode(
							((c & 0x0F) << 12) |
						    ((char2 & 0x3F) << 6) |
						    ((char3 & 0x3F) << 0));
					break;
				case 15:
					// 1111 0xxx  10xx xxxx  10xx xxxx  10xx xxxx
					// --byte1--  --byte2--  --byte3--  --byte4--
					char2 = octets[i++];
					char3 = octets[i++];
					char4 = octets[i++];
					/* unfortunately this is not yet supported 
					out += String.fromCharCode(
							((c & 0x07) << 18) |
				            ((char2 & 0x3F) << 12) |
				            ((char3 & 0x3F) << 6) |
				            ((char4 & 0x3F) << 0));
				    */
					out += "�";
					break;
				default:
					log.invalid("Poorly formed octet array, invalid UTF-8");
					out += "�";
			}
		}
		return out;
	}
}

