







<figure>
	<img src='/img/tasks/bequiesce/bequiesce-pexels.png' width='100%' />
	<figcaption></figcaption>
</figure>

# Bequiesce

## Because 99.999 doesn't “just happen”


<address>
<img src='/img/rwtools.png' width=80 /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2016-10-19>Nov 19, 2016</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>Bequiesce</span> command line utility is a test harness for JavaScript libraries, with a bias towards proving that functions either fail correctly or succeed for the right reasons.</td></tr>
</table>

### Motivation

Existing tools for testing JavaScript suffer from three problems:

   1. They emphasize DOM testing over module testing.
   2. They are verbose to the point of being hard to maintain.
   3. They mask the true expressiveness of JavaScript.

The Bequiesce test harness begins with a solid basis as a straightforward
library regression test tool, while following the guideline that test cases must
be easy to read and maintain. Bequiesce does this by using JavaScript's ability
to evaluate strings that contain JavaScript code. With this simple approach, the
full power of JavaScript remains within the hands of the test developer.

### Prerequisites and installation

The <span>Bequiesce</span> utility uses Node.js. Package installation is
done via NPM. These are the only two prerequisites.

To install the utility and make it available to your Bash shell, use this
command.

```bash
[user@host]# npm install -g bequiesce
```

### Usage

The software is invoked from the command line with:

```bash
[user@host]# bequiesce [testfile | testdir] 
```

### Pragmas

Bequiesce test packages are composed entirely of JavaScript which are parsed by
the test harness. JavaScript statements within a test package are parsed
line-by-line and shunted to one of four collections for subsequent evaluation:

   1. common sections
   2. situation sections
   3. propositions
   4. proofs

Test authors develop their test cases in a single source file, organized into
groups separated by pragmas. The destination for each parsed line is determined
by the presence of these three pragmas: @common, @using, and @testing.

Parsed lines that occur immediately after the `common` pragma are shunted to the *common
section*: these JavaScript statements become part of the evaluation stream for
every test case defined later in the test package.

Parsed lines that occur immediately after a `using` pragma are shunted to the *situation
section*: these JavaScript statements become part of the evaluation stream for
test cases defined within the next `testing` pragma.

Parsed lines that occur immediately after a `testing` pragma contain
proposition-proof test cases. These lines are split into two halves by the
presence of the double-semicolon ( `;;` ) signal. Everything to the left of the
signal is added to the collection of *propositions*. Everything to the right of
the signal is added to the collection of *proofs*.

### Hello World

Here's what the simplest possible test package might look like.

```javascript
//@using
var z = x + y;

//@testing
x = 1; y = 2;     ;;     z == 3
```

### License and availability

The <span>Bequiesce</span> command line utility is licensed under the MIT
License. It may be cloned from <a href='https://github.com/readwritetools/bequiesce'>Github</a>
, or installed via <a href='https://www.npmjs.com/package/bequiesce'>NPM</a>
.

Complete documentation is available online at <a href='bequiesce.com'>https://bequiesce.com</a>

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2020 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

