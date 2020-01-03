/* Copyright (c) 2018 Read Write Tools */
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
        var s = ` Pass ${Jot.rightJustify(this.statsRecorder.success.toString(), 3)}    Fail ${Jot.rightJustify(this.statsRecorder.failure.toString(), 3)} ${e} --\x3e ${this.description}`;
        jot.trace(this, s);
    }
};