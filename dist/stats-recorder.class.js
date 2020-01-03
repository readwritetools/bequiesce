/* Copyright (c) 2018 Read Write Tools */
module.exports = class StatsRecorder {
    constructor() {
        this.success = 0, this.failure = 0, this.failedObjects = new Array(), Object.seal(this);
    }
    get passCount() {
        return this.success;
    }
    get failCount() {
        return this.failure;
    }
    incrementSuccess(s) {
        void 0 == s && (s = 1), this.success += s;
    }
    incrementFailure(s) {
        void 0 == s && (s = 1), this.failure += s;
    }
};