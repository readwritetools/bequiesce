//=============================================================================
//
// File:         /js/cc-unit-tests/sphericoords.js
//
// Language:     JavaScript 
//
// Contents:     Quiesce tests for cc.SpheriCoords
//
// Author:       Joe Honton © 2015
//
// Initial date: Feb 15, 2015
//
// Coverage:
//
//  cc.SpheriCoords();
//  cc.SpheriCoords.prototype.normalizeToAries()
//  cc.SpheriCoords.prototype.normalizeToGreenwich()
//  cc.SpheriCoords.prototype.normalizeToEquator()
//	cc.SpheriCoords.prototype.fromRadians( radians )
//	cc.SpheriCoords.prototype.fromDecimalDegrees( decimalDegrees )
//	cc.SpheriCoords.prototype.fromCelestialUnits( degrees, arcminutes )
//	cc.SpheriCoords.prototype.fromDegreesMinutesSeconds( degrees, arcminutes, arcseconds )
//	cc.SpheriCoords.prototype.fromDecimalHours( hours )
//	cc.SpheriCoords.prototype.fromHoursMinutesSeconds( hours, minutes, seconds )
//	cc.SpheriCoords.prototype.asRadians()
//	cc.SpheriCoords.prototype.asDecimalDegrees()
//	cc.SpheriCoords.prototype.asCelestialUnits()
//	cc.SpheriCoords.prototype.asDegreesMinutesSeconds()
//	cc.SpheriCoords.prototype.asDecimalHours()
//	cc.SpheriCoords.prototype.asHoursMinutesSeconds()


//-------------------------------------
// using cc.SpheriCoords
var sc = new cc.SpheriCoords( radians );
var rad = sc.asRadians();
var dd  = sc.asDecimalDegrees();
var cu  = sc.asCelestialUnits();
var dms = sc.asDegreesMinutesSeconds();
var dh  = sc.asDecimalHours();
var hms = sc.asHoursMinutesSeconds();

// testing
//var radians = undefined;				;; rad == 0.0 		&& dd.fe(0.0)			&& cu.degrees.fe(0) 	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 0   && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(0.0)		&& hms.hours == 0  && hms.minutes == 0  && hms.seconds == 0
var radians = 1.0;						;; rad == 1.0 		&& dd.fe(57.2957795)	&& cu.degrees.fe(57)	&& cu.arcminutes.fe(17.74677)	&& dms.degrees == 57  && dms.arcminutes == 17 && dms.arcseconds == 45	&& dh.fe(3.819719)	&& hms.hours == 3  && hms.minutes == 49 && hms.seconds == 11
var radians = 2.0;						;; rad == 2.0 		&& dd.fe(114.591559)	&& cu.degrees.fe(114)	&& cu.arcminutes.fe(35.49354)	&& dms.degrees == 114 && dms.arcminutes == 35 && dms.arcseconds == 30	&& dh.fe(7.639437)	&& hms.hours == 7  && hms.minutes == 38 && hms.seconds == 22
var radians = 3.0;						;; rad == 3.0 		&& dd.fe(171.8873385)	&& cu.degrees.fe(171)	&& cu.arcminutes.fe(53.24031)	&& dms.degrees == 171 && dms.arcminutes == 53 && dms.arcseconds == 14	&& dh.fe(11.459156)	&& hms.hours == 11 && hms.minutes == 27 && hms.seconds == 33
var radians = Math.PI;					;; rad == Math.PI 	&& dd.fe(180.0)			&& cu.degrees.fe(180)	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 180 && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(12.0)		&& hms.hours == 12 && hms.minutes == 0  && hms.seconds == 0
var radians = 4.0;						;; rad == 4.0 		&& dd.fe(229.183118)	&& cu.degrees.fe(229)	&& cu.arcminutes.fe(10.98708)	&& dms.degrees == 229 && dms.arcminutes == 10 && dms.arcseconds == 59	&& dh.fe(15.278875)	&& hms.hours == 15 && hms.minutes == 16 && hms.seconds == 44
var radians = 5.0;						;; rad == 5.0 		&& dd.fe(286.4788976)	&& cu.degrees.fe(286)	&& cu.arcminutes.fe(28.73385)	&& dms.degrees == 286 && dms.arcminutes == 28 && dms.arcseconds == 44	&& dh.fe(19.098593)	&& hms.hours == 19 && hms.minutes == 5  && hms.seconds == 55
var radians = 6.0;						;; rad == 6.0 		&& dd.fe(343.774677)	&& cu.degrees.fe(343)	&& cu.arcminutes.fe(46.48062)	&& dms.degrees == 343 && dms.arcminutes == 46 && dms.arcseconds == 29	&& dh.fe(22.918312)	&& hms.hours == 22 && hms.minutes == 55 && hms.seconds == 6
var radians = 2*Math.PI;				;; rad == 2*Math.PI	&& dd.fe(360.0)			&& cu.degrees.fe(360)	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 360 && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(24.0)		&& hms.hours == 24 && hms.minutes == 0  && hms.seconds == 0

