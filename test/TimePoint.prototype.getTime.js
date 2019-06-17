const assert = require('assert')
const timepoint = require('../lib/index')

describe(`TimePoint.prototype.getTime`, () => {

    it(`The getTime method should return the right number`, () => {
        const time1 = timepoint.parse('2018-10-01 20:30:00').getTime()
        const time2 = Date.parse('2018/10/01 20:30:00')

        assert.strictEqual(time1, time2)
    })

    it(`The value of getTime() should be same with the date.getTime()`, () => {
        const date = new Date()
        const t = timepoint.parse(date)

        assert.strictEqual(date.getTime(), t.getTime())
    })

})
