var expect = require('joezone').expect, Bequiesce = require('./bequiesce.class.js');

module.exports = class FilenameResolver {
    constructor() {
        Object.seal(this);
    }
    static getPackage(e) {
        return expect(e, 'Number'), global._bequiesceInstance.getPackage(e);
    }
    static packageStem(e) {
        return this.getPackage(e).pfile.getStem();
    }
    static packagePath(e) {
        return this.getPackage(e).pfile.getPath();
    }
    static packageFQN(e) {
        return this.getPackage(e).pfile.getFQN();
    }
};