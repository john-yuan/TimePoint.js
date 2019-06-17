const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.addMs', function () {

    it('should add 100ms', () => {
        const t1 = timepoint.parse(0)
        const t2 = t1.addMs(100)

        assert.strictEqual(t1.getTime(), 0)
        assert.strictEqual(t2.getTime(), 100)
    })

    it('should minus 100ms', () => {
        const t1 = timepoint.parse(300)
        const t2 = t1.addMs(-100)

        assert.strictEqual(t1.getTime(), 300)
        assert.strictEqual(t2.getTime(), 200)
    })

    it('should return a new instance of TimePoint', () => {
        const t1 = timepoint.parse(0)
        const t2 = t1.addMs(100)

        assert.strictEqual(t2 instanceof TimePoint, true)
        assert.strictEqual(t1 === t2, false)
    })

})
