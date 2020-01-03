//=============================================================================
//
// File:         bequiesce/src/stats-recorder.class.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT
// Initial date: Sep 15, 2015
// Contents:     Success/failure statistics
//
//=============================================================================

module.exports = class StatsRecorder {
	
    constructor() {
    	this.success = 0;
    	this.failure = 0;
    	this.failedObjects = new Array();		// an array of indexes to failures 
    	Object.seal(this);
    }
    
    get passCount() {
    	return this.success;
    }
    
    get failCount() {
    	return this.failure;
    }

    incrementSuccess(num) {
    	if (num == undefined) num = 1;
    	this.success += num;
    }
    
    incrementFailure(num) {
    	if (num == undefined) num = 1;
    	this.failure += num;
    }
    
}
