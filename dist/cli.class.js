var terminal = require('joezone').terminal, Pfile = require('joezone').Pfile, Bunch = require('joezone').Bunch, Bequiesce = require('./bequiesce.class.js'), fs = require('fs');

module.exports = class CLI {
    constructor() {
        Object.seal(this);
    }
    validateOptions() {
        switch (2 == process.argv.length && this.usageAndExit(), process.argv[2]) {
          case '--version':
            return this.exit(this.showVersion()), !1;

          case '--syntax':
            return this.exit(this.listSyntax()), !1;

          case '--examples':
            return this.exit(this.listExamples()), !1;

          case '--help':
            return this.exit(this.listHelp()), !1;

          default:
            return !0;
        }
    }
    usageAndExit() {
        var e = [];
        e.push('usage: bequiesce [testfile | testdir] [options]'), e.push(''), e.push('options:'), 
        e.push('    --version'), e.push('    --syntax     explains the bequiesce test file syntax'), 
        e.push('    --examples   show examples of bequiesce test files'), e.push('    --help       show bequiesce syntax, examples'), 
        this.exit(e.join('\n'));
    }
    showVersion() {
        try {
            var e = new Pfile(__dirname).addPath('../package.json').name, s = fs.readFileSync(e, 'utf-8'), t = JSON.parse(s);
            return `version v${t.version}`;
        } catch (e) {
            return `version unknown ${e.message}`;
        }
    }
    listSyntax() {
        var e = [];
        return e.push('Syntax:'), e.push('Test files contain JavaScript-compliant syntax within three sections,'), 
        e.push('where each section is preceeded by one of these special comment delimiters:'), 
        e.push('  // @common  code that follows this comment defines code to be executed for each test case (optional)'), 
        e.push('  // @using   code that follows this comment defines code to be executed for each test case (required)'), 
        e.push('  // @testing code that follows this comment defines a single test case per line, executing @common and @using code for each test case'), 
        e.push(''), e.push('Each line in the @testing section must contain a proposition and one or more proofs.'), 
        e.push('  The proposition and proofs are separated by \';;\''), e.push('  When multiple proof statements are provided, they are separated by \'&&\''), 
        e.push(''), e.push('Execution is procedural, from top to bottom.'), e.push('The @common section is optional, but may be specified only once.'), 
        e.push('There may be more than one @using or @testing section per test file.'), 
        e.push(''), e.join('\n');
    }
    listExamples() {
        var e = [];
        return e.push('Examples:'), e.push(''), e.push('// @using'), e.push('var z = x + y;'), 
        e.push(''), e.push('// @testing strings'), e.push('x = \'Hello \'; y = \'World!\';   ;;   z == \'Hello World!\''), 
        e.push('x = \'1\'; y = \'2\'              ;;   (typeof x == \'string\') && (typeof y == \'string\') && (typeof z == \'string\') && z == \'12\''), 
        e.push(''), e.push('// @testing numbers'), e.push('x = 1; y = 2                  ;;   Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z) && z == 3'), 
        e.push('x = 1.0; y = 2.0              ;;   z == 3.0'), e.push(''), e.push('// @using'), 
        e.push('var sc = new SpheriCoords(radians);'), e.push('var dms = sc.asDegreesMinutesSeconds();'), 
        e.push(''), e.push('// @testing'), e.push('var radians = 1.0;           ;;  dms.degrees == 57  && dms.arcminutes == 17 && dms.arcseconds == 45'), 
        e.push('var radians = 2.0;           ;;  dms.degrees == 114 && dms.arcminutes == 35 && dms.arcseconds == 30'), 
        e.push('var radians = 3.0;           ;;  dms.degrees == 171 && dms.arcminutes == 53 && dms.arcseconds == 14'), 
        e.push('var radians = Math.PI;       ;;  dms.degrees == 180 && dms.arcminutes == 0  && dms.arcseconds == 0'), 
        e.push('var radians = 4.0;           ;;  dms.degrees == 229 && dms.arcminutes == 10 && dms.arcseconds == 59'), 
        e.push('var radians = 5.0;           ;;  dms.degrees == 286 && dms.arcminutes == 28 && dms.arcseconds == 44'), 
        e.push('var radians = 6.0;           ;;  dms.degrees == 343 && dms.arcminutes == 46 && dms.arcseconds == 29'), 
        e.push('var radians = 2*Math.PI;     ;;  dms.degrees == 360 && dms.arcminutes == 0  && dms.arcseconds == 0'), 
        e.join('\n');
    }
    listHelp() {
        var e = [];
        return e.push(''), e.push('usage: bequiesce [testfile | testdir] [options]'), e.push(''), 
        e.push(this.listSyntax()), e.push(''), e.push(this.listExamples()), e.join('\n');
    }
    exit(e) {
        terminal.writeToConsoleOrStderr('\nBequiesce is a test harness to run JavaScript test files\n'), 
        terminal.writeToConsoleOrStderr(e + '\n'), process.exit(0);
    }
    execute() {
        var e = Bequiesce.getInstance(), s = new Pfile(process.argv[2]).makeAbsolute();
        if (s.exists()) {
            if (s.isFile()) e.testPackage(s.getFQN()); else if (s.isDirectory()) {
                var t = new Bunch(s.getPath(), '*.test.js'), r = t.find(!0);
                for (let s of r) e.testPackage(s.getFQN());
            }
            var i = e.runTests();
            process.exit(i);
        } else terminal.writeToConsoleOrStderr(`${s.name} not found`);
    }
};