//=============================================================================
//
// File:         src/bequiesce.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
// Contents:     Be Quiet Test Harness
//
//=============================================================================

import Pfile from "./pfile.class";
import Log from "./log.class";
import TestPackage from "./test-package.class";

export default class Bequiesce {
	
    constructor() {
    	this._rootPath = null;						// absolute path to the project; dynamically determined upon initialization
    	this._testPackages = new Array();			// an array of TestPackage(testfilename, success count, fail count, Array(line number of failures))
    	this._reportLineByLine = false;
    	this._reportSummary = false;
    	this._shuntReportsTo = "stdout";			// the keyword "stdout" or a Pfile
    	this.initialize();
    	Object.seal(this);
    }
    
    //^ capture the path to the user's test suite script file
    initialize() {
    	if (process.argv.length < 1)
    		log.hopelessHalt("Expected argv to contain the path to the script.");
    	var usersScriptFile = process.argv[1];
    	log.expect(usersScriptFile, 'String');
    	this._rootPath = new Pfile(usersScriptFile).getPath();
    	log.trace(this._rootPath);    	
    }
    
    testPackage(filename) {
    	log.expect(filename, 'String');
    	var pfile = new Pfile(this._rootPath).addPath(filename)
    	if (pfile.exists()) {
    		var packageNumber = this._testPackages.length;
    		var pkg = new TestPackage(pfile, packageNumber);
    		this._testPackages.push(pkg);
    	}
    	else
    		log.invalid(`Test package ${pfile.getFQN()} not found, skipping`);
    	return this;
    }
    
	reportLineByLine(b = true) {
		log.expect(b, 'Boolean');
		this._reportLineByLine = b;
    	return this;
	}
	
	reportSummary(b = true) {
		log.expect(b, 'Boolean');
		this._reportSummary = b;
    	return this;
	}
	
	shuntReportsTo(filename) {
    	log.expect(filename, 'String');
		this._shuntReportsTo = new Pfile(filename);
    	return this;
	}

	runTests() {
		for (let pkg of this._testPackages) { 
			log.trace(`Parsing ${pkg.filename}`);
			if (pkg.parse())
				pkg.runTests();
		}
		log.exit(100, "Done");
	}
}

//The only globals
global.log = new Log();






//-----------------------------------------------
// No Regression module
var nrm = nrm || {};


//-----------------------------------------------
//^ Constructor
nrm.Quiesce = function()
{
	this.http_domain = '';				// the http protocol and domain
	this.dir = '';						// the directory containing the test files
	this.filename = '';					// the name of the current test file being worked on
	this.linenumber = 0;				// the current line number being processed
	this.callback = undefined;			// the function to call when a file has been parsed
	
	this.parsingState = 'neither';		// 'neither', 'using', 'testing'
	this.using = '';					// the test file's current "using" comment
	this.testing = '';					// the test file's current "testing" comment
	this.comment_block = false;			// true when inside /* comment block */
	
	this.using_code = '';				// the JavaScript to evaluate
	this.testing_code = '';				// the JavaScript to evaluate
	this.asserting_code = '';			// the JavaScript to evaluate
	
	this.notifications = [];			// an array of notification objects
};


//=============================================================================
//
//=============================================================================

//-----------------------------------------------
//^ The parseFile function opens the given filename and readies it for parsing by parseLine
//> http_domain is the protocol and domain, like 'http://www.example.com
//> dir is the name of the directory containing the test files, it should begin and end with a slash '/'
//> filename is the name of the test file to open
//> the function to call when the parsing is finished
nrm.Quiesce.prototype.parseFile = function( http_domain, dir, filename, callback )
{
	this.http_domain = http_domain;
	this.dir = dir;
	this.filename = filename;
	this.callback = callback;
	var url = http_domain + dir + filename;
	
	var req = new XMLHttpRequest();
	req.thisQuiesce = this;
	req.onload = nrm.Quiesce.fileReady;
	req.open( 'GET', url, true );
	req.send();
};


//-----------------------------------------------
//^ The fileReady static function is called asynchronously by XMLHttpRequest.onload.
//  Note that the 'this' pointer is not a nrm.Quiesce object, but rather
//  the XMLHttpRequest object.
//> event is a ProgressEvent of type 'load'
nrm.Quiesce.fileReady = function( event )
{
	var self = this.thisQuiesce;
	
	if ( this.status != '200' )
	{
		self.addError( 'parseFile', bif.str('Request failed %s %s', this.status, this.statusText) );
		self.callback( self );
		return;
	}
	
	if ( this.responseText == '' )
	{
		self.addNotice( 'parseFile', 'Empty file' );
		self.callback( self );
		return;
	}
	self.processFile( this.responseText );
};


//=============================================================================
// Notifications
//=============================================================================

