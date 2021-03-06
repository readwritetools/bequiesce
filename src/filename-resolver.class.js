//=============================================================================
//
// File:         bequiesce/src/filename-resolver.class.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT
// Initial date: Sep 19, 2015
// Contents:     Resolve filename paths that are relative to packages and their imports
//
//=============================================================================

import {expect} from 'joezone';
import Bequiesce from "./bequiesce.class";

export default class FilenameResolver {

    constructor() {
    	Object.seal(this);
    }
	
	//^ Get the package object at the given index
	static getPackage(packageNumber) {
		expect(packageNumber, 'Number');
		
		return global._bequiesceInstance.getPackage(packageNumber);
		//return Bequiesce.getInstance().getPackage(packageNumber);
	}
	
	//^ Get the filename stem of the package at the given index
	static packageStem(packageNumber) {
		return this.getPackage(packageNumber).pfile.getStem();
	}

	//^ Get the path of the package at the given index
	static packagePath(packageNumber) {
		return this.getPackage(packageNumber).pfile.getPath();
	}

	//^ Get the full filename of the package at the given index
	static packageFQN(packageNumber) {
		return this.getPackage(packageNumber).pfile.getFQN();
	}
}
