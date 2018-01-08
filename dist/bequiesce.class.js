var expect = require('joezone').expect, Pfile = require('joezone').Pfile, Log = require('joezone').Log, Jot = require('./jot.class.js'), TestPackage = require('./test-package.class.js'), StatsRecoder = require('./stats-recorder.class.js');

module.exports = class Bequiesce {
    constructor() {
        if (void 0 != global._bequiesceInstance) return global._bequiesceInstance;
        this._rootPath = null, this._testPackages = new Array(), this._shuntReportsTo = 'stdout', 
        this.statsRecorder = new StatsRecoder(), this.initialize(), global._bequiesceInstance = this, 
        Object.seal(this);
    }
    static getInstance() {
        return void 0 == global._bequiesceInstance ? new Bequiesce() : global._bequiesceInstance;
    }
    initialize() {
        process.argv.length < 1 && log.hopelessHalt('Expected argv to contain the path to the script.');
        var e = process.argv[1];
        expect(e, 'String'), this._rootPath = new Pfile(e).getPath();
    }
    testPackage(e) {
        expect(e, 'String');
        var t = new Pfile(e);
        if (t.exists()) {
            var s = this._testPackages.length, a = new TestPackage(t, s);
            this._testPackages.push(a);
        } else log.invalid(`Test package ${t.getFQN()} not found, skipping`);
        return this;
    }
    getPackage(e) {
        expect(e, 'Number'), e >= this._testPackages.length && log.invalidHalt(`Invalid packageNumber ${e}`);
        var t = this._testPackages[e];
        return expect(t, 'TestPackage'), t;
    }
    shuntReportsTo(e) {
        return expect(e, 'String'), this._shuntReportsTo = new Pfile(e).getFQN(), this;
    }
    runTests() {
        for (let e of this._testPackages) e.parse() && (e.runTests(), e.reportResults('', this._shuntReportsTo), 
        this.statsRecorder.incrementSuccess(e.statsRecorder.passCount), this.statsRecorder.incrementFailure(e.statsRecorder.failCount));
        jot.trace('');
        var e = Jot.rightJustify(this.statsRecorder.success.toString(), 3), t = Jot.rightJustify(this.statsRecorder.failure.toString(), 3), s = `Bequiesce                        Pass ${e}    Fail ${t}`;
        jot.trace('                                 ========    ========'), jot.trace(s), 
        jot.trace('');
    }
}, global.log = new Log(), global.jot = new Jot();