//-----------------------------------------------
//^ The addNotice function adds a notice to the notification array
nrm.Quiesce.prototype.addNotice = function( dummy, text )
{
	this.notifications.push( new nrm.Notification( 1, this.filename, this.linenumber, dummy, dummy, text ) );
};


//-----------------------------------------------
//^ The addWarning function adds a warning to the notification array
nrm.Quiesce.prototype.addWarning = function( dummy, text )
{
	this.notifications.push( new nrm.Notification( 2, this.filename, this.linenumber, dummy, dummy, text ) );
};


//-----------------------------------------------
//^ The addError function adds an error to the notification array
nrm.Quiesce.prototype.addError = function( dummy, text )
{
	this.notifications.push( new nrm.Notification( 3, this.filename, this.linenumber, dummy, dummy, text ) );
};


//-----------------------------------------------
//^ The trace function logs the string to the notification array
nrm.Quiesce.prototype.trace = function( text )
{
	this.notifications.push( new nrm.Notification( 3, this.filename, this.linenumber, this.using, this.testing, text ) );
};


//-----------------------------------------------
//^ The logError function logs an error to the notification array
nrm.Quiesce.prototype.logError = function( text )
{
	this.notifications.push( new nrm.Notification( 3, this.filename, this.linenumber, this.using, this.testing, text ) );
};


//-----------------------------------------------
//^ The getResults function returns a string containing the full list of notifications
//> separator is the separator for each notification, use "<br />" for html, or "\n" for plain text
//> level is 1, 2, or 3
nrm.Quiesce.prototype.getResults = function( separator, level )
{
	if ( level == undefined )
		level = 1;
	
	var s = [];
	for ( var i = 0; i < this.notifications.length; i++ )
	{
		var n = this.notifications[i];
		if ( n.level >= level )
		{
			if ( n.using != n.testing )
				s.push( bif.str( "[%s:%s] %s %s %s", n.filename, n.linenumber, n.using, n.testing, n.text ) );
			else
				s.push( bif.str( "[%s:%s] %s %s", n.filename, n.linenumber, n.using, n.text ) );
		}
	}
	return s.join( separator );
};


//-----------------------------------------------
//^ The processFile function
//> The fullFileText argument contains the entire test file
nrm.Quiesce.prototype.processFile = function( fullFileText )
{
	this.parsingState = 'neither';
	this.linenumber = 0;
	this.using = '';
	this.using_code = '';
	this.testing = '';
	this.testing_code = '';
	this.asserting_code = '';

	var lines = fullFileText.split( "\n" );
	
	for ( var i = 0; i < lines.length; i++ )
	{
		this.linenumber++;
		var s = lines[i];
		if ( s[s.length-1] == "\r" )			// Windows style
			s = s.substr(0, s.length-1 );
		
		if ( s.substr( 0, 2 ) == '/*' )
			this.comment_block = true;

		else if ( s.substr( 0, 2 ) == '*/' )
			this.comment_block = false;
		
		else if ( this.comment_block == false ) 
		{
			if ( s.substr( 0, 2 ) == '//' )
			{
				var pos = s.search( /using/ );
				if ( pos != -1 )
				{
					this.parsingState = 'using';
					this.using = s.substr( pos+5 ).trim();
					this.using_code = '';
					this.addNotice( '', s.substr(2) );
					continue;
				}
				
				pos = s.search( /testing/ );
				if ( pos != -1 )
				{
					this.parsingState = 'testing';
					this.testing = s.substr( pos+7 ).trim();
					this.testing_code = '';
					this.asserting_code = '';
					this.addNotice( '', s.substr(2) );
					continue;
				}
				
				// log all other spurious comments
				this.addNotice( '', s.substr(2) );
			}
			
			else if ( this.parsingState == 'using' )
			{
				if ( this.using_code != '' )
					this.using_code += "\n";
				this.using_code += s;
			}
	
			else if ( this.parsingState == 'testing' )
			{
				var comment = new RegExp( '//' );
				var pos = s.search( comment );
				if ( pos != -1 )
					s = s.substr( 0, pos );
				s = s.trim();
				if ( s.length == 0 )
					continue;
				
				var doublesemicolon = new RegExp( ';;' );
				var pos = s.search( doublesemicolon );
				if ( pos == -1 )
				{
					this.logError( 'test case requires a double semicolon to separate the test and the assertion' );
					continue;
				}
				
				this.testing_code = s.substr(0, pos).trim();
				this.asserting_code = s.substr(pos+2).trim();
				this.execute();
			}
		}
	}
	
	// inform the caller that the file has been parsed
	if ( this.callback != undefined )
		this.callback( this );
};


//-----------------------------------------------
//^ The execute function
nrm.Quiesce.prototype.execute = function()
{
	var code = bif.str( "%s\n%s\nvar __b = (%s);", this.testing_code, this.using_code, this.asserting_code );
	eval( code );
	if ( __b == false )
		this.logError( 'failed' );
};