//-------------------------------------
// using decimal degrees
var sc = new cc.SpheriCoords();
sc.fromDecimalDegrees(dd1);
var dd2 = sc.asDecimalDegrees();

// testing
var dd1 = 0.0;							;; dd2 == dd1
var dd1 = 0.01;							;; dd2 == dd1
var dd1 = 0.001;						;; dd2 == dd1
var dd1 = 0.0001;						;; dd2 == dd1
var dd1 = 0.00001;						;; dd2 == dd1
var dd1 = 45.0;							;; dd2 == dd1
var dd1 = 90.0;							;; dd2 == dd1
var dd1 = 135.0;						;; dd2 == dd1
var dd1 = 180.0;						;; dd2 == dd1
var dd1 = 225.0;						;; dd2 == dd1
var dd1 = 270.0;						;; dd2 == dd1
var dd1 = 315.0;						;; dd2 == dd1
var dd1 = 360.0;						;; dd2 == dd1
var dd1 = 540.0;						;; dd2 == dd1
var dd1 = 720.0;						;; dd2 == dd1
var dd1 = -180.0;						;; dd2 == dd1
var dd1 = -360.0;						;; dd2 == dd1
var dd1 = -540.0;						;; dd2 == dd1
var dd1 = -720.0;						;; dd2 == dd1

//-------------------------------------
// using celestial units
var sc = new cc.SpheriCoords();
sc.fromCelestialUnits(degrees, arcminutes);
var cu = sc.asCelestialUnits();

// testing
var degrees = 0, arcminutes = 0.0;			;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 1.0;			;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.1;			;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.001;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.0001;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.99;			;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.999;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.9999;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 0.99999;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 0, arcminutes = 60.0;			;; cu.degrees == 1  && cu.arcminutes.fe(0.0)			// overflow
var degrees = 0, arcminutes = -1.0;			;; cu.degrees == -1 && cu.arcminutes.fe(59.0)			// underflow
var degrees = 45, arcminutes = 10.0;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 90, arcminutes = 20.0;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 180, arcminutes = 30.0;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 360, arcminutes = 40.00001;	;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 720, arcminutes = 50.12345;	;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = 1080, arcminutes = 59.99999;	;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = -45, arcminutes = 0.0;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)
var degrees = -90, arcminutes = 0.0;		;; degrees == cu.degrees && cu.arcminutes.fe(arcminutes)


//-------------------------------------
// using degrees minutes seconds
var sc = new cc.SpheriCoords();
sc.fromDegreesMinutesSeconds(degrees, arcminutes, arcseconds);
var dms = sc.asDegreesMinutesSeconds();

// testing
var degrees = 0,   arcminutes = 0,  arcseconds = 0;		;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = 1,   arcminutes = 1,  arcseconds = 1;		;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = 10,  arcminutes = 10, arcseconds = 10;	;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = 30,  arcminutes = 30, arcseconds = 30;	;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = 59,  arcminutes = 59, arcseconds = 59;	;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = 52,  arcminutes = 0,  arcseconds = 60;	;; dms.degrees == 52 && dms.arcminutes == 1 && dms.arcseconds == 0		// overflow seconds
var degrees = 52,  arcminutes = 60, arcseconds = 0;		;; dms.degrees == 53 && dms.arcminutes == 0 && dms.arcseconds == 0		// overflow minutes
var degrees = 52,  arcminutes = 60, arcseconds = 60; 	;; dms.degrees == 53 && dms.arcminutes == 1 && dms.arcseconds == 0		// overflow minutes and seconds
var degrees = 52,  arcminutes = 0,  arcseconds = -1;	;; dms.degrees == 51 && dms.arcminutes == 59 && dms.arcseconds == 59	// underflow seconds
var degrees = 52,  arcminutes = -1, arcseconds = 0;		;; dms.degrees == 51 && dms.arcminutes == 59 && dms.arcseconds == 0		// underflow minutes
var degrees = 52,  arcminutes = -1, arcseconds = -1;	;; dms.degrees == 51 && dms.arcminutes == 58 && dms.arcseconds == 59	// underflow minutes and seconds
var degrees = -90, arcminutes = 0,  arcseconds = 0;		;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds
var degrees = -180,arcminutes = 0,  arcseconds = 0;		;; dms.degrees == degrees && dms.arcminutes == arcminutes && dms.arcseconds == arcseconds


