/* Copyright (c) 2019 Read Write Tools */
var expect = require('joezone').expect, FS = require('fs');

module.exports = class CommonSection {
    constructor(e, t, i) {
        expect(e, 'String'), expect(t, 'Number'), expect(i, 'Number'), this.description = e.trim(), 
        0 == this.description.length && (this.description = '[unnamed common section]'), 
        this.commonJS = '', this.packageNumber = t, this.lineNumber = i, Object.seal(this);
    }
    isValid() {
        return '[auto]' != this.description;
    }
    addJavascript(e) {
        expect(e, 'String'), 0 == this.commonJS.length ? this.commonJS = e : this.commonJS += '\n' + e;
    }
    importExpansion() {}
};