/* Copyright (c) 2019 Read Write Tools */
var expect = require('joezone').expect, CommonSection = require('./common-section.class.js'), CommonCode = require('./common-code.class.js'), SituationSection = require('./situation-section.class.js'), SituationCode = require('./situation-code.class.js'), TestGroup = require('./test-group.class.js'), TestCase = require('./test-case.class.js');

module.exports = class ParserFactory {
    constructor(t) {
        expect(t, 'Number'), this.packageNumber = t, this.currentSituationSection = null, 
        this.currentTestGroup = null, this.parsingState = 0, this.multiLineComment = 0, 
        Object.seal(this);
    }
    inCommonSection() {
        return 1 == this.parsingState;
    }
    inSituationSection() {
        return 2 == this.parsingState;
    }
    inTestSection() {
        return 3 == this.parsingState;
    }
    parseLine(t, e) {
        for (expect(t, 'String'), expect(e, 'Number'); -1 != t.indexOf('/*') && -1 != t.indexOf('*/'); ) {
            var i = t.indexOf('/*'), n = t.indexOf('*/', i + 2), r = t.substr(0, i), s = t.substr(n + 2);
            t = r + s;
        }
        if (-1 != t.indexOf('*/')) {
            n = t.indexOf('*/');
            t = t.substr(n + 2), this.multiLineComment = 0;
        }
        if (1 == this.multiLineComment) return null;
        if (-1 != t.indexOf('/*')) {
            i = t.indexOf('/*');
            t = t.substr(0, i), this.multiLineComment = 1;
        }
        for (var u = t.indexOf('//'); -1 != u; ) if (u > 0 && ':' == t.charAt(u - 1)) u = t.indexOf('//', u + 2); else {
            var o = t.substr(0, u).match(/'/g), a = t.substr(u + 2).match(/'/g);
            if (null == o || null == a || o.length % 2 != 1 || a.length % 2 != 1) {
                var c = t.substr(0, u).match(/"/g), m = t.substr(u + 2).match(/"/g);
                if (null == c || null == m || c.length % 2 != 1 || m.length % 2 != 1) break;
                u = t.indexOf('//', u + 2);
            } else u = t.indexOf('//', u + 2);
        }
        var l = t.indexOf('@common', u), h = t.indexOf('@using', u), g = t.indexOf('@testing', u);
        if (-1 != u && -1 != l) {
            this.parsingState = 1;
            var f = t.substr(l + '@common'.length).trim();
            return S = new CommonSection(f, this.packageNumber, e);
        }
        if (-1 != u && -1 != h) {
            this.parsingState = 2;
            f = t.substr(h + '@using'.length).trim();
            var S = new SituationSection(f, this.packageNumber, e);
            return this.currentSituationSection = S, S;
        }
        if (-1 != u && -1 != g) {
            this.parsingState = 3;
            f = t.substr(g + '@testing'.length).trim();
            var p = new TestGroup(f, this.packageNumber, e);
            return this.currentTestGroup = p, p;
        }
        if (0 == u || 0 == t.length) return null;
        if (u > 0 && (t = t.substr(0, u)), this.inCommonSection()) return new CommonCode(t);
        if (this.inSituationSection()) return new SituationCode(t);
        if (this.inTestSection()) {
            var d = t.split(';;'), b = d[0].trim(), x = d.length < 2 ? '' : d[1].trim();
            return new TestCase(b, x, this.currentSituationSection, this.currentTestGroup, this.packageNumber, e);
        }
        return log.abnormal(`Is this code or test? "${t}"`), null;
    }
};