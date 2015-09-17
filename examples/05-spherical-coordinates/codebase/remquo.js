//=============================================================================
//
// File:         /js/cc/remquo.js
//
// Language:     JavaScript
//
// Contents:     A functions to get modulo or the remainder and quotient for negative numbers
//
// Author:       Joe Honton © 2013
//
// Initial date: July 9, 2013
//
//=============================================================================

//-----------------------------------------------
// calendar clock module
var cc = cc || {};


//=============================================================================
// Remainder and Quotient
//=============================================================================

//-----------------------------------------------
//^ The mod function is suitable for use as a JavaScript % (modulo operator)
//  replacement, that works with negative numbers. This is understood using
//  a clock analogy where:
//  if d is 4 the answer will be a number from 0 to 3 (the number of fifteen minute intervals past the hour)
//  if d is 12 the answer will be a number from 0 to 11 (the number of five minute intervals past the hour)
//  if d is 60 the answer will be a number from 0 to 59 (the number of one minute intervals past the hour)
//  This works whether the clock hands move clockwise or counterclockwise.
//> n is the numerator. It must be an integer. Positive, negative, and zero are valid.
//> d is the denomintor. It must be a positive integer. Zero is not valid.
//< returns a positive number from 0 to d-1
//  Returns undefined if not able to calculate.
cc.mod = function( n, d )
{
	n = parseFloat(n);
	d = parseFloat(d);
	
	if ( isNaN(n) || isNaN(d) || d <= 0 )
		return undefined;
	
	var r = n % d;
	if ( r < 0 )
		r += d;

	return r;
};


//-----------------------------------------------
//^ The remquo function is suitable for use as a JavaScript % (modulo operator)
//  replacement that works with negative numbers.
//> n is the numerator. It must be an integer. Positive, negative, and zero are valid.
//> d is the denomintor. It must be a positive integer. Zero is not valid.
//< returns an object with two properties /q/ and /r/ such that q*d+r = n.
//  /q/ is the quotient, with a negative integer when /n/ is negative
//  /r/ is always a positive number from 0 to d-1
//  Returns undefined if not able to calculate.
cc.remquo = function( n, d )
{
	n = parseFloat(n);
	d = parseFloat(d);
	
	if ( isNaN(n) || isNaN(d) || d <= 0 )
		return undefined;
	
	var r = n % d;
	if ( r < 0 )
		r += d;
	
	var q = Math.floor(n/d);
	return { q:q, r:r };
};

