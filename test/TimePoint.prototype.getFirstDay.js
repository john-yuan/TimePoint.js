
const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.getFirstDay', function () {

    it('should return the first day of this month', () => {
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getFirstDay()

        assert.strictEqual(t2.format('DD'), '01')
    })

    it('should return a new instance of TimePoint', () => {
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getFirstDay()

        assert.strictEqual(t2 instanceof TimePoint, true)
        assert.strictEqual(t1 !== t2, true)
    })

    it('should not change the other part of the time', () => {
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getFirstDay()

        assert.strictEqual(
            t1.format('YYYY/MM hh:mm:dd.SSS'),
            t2.format('YYYY/MM hh:mm:dd.SSS')
        )
    })

})