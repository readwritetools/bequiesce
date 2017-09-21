var process = require('process');
process.stderr.write('step1\n');

var jz = require('joezone');
var expect = require('joezone').expect;

expect(999, 'String');
expect(999, 'Number');