//=============================================================================
//
// File:         bequiesce/src/main.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 22, 2015
// Contents:     Main entry point for Bequiesce
//
//=============================================================================

var CLI = require('./cli.class.js');

// Read the command line and execute
var cli = new CLI();
if (cli.validateOptions())
	cli.execute();
