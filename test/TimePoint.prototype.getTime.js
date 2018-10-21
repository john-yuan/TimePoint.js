const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe(`TimePoint.prototype.getTime`, () => {

    it(`The getTime method should return the right number`, () => {
        const time1 = TimePoint.init('2018-10-01 20:30:00').getTime()
        const time2 = Date.parse('2018/10/01 20:30:00')

        assert.equal(time1, time2)
    })

    it(`The value of getTime() should be same with the date.getTime()`, () => {
        const date = new Date()
        const t = TimePoint.init(date)

        assert.equal(date.getTime(), t.getTime())
    })

})
