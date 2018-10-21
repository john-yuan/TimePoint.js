const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe(`TimePoint.prototype.getDate`, () => {

    it(`getDate should return an instance of Date`, () => {
        const t = TimePoint.init()
        const d = t.getDate()

        assert.equal(d instanceof Date, true)
    })

    it(`getDate should return new instance of Date each time`, () => {
        const t = TimePoint.init()
        const d1 = t.getDate()
        const d2 = t.getDate()

        assert.equal(d1 === d2, false)
    })

    it(`the date should have the same time with the TimePoint`, () => {
        const t = TimePoint.init();
        const d = t.getDate()

        assert.equal(t.getTime(), d.getTime())
    })

})
