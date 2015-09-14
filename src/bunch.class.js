//=============================================================================
//
// File:         src/bunch.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Aug 29, 2015
// Contents:     Methods for getting a bunch of files from a directory.
//
//=============================================================================

import FS from 'fs';
import Pfile from './pfile.class';

export default class Bunch {
	
    static get FILE() 		{ return 1; }
    static get DIRECTORY() 	{ return 2; }
    static get SYMLINK() 	{ return 4; }
		
	//^ Use the constructor's arguments or use the "path" and "pattern" accessors
	//> path is a string representing an absolute path in the file system
	//> pattern is a glob-regex pattern that specifies which files or directories to match
	//  These glob-regex patterns are recognized:
	//    *		     zero or more characters
	//    ?          any single character
	//    (txt|js)	 either the sequence "txt" or the sequence "js"
	//    [AEIOU]	 any one of the characters between the brackets
	//    [0-9]		 any one of the characters in the specified range
	//    [^0-9]	 any one character except those in the specified range
	//    [A-F]{6}   a sequence of exactly 6 characters in the specified range
	//    [A-F]{0,6} a sequence of 0 to 6 characters in the specified range
	//
	//  In order to explicitly match files that contain the special values (|)[]{}^\, the caller must escape the pattern with '\'
	//
	//  Note that the dot '.' which is normally allowed in a regular expression to match any character, is simply interpreted as a dot, use the star '*" instead
	//
	//> flags is the bitwise OR of:
	//    FILE:      1 to match files
	//    DIRECTORY: 2 to match directories
	//    SYMLINK:   4 to match symbolic links

    constructor(arg1, arg2, arg3) {    	
    	if (arg1.constructor.name == 'Bunch')
    		this._copyConstructor(arg1);
    	else if (arg1.constructor.name == 'Pfile')
    		this._pfileConstructor(arg1, arg2);
    	else if (arg1.constructor.name == 'String')
    		this._stringConstructor(arg1, arg2, arg3);
    	else
    		log.logic("The first argument to a new Bunch should be one of {Bunch, Pfile, String}");

    	Object.seal(this);
    }
    
    //> rhs Bunch
    _copyConstructor(rhs) {
    	this._path = rhs._path;
        this._pattern = rhs._pattern;
        this._flags = rhs._flags;
    }

    //> pfile Pfile containing both path and string
    //> flags Number
    _pfileConstructor(pfile, flags=Bunch.FILE) {
    	this._path = new Pfile(pfile.getPath());
        this._pattern = pfile.getFilename();
        this._flags = flags;
    }

    //> path String
    //> pattern String
    //> flags Number
    _stringConstructor(path, pattern='*', flags=Bunch.FILE) {
    	this._path = new Pfile(path);
        this._pattern = pattern;
        this._flags = flags;
    }
    
    set path(p) {
    	this._path = new Pfile(p);
    }

    get path() {
    	return this._path;
    }
    
    set pattern(p) {
    	this._pattern = p;
    }

    get pattern() {
    	return this._pattern;
    }

    set flags(p) {
    	// sanitize
    	this._flags = p  & (Bunch.FILE + Bunch.DIRECTORY + Bunch.SYMLINK);
    }

    get flags() {
    	return this._flags;
    }

    //^ Concatentate a POSIX path string to the current path. 
    addPath(path) {
    	this._path.addPath(path);
    	return this;
    }
    
