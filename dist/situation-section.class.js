var expect = require('joezone').expect, TestGroup = require('./test-group.class.js'), TestCase = require('./test-case.class.js'), StatsRecoder = require('./stats-recorder.class.js');

module.exports = class SituationSection {
    constructor(e, t, s) {
        expect(e, 'String'), expect(t, 'Number'), expect(s, 'Number'), this.description = e.trim(), 
        0 == this.description.length && (this.description = '[unnamed code section]'), this.situationJS = '', 
        this.groups = new Array(), this.statsRecorder = new StatsRecoder(), this.packageNumber = t, 
        this.lineNumber = s, this.groupIndex = null, Object.seal(this);
    }
    addTestGroup(e) {
        expect(e, 'TestGroup'), this.groups.push(e), this.groupIndex = this.groups.length - 1;
    }
    currentTestGroup() {
        return null == this.groupIndex && (log.abnormal('Adding a default TestGroup because none found'), 
        this.addTestGroup(new TestGroup('[auto]', this.packageNumber, this.lineNumber))), 
        this.groups[this.groupIndex];
    }
    addTestCase(e) {
        expect(e, 'TestCase'), this.currentTestGroup().addTestCase(e);
    }
    addJavascript(e) {
        expect(e, 'String'), 0 == this.situationJS.length ? this.situationJS = e : this.situationJS += '\n' + e;
    }
    runTests() {
        for (let e of this.groups) e.runTests(), this.statsRecorder.incrementSuccess(e.statsRecorder.passCount), 
        this.statsRecorder.incrementFailure(e.statsRecorder.failCount);
    }
    reportResults(e, t) {
        expect(e, 'String'), expect(t, 'String'), e += ' ' + this.description;
        for (let s of this.groups) s.reportResults(e, t);
    }
};