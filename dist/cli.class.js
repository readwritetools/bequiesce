var Pfile = require('joezone').Pfile, Bunch = require('joezone').Bunch, Bequiesce = require('./bequiesce.class.js');

module.exports = class CLI {
    constructor() {
        Object.seal(this);
    }
    validateOptions() {
        return process.argv.length < 3 && log.invalidHalt('Usage: bequiesce {testfile | testdir}\n   (only *.test.js files will be included if {testdir} is provided)'), 
        !0;
    }
    execute() {
        var e = Bequiesce.getInstance(), s = new Pfile(process.argv[2]).makeAbsolute();
        if (s.isFile()) e.testPackage(s.getFQN()); else if (s.isDirectory()) {
            var t = new Bunch(s.getPath(), '*.test.js'), i = t.find(!0);
            for (let s of i) e.testPackage(s.getFQN());
        }
        e.runTests();
    }
};