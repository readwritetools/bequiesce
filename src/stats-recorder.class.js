//=============================================================================
//
// File:         src/stats-recorder.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 15, 2015
// Contents:     Success/failure statistics
//
//=============================================================================

export default class StatsRecorder {
	
    constructor() {
    	this.success = 0;
    	this.failure = 0;
    	this.failedObjects = new Array();		// an array of indexes to failures 
    	Object.seal(this);
    }
}