//-------------------------------------
// using decimal hours
var sc = new cc.SpheriCoords();
sc.fromDecimalHours(hours);
var dh = sc.asDecimalHours();

// testing
var hours = 0.0					;; dh.fe(hours)
var hours = 6.0					;; dh.fe(hours)
var hours = 12.0				;; dh.fe(hours)
var hours = 18.0				;; dh.fe(hours)
var hours = 24.0				;; dh.fe(hours)
var hours = 36.0				;; dh.fe(hours)
var hours = 48.0				;; dh.fe(hours)
var hours = 0.1					;; dh.fe(hours)
var hours = 0.01				;; dh.fe(hours)
var hours = 0.001				;; dh.fe(hours)
var hours = 0.0001				;; dh.fe(hours)
var hours = 0.00001				;; dh.fe(hours)
var hours = 0.99999				;; dh.fe(hours)
var hours = -0.9				;; dh.fe(hours)
var hours = -1.0				;; dh.fe(hours)
var hours = -1.01				;; dh.fe(hours)
var hours = -1.9				;; dh.fe(hours)
var hours = -24.0				;; dh.fe(hours)


//-------------------------------------
// using hours minutes seconds
var sc = new cc.SpheriCoords();
sc.fromHoursMinutesSeconds(hours, minutes, seconds);
var hms = sc.asHoursMinutesSeconds();

// testing
var hours = 0,   minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 1,   minutes = 1,  seconds = 1;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 5,   minutes = 10, seconds = 10;	;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 10,  minutes = 30, seconds = 30;	;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 20,  minutes = 50, seconds = 50;	;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 22,  minutes = 59, seconds = 59;	;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 22,  minutes = 0,  seconds = 60;	;; hms.hours == 22 && hms.minutes == 1 && hms.seconds == 0		// overflow seconds
var hours = 22,  minutes = 60, seconds = 0;		;; hms.hours == 23 && hms.minutes == 0 && hms.seconds == 0		// overflow minutes
var hours = 22,  minutes = 60, seconds = 60;	;; hms.hours == 23 && hms.minutes == 1 && hms.seconds == 0		// overflow minutes and seconds
var hours = 22,  minutes = 0,  seconds = -1;	;; hms.hours == 21 && hms.minutes == 59 && hms.seconds == 59	// underflow seconds
var hours = 22,  minutes = -1, seconds = 0;		;; hms.hours == 21 && hms.minutes == 59 && hms.seconds == 0		// underflow minutes
var hours = 22,  minutes = -1, seconds = -1;	;; hms.hours == 21 && hms.minutes == 58 && hms.seconds == 59	// underflow minutes and seconds
var hours = 24,  minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 36,  minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = 48,  minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = -1,  minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = -10, minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds
var hours = -24, minutes = 0,  seconds = 0;		;; hms.hours == hours && hms.minutes == minutes && hms.seconds == seconds


//-------------------------------------
// using normalize to Aries (0.0 ... 359.99)
var sc = new cc.SpheriCoords();
var a = sc.fromDecimalDegrees(degrees).normalizeToAries().asDecimalDegrees();

