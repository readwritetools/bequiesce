//=============================================================================
//
// File:         bequiesce/src/main.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT
// Initial date: Sep 22, 2015
// Contents:     Main entry point for Bequiesce
//
//=============================================================================

var CLI = require('./cli.class.js');

// Read the command line and execute
var cli = new CLI();
if (cli.validateOptions())
	cli.execute();
