/* Copyright (c) 2018 Read Write Tools */
var expect = require('joezone').expect;

module.exports = class CommonCode {
    constructor(e) {
        expect(e, 'String'), this.javascript = e, Object.seal(this);
    }
};