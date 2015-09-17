//=============================================================================
//
// File:         /js/cc/number.js
//
// Language:     JavaScript
//
// Contents:     An addition to the primitive Number type to allow eplison comparisons
//
// Author:       Joe Honton © 2015
//
// Initial date: Feb 15, 2015
//
//=============================================================================


//-----------------------------------------------
// Floating point comparison
//< returns true if approximately equal, false if not
Number.prototype.fe = function(x)
{
	var s = x.toString();
	var point = s.search(/\./);
	
	// if not a floating point number
	if (point == -1)
	{
		return (Math.abs(this - x) < 0.5);		// if x = 123 then [122.5 through 123.5] are true
	}
	else
	{
		var significantDigits = s.length - point;
		var epsilon = Number("5E-" + significantDigits);
		return (Math.abs(this - x) < epsilon);		// if x = 0.12567 then [0.125665 through 0.125675)] are true
	}
};

