const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.prototype.copy', () => {

    it(`copy should return an instance of TimePoint`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.copy()

        assert.strictEqual(t2 instanceof TimePoint, true)
    })

    it(`copy should have the same time with the source`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.copy()

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`copy shoud have an new instance`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.copy()
        const t3 = t1.copy()

        assert.strictEqual(t1 === t2, false)
        assert.strictEqual(t2 === t3, false)
    })

})