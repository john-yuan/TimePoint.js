const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.prototype.clone', () => {

    it(`clone should return an instance of TimePoint`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.clone()

        assert.equal(t2 instanceof TimePoint, true)
    })

    it(`clone should have the same time with the source`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.clone()

        assert.equal(t1.getTime(), t2.getTime())
    })

    it(`clone shoud have an new instance`, () => {
        const t1 = TimePoint.parse()
        const t2 = t1.clone()
        const t3 = t1.clone()

        assert.equal(t1 === t2, false)
        assert.equal(t2 === t3, false)
    })

})