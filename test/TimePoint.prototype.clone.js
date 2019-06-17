const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.clone', () => {

    it(`clone should return an instance of TimePoint`, () => {
        const t1 = timepoint.parse()
        const t2 = t1.clone()

        assert.strictEqual(t2 instanceof TimePoint, true)
    })

    it(`clone should have the same time with the source`, () => {
        const t1 = timepoint.parse()
        const t2 = t1.clone()

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`clone shoud have an new instance`, () => {
        const t1 = timepoint.parse()
        const t2 = t1.clone()
        const t3 = t1.clone()

        assert.strictEqual(t1 === t2, false)
        assert.strictEqual(t2 === t3, false)
    })

})