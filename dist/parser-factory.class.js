/* Copyright (c) 2018 Read Write Tools */
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
            var i = t.indexOf('/*'), n = t.indexOf('*/', i + 2);
            t = t.substr(0, i) + t.substr(n + 2);
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
        for (var r = t.indexOf('//'); -1 != r; ) if (r > 0 && ':' == t.charAt(r - 1)) r = t.indexOf('//', r + 2); else {
            var s = t.substr(0, r).match(/'/g), u = t.substr(r + 2).match(/'/g);
            if (null == s || null == u || s.length % 2 != 1 || u.length % 2 != 1) {
                var o = t.substr(0, r).match(/"/g), a = t.substr(r + 2).match(/"/g);
                if (null == o || null == a || o.length % 2 != 1 || a.length % 2 != 1) break;
                r = t.indexOf('//', r + 2);
            } else r = t.indexOf('//', r + 2);
        }
        var c = t.indexOf('@common', r), m = t.indexOf('@using', r), l = t.indexOf('@testing', r);
        if (-1 != r && -1 != c) {
            this.parsingState = 1;
            var h = t.substr(c + '@common'.length).trim();
            return g = new CommonSection(h, this.packageNumber, e);
        }
        if (-1 != r && -1 != m) {
            this.parsingState = 2;
            h = t.substr(m + '@using'.length).trim();
            var g = new SituationSection(h, this.packageNumber, e);
            return this.currentSituationSection = g, g;
        }
        if (-1 != r && -1 != l) {
            this.parsingState = 3;
            h = t.substr(l + '@testing'.length).trim();
            var f = new TestGroup(h, this.packageNumber, e);
            return this.currentTestGroup = f, f;
        }
        if (0 == r || 0 == t.length) return null;
        if (r > 0 && (t = t.substr(0, r)), this.inCommonSection()) return new CommonCode(t);
        if (this.inSituationSection()) return new SituationCode(t);
        if (this.inTestSection()) {
            var S = t.split(';;'), p = S[0].trim(), d = S.length < 2 ? '' : S[1].trim();
            return new TestCase(p, d, this.currentSituationSection, this.currentTestGroup, this.packageNumber, e);
        }
        return log.abnormal(`Is this code or test? "${t}"`), null;
    }
};