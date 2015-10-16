//=============================================================================
// File:         bequiesce/examples/05-sphericoords/test/cases/sphericoords2.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 12, 2015
//=============================================================================

//-------------------------------------
// @common
import A from '../../codebase/sphericoords';
import B from '../../codebase/remquo';
import C from '../../codebase/number';

//-------------------------------------
// @using degrees minutes seconds
var sc = new cc.SpheriCoords();
sc.fromDegreesMinutesSeconds(degrees, arcminutes, arcseconds);
var dms = sc.asDegreesMinutesSeconds();

// @testing
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
// @using decimal hours
var sc = new cc.SpheriCoords();
sc.fromDecimalHours(hours);
var dh = sc.asDecimalHours();

// @testing
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
// @using hours minutes seconds
var sc = new cc.SpheriCoords();
sc.fromHoursMinutesSeconds(hours, minutes, seconds);
var hms = sc.asHoursMinutesSeconds();

// @testing fromHoursMinutesSeconds() and asHoursMinutesSeconds() equivalency
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
// @using normalize to Aries (0.0 ... 359.99)
var sc = new cc.SpheriCoords();
var a = sc.fromDecimalDegrees(degrees).normalizeToAries().asDecimalDegrees();

// @testing
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
// @using normalize to Greenwich (-179.99 ... 180.0)
var sc = new cc.SpheriCoords();
var g = sc.fromDecimalDegrees(degrees).normalizeToGreenwich().asDecimalDegrees();

// @testing normalizeToGreenwich()
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
// @using normalize to Equator (-90.00 ... 90.00)
var sc = new cc.SpheriCoords();
var e = sc.fromDecimalDegrees(degrees).normalizeToEquator().asDecimalDegrees();

// @testing Equator and poles
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
