/* Copyright (c) 2019 Read Write Tools */
var expect = require('joezone').expect, TextReader = require('joezone').TextReader, Pfile = require('joezone').Pfile, ParserFactory = require('./parser-factory.class.js'), CommonSection = require('./common-section.class.js'), CommonCode = require('./common-code.class.js'), SituationSection = require('./situation-section.class.js'), SituationCode = require('./situation-code.class.js'), TestGroup = require('./test-group.class.js'), TestCase = require('./test-case.class.js'), StatsRecoder = require('./stats-recorder.class.js'), Jot = require('./jot.class.js');

module.exports = class TestPackage {
    constructor(e, t) {
        expect(e, 'Pfile'), expect(t, 'Number'), this.pfile = e, this.packageNumber = t, 
        this.commonSection = new CommonSection('[auto]', t, 0), this.sections = new Array(), 
        this.statsRecorder = new StatsRecoder(), this.lineNumber = 1, this.sectionIndex = null, 
        Object.seal(this);
    }
    get filename() {
        return this.pfile.getFQN();
    }
    getCommonSection() {
        return this.commonSection;
    }
    parse() {
        var e = new ParserFactory(this.packageNumber), t = new TextReader();
        t.open(this.pfile.getFQN());
        for (var o = null; null != (o = t.getline()); ) {
            var s = e.parseLine(o, this.lineNumber++);
            null == s || ('CommonSection' == s.constructor.name ? this.addCommonSection(s) : 'CommonCode' == s.constructor.name ? this.addCommonCode(s) : 'SituationSection' == s.constructor.name ? this.addSituationSection(s) : 'SituationCode' == s.constructor.name ? this.addSituationCode(s) : 'TestGroup' == s.constructor.name ? this.addTestGroup(s) : 'TestCase' == s.constructor.name ? this.addTestCase(s) : log.hopelessHalt(`Encountered ${s.constructor.name}`));
        }
        return t.close(), !0;
    }
    addCommonSection(e) {
        expect(e, 'CommonSection'), this.commonSection.isValid() && log.trace(`Replacing previous @common section ${this.commonSection.description}`), 
        this.commonSection = e;
    }
    addSituationSection(e) {
        expect(e, 'SituationSection'), this.sections.push(e), this.sectionIndex = this.sections.length - 1;
    }
    currentSituationSection() {
        return null == this.sectionIndex && (log.abnormal('Adding a default SituationSection because none found'), 
        this.addSituationSection(new SituationSection('[auto]', this.packageNumber, this.lineNumber))), 
        this.sections[this.sectionIndex];
    }
    addTestGroup(e) {
        expect(e, 'TestGroup'), this.currentSituationSection().addTestGroup(e);
    }
    addTestCase(e) {
        expect(e, 'TestCase'), this.currentSituationSection().addTestCase(e);
    }
    addCommonCode(e) {
        expect(e, 'CommonCode'), null == this.commonSection && log.abnormalHalt('No commonSection'), 
        this.commonSection.addJavascript(e.javascript);
    }
    addSituationCode(e) {
        expect(e, 'SituationCode'), this.currentSituationSection().addJavascript(e.javascript);
    }
    runTests() {
        for (let e of this.sections) e.runTests(), this.statsRecorder.incrementSuccess(e.statsRecorder.passCount), 
        this.statsRecorder.incrementFailure(e.statsRecorder.failCount);
    }
    reportResults(e, t) {
        expect(e, 'String'), expect(t, 'String'), this.commonSection.isValid(), jot.trace(''), 
        e += ' ';
        for (let o of this.sections) o.reportResults(e, t);
        var o = Jot.rightJustify(this.statsRecorder.success.toString(), 3), s = Jot.rightJustify(this.statsRecorder.failure.toString(), 3), i = ` Pass ${o}    Fail ${s}`;
        jot.trace('                                 --------    --------'), jot.trace(this, i);
    }
};