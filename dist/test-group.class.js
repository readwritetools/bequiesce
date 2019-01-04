/* Copyright (c) 2019 Read Write Tools */
var expect = require('joezone').expect, StatsRecoder = require('./stats-recorder.class.js'), Jot = require('./jot.class.js');

module.exports = class TestGroup {
    constructor(e, t, s) {
        expect(e, 'String'), expect(t, 'Number'), expect(s, 'Number'), this.description = e.trim(), 
        0 == this.description.length && (this.description = '[unnamed test group]'), this.cases = new Array(), 
        this.statsRecorder = new StatsRecoder(), this.packageNumber = t, this.lineNumber = s, 
        Object.seal(this);
    }
    addTestCase(e) {
        expect(e, 'TestCase'), this.cases.push(e);
    }
    runTests() {
        for (let t = 0; t < this.cases.length; t++) {
            var e = this.cases[t];
            e.runTests(), this.statsRecorder.incrementSuccess(e.statsRecorder.passCount), this.statsRecorder.incrementFailure(e.statsRecorder.failCount);
        }
    }
    reportResults(e, t) {
        expect(e, 'String'), expect(t, 'String');
        var s = Jot.rightJustify(this.statsRecorder.success.toString(), 3), r = Jot.rightJustify(this.statsRecorder.failure.toString(), 3), i = this.description, c = ` Pass ${s}    Fail ${r} ${e} --\x3e ${i}`;
        jot.trace(this, c);
    }
};