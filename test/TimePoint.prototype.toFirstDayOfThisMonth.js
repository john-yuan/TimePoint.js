const assert = require('assert')
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.prototype.toFirstDayOfThisMonth', function () {

    it('should return the first day of this month', () => {
        const t1 = TimePoint.parse('2018-02-15')
        const t2 = t1.toFirstDayOfThisMonth()

        assert.strictEqual(t2.format('DD'), '01')
    })

    it('should return a new instance of TimePoint', () => {
        const t1 = TimePoint.parse('2018-02-15')
        const t2 = t1.toFirstDayOfThisMonth()

        assert.strictEqual(t2 instanceof TimePoint, true)
        assert.strictEqual(t1 !== t2, true)
    })

    it('should not change the other part of the time', () => {
        const t1 = TimePoint.parse('2018-02-15')
        const t2 = t1.toFirstDayOfThisMonth()

        assert.strictEqual(
            t1.format('YYYY/MM hh:mm:dd.SSS'),
            t2.format('YYYY/MM hh:mm:dd.SSS')
        )
    })

})