// testing
var degrees = 0.0;					;; a.fe(0.0)
var degrees = 359.9;				;; a.fe(359.9)
var degrees = 360.0;				;; a.fe(0.0)
var degrees = 360.1;				;; a.fe(0.1)
var degrees = 719.9;				;; a.fe(359.9)
var degrees = 720.0;				;; a.fe(0.0)
var degrees = 720.1;				;; a.fe(0.1)
var degrees = -0.1;					;; a.fe(359.9)
var degrees = -90.0;				;; a.fe(270.0)
var degrees = -180.0;				;; a.fe(180.0)
var degrees = -270.0;				;; a.fe(90.0)
var degrees = -359.9;				;; a.fe(0.1)
var degrees = -360.0;				;; a.fe(0.0)
var degrees = -360.1;				;; a.fe(359.9)


//-------------------------------------
// using normalize to Greenwich (-179.99 ... 180.0)
var sc = new cc.SpheriCoords();
var g = sc.fromDecimalDegrees(degrees).normalizeToGreenwich().asDecimalDegrees();

// testing
var degrees = 0.0;					;; g.fe(0.0)
var degrees = 179.8;				;; g.fe(179.8)
var degrees = 179.9;				;; g.fe(179.9)
var degrees = 180.0;				;; g.fe(180.0)
var degrees = 180.1;				;; g.fe(-179.9)
var degrees = 180.2;				;; g.fe(-179.8)
var degrees = 359.8;				;; g.fe(-0.2)
var degrees = 359.9;				;; g.fe(-0.1)
var degrees = 360.0;				;; g.fe(0.0)
var degrees = 360.1;				;; g.fe(0.1)
var degrees = 360.2;				;; g.fe(0.2)
var degrees = 540.0;				;; g.fe(180.0)
var degrees = 720.0;				;; g.fe(0.0)
var degrees = -179.8;				;; g.fe(-179.8)
var degrees = -179.9;				;; g.fe(-179.9)
var degrees = -180.0;				;; g.fe(180.0)
var degrees = -180.1;				;; g.fe(179.9)
var degrees = -180.2;				;; g.fe(179.8)
var degrees = -359.8;				;; g.fe(0.2)
var degrees = -359.9;				;; g.fe(0.1)
var degrees = -360.0;				;; g.fe(0.0)
var degrees = -360.1;				;; g.fe(-0.1)
var degrees = -360.2;				;; g.fe(-0.2)
var degrees = -540.0;				;; g.fe(180.0)
var degrees = -720.0;				;; g.fe(0.0)


//-------------------------------------
// using normalize to Equator (-90.00 ... 90.00)
var sc = new cc.SpheriCoords();
var e = sc.fromDecimalDegrees(degrees).normalizeToEquator().asDecimalDegrees();

// testing
var degrees = 0.0;					;; e.fe(0.0)		// Equator
var degrees = 89.9;					;; e.fe(89.9)		// North pole
var degrees = 90.0;					;; e.fe(90.0)		// North pole
var degrees = 90.1;					;; e.fe(89.9)		// North pole
var degrees = 179.9;				;; e.fe(0.1)		// Equator
var degrees = 180.0;				;; e.fe(0.0)		// Equator
var degrees = 180.1;				;; e.fe(-0.1)		// Equator
var degrees = 269.9;				;; e.fe(-89.9)		// South pole
var degrees = 270.0;				;; e.fe(-90.0)		// South pole
var degrees = 270.1;				;; e.fe(-89.9)		// South pole
var degrees = 359.9;				;; e.fe(-0.1)		// Equator
var degrees = 360.0;				;; e.fe(0.0)		// Equator
var degrees = 360.1;				;; e.fe(0.1)		// Equator
var degrees = 450.0;				;; e.fe(90.0)		// North pole
var degrees = -89.9;				;; e.fe(-89.9)		// South pole
var degrees = -90.0;				;; e.fe(-90.0)		// South pole
var degrees = -90.1;				;; e.fe(-89.9)		// South pole
var degrees = -179.9;				;; e.fe(-0.1)		// Equator
var degrees = -180.0;				;; e.fe(0.0)		// Equator
var degrees = -180.1;				;; e.fe(0.1)		// Equator
var degrees = -269.9;				;; e.fe(89.9)		// North pole
var degrees = -270.0;				;; e.fe(90.0)		// North pole
var degrees = -270.1;				;; e.fe(89.9)		// North pole
var degrees = -359.9;				;; e.fe(0.1)		// Equator
var degrees = -360.0;				;; e.fe(0.0)		// Equator
var degrees = -360.1;				;; e.fe(-0.1)		// Equator
var degrees = -450.0;				;; e.fe(-90.0)		// South pole
