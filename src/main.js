//=============================================================================
//
// File:         src/main.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 22, 2015
// Contents:     Main entry point for Bequiesce
//
//=============================================================================

import CLI from "./cli.class";

// Read the command line and execute
var cli = new CLI();
if (cli.validateOptions())
	cli.execute();
