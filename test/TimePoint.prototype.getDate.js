const assert = require('assert')
const timepoint = require('../lib/index')

describe(`TimePoint.prototype.getDate`, () => {

    it(`getDate should return an instance of Date`, () => {
        const t = timepoint.parse()
        const d = t.getDate()

        assert.strictEqual(d instanceof Date, true)
    })

    it(`getDate should return new instance of Date each time`, () => {
        const t = timepoint.parse()
        const d1 = t.getDate()
        const d2 = t.getDate()

        assert.strictEqual(d1 === d2, false)
    })

    it(`the date should have the same time with the TimePoint`, () => {
        const t = timepoint.parse();
        const d = t.getDate()

        assert.strictEqual(t.getTime(), d.getTime())
    })

})
