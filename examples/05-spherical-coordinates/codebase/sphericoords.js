//=============================================================================
//
// File:         /js/cc/sphericoords.js
//
// Language:     JavaScript
//
// Contents:     Class for converting between spherical coordinate units
//
//                 abbr  units                                 from        to
//                 ---   ------------------------------      ---------   ---------
//                 rad - radians                           -π           π
//                 dd  - decimal degrees                   -180.0       180.0
//                 dm  - degrees, celestial minutes        -180°00.00'  180°00.00'
//                 dms - degrees, arcminutes, arcseconds   -180°0'0"    180°0'0"
//                 dh  - decimal hours                     0.0          24.0	
//                 hms - hours, minutes, seconds           00:00:00     24:00:00
//
// Author:       Joe Honton © 2015
//
// Initial date: February 14, 2015
//
//=============================================================================

//-----------------------------------------------
// calendar clock module
var cc = cc || {};


//=============================================================================
// Spherical Coordinates
//=============================================================================

//-----------------------------------------------
//^ The constructor function
cc.SpheriCoords = function( radians )
{
	this.radians = (radians === undefined) ? 0.0 : radians;
};

//-----------------------------------------------
// static constants
cc.SpheriCoords.degreesPerRadian = (180.0 / Math.PI);
cc.SpheriCoords.degreesPerHour = (360.0 / 24.0);


//=============================================================================
// Normalized
//=============================================================================

//-----------------------------------------------
// Degrees longitude east of the "first point of Aries"
cc.SpheriCoords.prototype.normalizeToAries = function()
{
	var twoPI = Math.PI * 2.0;
	while (this.radians >= twoPI)
		this.radians -= twoPI;
	while (this.radians < 0.0)
		this.radians += twoPI;
	return this;
};

//-----------------------------------------------
// Degrees longitude east (+) or west (-) of Greenwich
cc.SpheriCoords.prototype.normalizeToGreenwich = function()
{
	var twoPI = Math.PI * 2.0;
	while (this.radians > Math.PI)
		this.radians -= twoPI;
	while (this.radians <= (-1.0)*Math.PI)
		this.radians += twoPI;
	return this;
};

//-----------------------------------------------
// Degrees north (+) or south (-) of Equator
cc.SpheriCoords.prototype.normalizeToEquator = function()
{
	var quarterCircle = Math.PI / 2.0;
	var halfCircle = Math.PI;
	var threeQuarterCircle = halfCircle + quarterCircle;
	var fullCircle = Math.PI * 2.0;

	// first normalize to 360 ... -360
	while (this.radians > fullCircle)
		this.radians -= fullCircle;
	while (this.radians <= (-1.0)*fullCircle)
		this.radians += fullCircle;

	// if between north pole and south pole
	if (this.radians < quarterCircle && this.radians > (-1)*quarterCircle)
		return this;
	
	// if going over the north pole towards the south pole
	else if (this.radians > quarterCircle && this.radians <= threeQuarterCircle)
		this.radians = halfCircle - this.radians;
	// else if beyond the south pole heading back to the equator
	else if (this.radians > threeQuarterCircle && this.radians <= fullCircle)
		this.radians = this.radians - fullCircle;
	
	// if going beyond the south pole back towards the north pole
	else if ((-1.0)*quarterCircle > this.radians && (-1.0)*threeQuarterCircle <= this.radians)
		this.radians = (-1.0)*halfCircle - this.radians;
	// else if beyond the north pole heading back to the equator
	else if ((-1.0)*threeQuarterCircle > this.radians && (-1.0)*fullCircle <= this.radians)
		this.radians = this.radians - (-1.0)*fullCircle;
	
	return this;
};

//=============================================================================
// Converted from other units
//=============================================================================

//-----------------------------------------------
cc.SpheriCoords.prototype.fromRadians = function( radians )
{
	this.radians = radians;
	return this;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.fromDecimalDegrees = function( decimalDegrees )
{
	this.radians = decimalDegrees / cc.SpheriCoords.degreesPerRadian;
	return this;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.fromCelestialUnits = function( degrees, arcminutes )
{
	var decimalDegrees = degrees + (arcminutes / 60.0);
	this.radians = decimalDegrees / cc.SpheriCoords.degreesPerRadian;
	return this;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.fromDegreesMinutesSeconds = function( degrees, arcminutes, arcseconds )
{
	var decimalDegrees = degrees + (arcminutes / 60.0) + (arcseconds / 3600.0);
	this.radians = decimalDegrees / cc.SpheriCoords.degreesPerRadian;
	return this;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.fromDecimalHours = function( hours )
{
	var decimalDegrees = hours * cc.SpheriCoords.degreesPerHour;
	this.radians = decimalDegrees / cc.SpheriCoords.degreesPerRadian;
	return this;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.fromHoursMinutesSeconds = function( hours, minutes, seconds )
{
	var decimalDegrees = (hours + (minutes / 60.0) + (seconds / 3600.0)) * cc.SpheriCoords.degreesPerHour;
	this.radians = decimalDegrees / cc.SpheriCoords.degreesPerRadian;
	return this;
};

//=============================================================================
// Expressed in other units
//=============================================================================

//-----------------------------------------------
cc.SpheriCoords.prototype.asRadians = function()
{
	return this.radians;
};

//-----------------------------------------------
cc.SpheriCoords.prototype.asDecimalDegrees = function()
{
	return (this.radians * cc.SpheriCoords.degreesPerRadian); // no loss of precision
};

//-----------------------------------------------
cc.SpheriCoords.prototype.asCelestialUnits = function()
{
	var totalArcMinutes = (this.asDecimalDegrees() * 60);
	var remquo = cc.remquo(totalArcMinutes, 60);
	return { degrees:remquo.q, arcminutes:remquo.r };	// no loss of precision 
};

//-----------------------------------------------
cc.SpheriCoords.prototype.asDegreesMinutesSeconds = function()
{
	var totalArcSeconds = Math.round(this.asDecimalDegrees() * 3600.0);	// rounded to the nearest angular arcsecond
	var remquo = cc.remquo(totalArcSeconds, 60);
	var arcseconds = remquo.r;
	remquo = cc.remquo(remquo.q, 60);
	var arcminutes = remquo.r;
	var degrees = remquo.q;
	return { degrees:degrees, arcminutes:arcminutes, arcseconds:arcseconds };
};

//-----------------------------------------------
cc.SpheriCoords.prototype.asDecimalHours = function()
{
	return (this.asDecimalDegrees() / cc.SpheriCoords.degreesPerHour);	// no loss of precision
};

//-----------------------------------------------
cc.SpheriCoords.prototype.asHoursMinutesSeconds = function()
{
	var totalSeconds = Math.round(this.asDecimalHours() * 3600.0);	// rounded to the nearest second of time
	var remquo = cc.remquo(totalSeconds, 60);
	var seconds = remquo.r;
	remquo = cc.remquo(remquo.q, 60);
	var minutes = remquo.r;
	var hours = remquo.q;
	return { hours:hours, minutes:minutes, seconds:seconds };
};
