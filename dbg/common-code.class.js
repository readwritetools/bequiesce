//=============================================================================
//
// File:         bequiesce/src/common-code.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 18, 2015
// Contents:     A single line of JavaScript that occurs within the context
//               of a @common section.
//
//=============================================================================

var expect = require('joezone').expect;

module.exports = class CommonCode {
	
    constructor(javascript) {
    	expect(javascript, 'String');
    	
    	this.javascript = javascript;
    	Object.seal(this);
    }
}
