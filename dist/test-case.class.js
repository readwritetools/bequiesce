/* Copyright (c) 2018 Read Write Tools */
var expect = require('joezone').expect, TextWriter = require('joezone').TextWriter, Pfile = require('joezone').Pfile, FS = require('fs'), StatsRecoder = require('./stats-recorder.class.js'), FilenameResolver = require('./filename-resolver.class.js');

module.exports = class TestCase {
    constructor(e, t, i, s, o, r) {
        expect(e, 'String'), expect(t, 'String'), expect(i, 'SituationSection'), expect(s, 'TestGroup'), 
        expect(o, 'Number'), expect(r, 'Number'), this.propositionJS = e, this.proofJS = t, 
        this.snippetsJS = new Array(), this.situationSection = i, this.testGroup = s, this.packageNumber = o, 
        this.lineNumber = r, this.statsRecorder = new StatsRecoder(), this.visited = [], 
        this.initialize(), Object.seal(this);
    }
    initialize() {
        var e = this.proofJS.split('&&');
        for (let t of e) (t = t.trim()).length > 0 && (t.lastIndexOf(';') == t.length - 1 && (t = t.substr(0, t.length - 1)), 
        this.snippetsJS.push(t));
    }
    getCommonSection() {
        var e = FilenameResolver.getPackage(this.packageNumber).getCommonSection();
        return expect(e, 'CommonSection'), e;
    }
    runTests() {
        for (let n of this.snippetsJS) {
            this.visited = [];
            var e = FilenameResolver.packageFQN(this.packageNumber), t = this.getCommonSection().commonJS, i = this.expandCode(t, e), s = this.situationSection.situationJS, o = this.expandCode(s, e), r = this.evaluate(i, this.propositionJS, o, n);
            expect(r, [ 'String', 'Boolean' ]), !0 === r ? this.statsRecorder.incrementSuccess() : (this.statsRecorder.incrementFailure(), 
            this.printDetails(this.propositionJS, s, n, r));
        }
    }
    printDetails(e, t, i, s) {
        expect(e, 'String'), expect(t, 'String'), expect(i, 'String'), expect(s, [ 'String', 'Boolean' ]), 
        jot.trace(''), jot.trace('==== Test Case ====================='), jot.trace(this.situationSection, ` Section:     ${this.situationSection.description}`), 
        jot.trace(this.testGroup, ` Group:       ${this.testGroup.description}`), jot.trace(this, ` Proposition: ${e}`), 
        jot.trace(this, ` Proof:       ${i} <-- FAILED`), 'String' == s.constructor.name && jot.trace(this, ` Exception:   ${s}`), 
        jot.trace(this.situationSection, ' Situation:'), jot.trace(t);
    }
    evaluate(commonJS, propositionJS, situationJS, proofJS) {
        expect(commonJS, 'String'), expect(propositionJS, 'String'), expect(situationJS, 'String'), 
        expect(proofJS, 'String');
        var code = `${commonJS}\n${propositionJS}\n${situationJS}\nglobal.__b = (${proofJS});`;
        try {
            return eval(code), global.__b;
        } catch (e) {
            var tw = new TextWriter(), pFile = new Pfile('../test');
            return pFile.makeAbsolute(), pFile.exists() || (jot.trace(`Creating test case dump directory ${pFile.name}`), 
            pFile.mkDir()), pFile.addPath('test-case-dump.js'), tw.open(pFile.name), tw.putline(code), 
            tw.close(), `${e.constructor.name}: ${e.message} (Exact line number is not available, be sure to check both @common and @using code sections)`;
        }
    }
    expandCode(e, t) {
        expect(e, 'String'), expect(t, 'String');
        var i = [], s = new RegExp('import\\s+(.*?)\\s+from\\s+(.*)'), o = new RegExp('var\\s+(.*)\\s+=\\s+require\\(\'(.*?)\'\\);'), r = new RegExp('(module.exports\\s+=\\s+)(.*)'), n = e.split('\n');
        for (let e of n) {
            var a = r.exec(e);
            if (null != a) i.push(a[2]); else if (null == (a = s.exec(e)) && (a = o.exec(e)), 
            null == a) i.push(e); else {
                var c = this.resolveFilename(a[2], t);
                if (-1 == this.visited.indexOf(c)) {
                    this.visited.push(c);
                    var p = new Pfile(c), l = p.getFilename();
                    if (1 == ('fs' == l || 'path' == l || 'crypto' == l || 'http' == l || 'https' == l || 'http2' == l || 'url' == l || 'child_process' == l)) i.push(e); else if (p.exists()) {
                        var h = FS.readFileSync(c, 'utf8'), u = this.expandCode(h, c);
                        i.push(u);
                    } else log.invalidHalt(`Import not found '${c}' while parsing ${t}`);
                }
            }
        }
        return i.join('\n');
    }
    resolveFilename(e, t) {
        expect(e, 'String'), expect(t, 'String'), ';' == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1));
        var i = e.charAt(0);
        i != e.charAt(e.length - 1) || '"' != i && '\'' != i || (e = e.substr(1, e.length - 2));
        var s = new Pfile(t).getPath(), o = new Pfile(s).addPath(e);
        if (!o.exists()) {
            var r = new Pfile(o).addExtension('js');
            r.exists() && (o = r);
        }
        return o.getFQN();
    }
};