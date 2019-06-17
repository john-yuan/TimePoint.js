const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.clearMs', () => {

    it(`clearMs should remove the ms part of the time`, () => {
        const t1 = timepoint.parse(1538366400456)
        const t2 = t1.clearMs()

        assert.strictEqual(t2.getTime(), 1538366400000)
    })

    it(`clearMs should keep the current instance unchanged`, () => {
        const t1 = timepoint.parse(1538366400456)

        t1.clearMs()

        assert.strictEqual(t1.getTime(), 1538366400456)
    })

    it(`clearMs should return a new instance of TimePoint`, () => {
        const t1 = timepoint.parse(1538366400456)
        const t2 = t1.clearMs()

        assert.strictEqual(t2 instanceof TimePoint, true)
        assert.strictEqual(t1 !== t2, true)
    })

})