    //^ Find the file/directories from the filesystem that are in the given path and that match the given pattern.
    //> returnFullPath is true to prefix each filename returned with the full path, or false to include only the base filename
    //< returns an array of Pfile objects (or an empty array when nothing matches)
    //
    find(returnFullyQualifiedPath = false) {
    	
    	// if the path is not absolute, inform the user with a log.logic
    	if (this._path.isRelative()) {
    		log.logic(`Using a relative path "${this._path.name}" is probably not what you want.`);
    	}
    	
    	// if the path contains * or ?, inform the user with a log.invalid
    	if (this._path.name.indexOf('*') != -1 || this._path.name.indexOf('?') != -1) {
    		log.invalid(`The path "${this._path.name}" should not contain wildcard characters. Place wildcard characters in the pattern only.`);
    		return;
    	}
    	
    	// if the path does not exist, inform the user with a log.logic
    	if (!this._path.exists()) {
    		log.logic(`The path "${this._path.name}" does not exist.`);
    		return;
    	}
    	
    	// if the pattern is an empty string, inform the user with a log.invalid
    	if (this._pattern == '') {
    		log.invalid(`The pattern is empty, did you mean "*"?`);
    		return;
    	}
    	
/*    	// if the pattern does not contain a * or ? or [] or (), it is not a pattern, inform the user with log.logic
    	if (this._pattern.indexOf('*') == -1 && this._pattern.indexOf('?') == -1 && this._pattern.indexOf('[') == -1 && this._pattern.indexOf('(') == -1) {
    		log.logic(`The pattern "${this._pattern}" doesn't contain any wildcard characters, so it can only ever match one filename.`);
    		return;
    	}
*/
    	// call fs.readdir to get the unfiltered list
    	var unfiltered = FS.readdirSync(this._path.name);

    	var bFile    = (this._flags & Bunch.FILE) == Bunch.FILE; 
    	var bDir     = (this._flags & Bunch.DIRECTORY) == Bunch.DIRECTORY; 
    	var bSymlink = (this._flags & Bunch.SYMLINK) == Bunch.SYMLINK; 

    	// convert the pattern to a regex
    	var pattern = new RegExp(this.getSafePattern());
    	//log.trace('regex', pattern);

    	var matches = new Array();
    	for (let i=0; i<unfiltered.length; i++) {
    		
    		// see if this file meets the user's pattern, first using regex, then filtering using the requested flag(s)
    		var aFile = unfiltered[i];
    		if (pattern.test(aFile)) {
    			
	    		var fqf = new Pfile(this._path).addPath(aFile);			// fully qualified filename
    			var pfile = (returnFullyQualifiedPath) ? fqf : new Pfile(aFile);
	    				
	    		if (bFile && fqf.isFile())
	    			matches.push(pfile);
	    		else if (bDir && fqf.isDirectory())
	    			matches.push(pfile);
	    		else if (bSymlink && fqf.isSymbolicLink())
	    			matches.push(pfile);
	    	}
    		//else
    			//log.trace(`does not match: "${aFile}"`);
    	}
    	
    	//log.trace(`filtered match count ${matches.length}`);
    	return matches;    			
    }
    
    // Identify all regex special characters in the pattern, and escape them
    getSafePattern() {
       	var len = this._pattern.length;
    	// use a shadow array of characters to convert the patterns * ? . $ to their regex equivalents
    	var shadowChars = new Array(len);
    	
    	for (let i=0; i<len; i++) {
    		var ch = this._pattern.charAt(i);
    		
    		switch (ch) {
	    		case '*':						// glob:  match zero or more characters
	    			shadowChars[i] = '.*?';		// regex: match zero or more characters, lazy
	    			break;
	    		case '?':						// glob:  match exactly one character
	    			shadowChars[i] = '.{1}';	// regex: match any character, once
	    			break;
	    		case '.':						// posix: a hidden file, or a file extension, or just a part of the regular filename
	    			shadowChars[i] = '\\.';		// regex: matches any character, so it must be escaped to \.
	    			break;
	    		case '$':						// posix: just a part of the regular filename
	    			shadowChars[i] = '\\$';		// regex: matches end of string, so it must be escaped to \$
	    			break;
	    			
	    		// The rest of these are for explicit documntation;
	    		// the shadow is the same as the original;
	    		// no escaping is needed.
	    		// This means that filenames that actually contain these characters won't be found unless the user precedes them with an escape \
	    		case '\\':						// blob:  the escape char
	    		case '(':						// blob:  beginning of a pattern capture group
	    		case '(':						// blob:  end of capture group
	    		case '[':						// blob:  beginning of character range
	    		case ']':						// blob:  end of character range
	    		case '{':						// blob:  beginning of quantifier range
	    		case '}':						// blob:  end of quantifier range
	    		case '|':						// blob:  logical OR when inside a pattern capture, like (txt|js)
	    		case '^':						// blob:  negates the character range when used like [^abc]
	        		shadowChars[i] = ch;
	        		break;
	        		
	        	default:	
	        		shadowChars[i] = ch;
    		}
    	}
    	
    	var fullString = '^' + shadowChars.join("") + '$';
    	return fullString;
    }
    
    
}


