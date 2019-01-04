/* Copyright (c) 2019 Read Write Tools */
var expect = require('joezone').expect, FilenameResolver = require('./filename-resolver.class.js');

module.exports = class Jot {
    constructor() {
        Object.seal(this);
    }
    trace(e, t) {
        if (void 0 == t && (t = ''), e.hasOwnProperty('packageNumber') && e.hasOwnProperty('lineNumber')) {
            var r = FilenameResolver.packageStem(e.packageNumber), s = e.lineNumber.toString(), o = Jot.leftJustify(`[${r}:`, 26), i = Jot.rightJustify(`${s}]`, 5);
            this.stdout(`${o}${i} ${t}`);
        } else this.stdout(e.toString());
    }
    stdout(e) {
        process.stdout.write(`${e}\n`);
    }
    static leftJustify(e, t, r) {
        return void 0 == r && (r = !0), expect(e, 'String'), expect(t, 'Number'), expect(r, 'Boolean'), 
        1 == r && (e = e.substr(0, t)), e.length >= t ? e : e + '                                                       '.substr(0, t - e.length);
    }
    static rightJustify(e, t, r) {
        return void 0 == r && (r = !0), expect(e, 'String'), expect(t, 'Number'), expect(r, 'Boolean'), 
        1 == r && (e = e.substr(0, t)), e.length >= t ? e : '                                                       '.substr(0, t - e.length) + e;
    }
};