const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.getLastDay', function () {

    it('should return the last day of this month', () => {
        // 1
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getLastDay()

        assert.strictEqual(t2.format('DD'), '28')

        // 2
        const t3 = timepoint.parse('2020-02-15')
        const t4 = t3.getLastDay()

        assert.strictEqual(t4.format('DD'), '29')

        // 3
        const t5 = timepoint.parse('2020-07-15')
        const t6 = t5.getLastDay()

        assert.strictEqual(t6.format('DD'), '31')
    })

    it('should return a new instance of TimePoint', () => {
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getLastDay()

        assert.strictEqual(t2 instanceof TimePoint, true)
        assert.strictEqual(t1 !== t2, true)
    })

    it('should not change the other part of the time', () => {
        const t1 = timepoint.parse('2018-02-15')
        const t2 = t1.getLastDay()

        assert.strictEqual(
            t1.format('YYYY/MM HH:mm:dd.SSS'),
            t2.format('YYYY/MM HH:mm:dd.SSS')
        )
    })

})