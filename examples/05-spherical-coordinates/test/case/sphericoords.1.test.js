//-------------------------------------
// @common ABCD
import A from './examples/05-spherical-coordinates/codebase/sphericoords';
import B from './examples/05-spherical-coordinates/codebase/remquo';
import C from './examples/05-spherical-coordinates/codebase/number';

//-------------------------------------
// @using cc.SpheriCoords
var sc = new cc.SpheriCoords( radians );
var rad = sc.asRadians();
var dd  = sc.asDecimalDegrees();
var cu  = sc.asCelestialUnits();
var dms = sc.asDegreesMinutesSeconds();
var dh  = sc.asDecimalHours();
var hms = sc.asHoursMinutesSeconds();

// @testing
var radians = undefined;				;; rad == 0.0 		&& dd.fe(0.0)			&& cu.degrees.fe(0) 	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 0   && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(0.0)		&& hms.hours == 0  && hms.minutes == 0  && hms.seconds == 0
var radians = 1.0;						;; rad == 1.0 		&& dd.fe(57.2957795)	&& cu.degrees.fe(57)	&& cu.arcminutes.fe(17.74677)	&& dms.degrees == 57  && dms.arcminutes == 17 && dms.arcseconds == 45	&& dh.fe(3.819719)	&& hms.hours == 3  && hms.minutes == 49 && hms.seconds == 11
var radians = 2.0;						;; rad == 2.0 		&& dd.fe(114.591559)	&& cu.degrees.fe(114)	&& cu.arcminutes.fe(35.49354)	&& dms.degrees == 114 && dms.arcminutes == 35 && dms.arcseconds == 30	&& dh.fe(7.639437)	&& hms.hours == 7  && hms.minutes == 38 && hms.seconds == 22
var radians = 3.0;						;; rad == 3.0 		&& dd.fe(171.8873385)	&& cu.degrees.fe(171)	&& cu.arcminutes.fe(53.24031)	&& dms.degrees == 171 && dms.arcminutes == 53 && dms.arcseconds == 14	&& dh.fe(11.459156)	&& hms.hours == 11 && hms.minutes == 27 && hms.seconds == 33
var radians = Math.PI;					;; rad == Math.PI 	&& dd.fe(180.0)			&& cu.degrees.fe(180)	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 180 && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(12.0)		&& hms.hours == 12 && hms.minutes == 0  && hms.seconds == 0
var radians = 4.0;						;; rad == 4.0 		&& dd.fe(229.183118)	&& cu.degrees.fe(229)	&& cu.arcminutes.fe(10.98708)	&& dms.degrees == 229 && dms.arcminutes == 10 && dms.arcseconds == 59	&& dh.fe(15.278875)	&& hms.hours == 15 && hms.minutes == 16 && hms.seconds == 44
var radians = 5.0;						;; rad == 5.0 		&& dd.fe(286.4788976)	&& cu.degrees.fe(286)	&& cu.arcminutes.fe(28.73385)	&& dms.degrees == 286 && dms.arcminutes == 28 && dms.arcseconds == 44	&& dh.fe(19.098593)	&& hms.hours == 19 && hms.minutes == 5  && hms.seconds == 55
var radians = 6.0;						;; rad == 6.0 		&& dd.fe(343.774677)	&& cu.degrees.fe(343)	&& cu.arcminutes.fe(46.48062)	&& dms.degrees == 343 && dms.arcminutes == 46 && dms.arcseconds == 29	&& dh.fe(22.918312)	&& hms.hours == 22 && hms.minutes == 55 && hms.seconds == 6
var radians = 2*Math.PI;				;; rad == 2*Math.PI	&& dd.fe(360.0)			&& cu.degrees.fe(360)	&& cu.arcminutes.fe(0.0)		&& dms.degrees == 360 && dms.arcminutes == 0  && dms.arcseconds == 0	&& dh.fe(24.0)		&& hms.hours == 24 && hms.minutes == 0  && hms.seconds == 0

//-------------------------------------
// @using decimal degrees
var sc = new cc.SpheriCoords();
sc.fromDecimalDegrees(dd1);
var dd2 = sc.asDecimalDegrees();

// @testing
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
// @using celestial units
var sc = new cc.SpheriCoords();
sc.fromCelestialUnits(degrees, arcminutes);
var cu = sc.asCelestialUnits();

// @testing
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

