const assert = require('assert')
const timepoint = require('../lib/index')

describe('timepoint.now', () => {
    it(`timepoint.now() should return number`, () => {
        assert.strictEqual(typeof timepoint.now(), 'number')
    })

    it(`timepoint.now() should return the current millseconds`, () => {
        const t1 = timepoint.now();
        const t2 = new Date().getTime();
        const diff = Math.abs(t1 - t2);
        assert.strictEqual(diff < 3, true);
    })
})
