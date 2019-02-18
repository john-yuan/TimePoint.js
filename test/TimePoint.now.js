const assert = require('assert')
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.now', () => {
    it(`TimePoint.now() should return number`, () => {
        assert.strictEqual(typeof TimePoint.now(), 'number')
    })

    it(`TimePoint.now() should return the current millseconds`, () => {
        const t1 = TimePoint.now();
        const t2 = new Date().getTime();
        const diff = Math.abs(t1 - t2);
        assert.strictEqual(diff < 3, true);
    })
})
