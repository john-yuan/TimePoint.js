const assert = require('assert')
const TimePoint = require('../dist/cmd/TimePoint')

describe(`TimePoint.prototype.lastDayOfThisMonth`, function () {

    it(`last day of 2018-01 is 31`, () => {
        const t = TimePoint.parse('2018-01')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-02 is 28`, () => {
        const t = TimePoint.parse('2018-02')
        assert.strictEqual(t.lastDayOfThisMonth(), 28)
    })

    it(`last day of 2018-03 is 31`, () => {
        const t = TimePoint.parse('2018-03')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-04 is 30`, () => {
        const t = TimePoint.parse('2018-04')
        assert.strictEqual(t.lastDayOfThisMonth(), 30)
    })

    it(`last day of 2018-05 is 31`, () => {
        const t = TimePoint.parse('2018-05')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-06 is 30`, () => {
        const t = TimePoint.parse('2018-06')
        assert.strictEqual(t.lastDayOfThisMonth(), 30)
    })

    it(`last day of 2018-07 is 31`, () => {
        const t = TimePoint.parse('2018-07')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-08 is 31`, () => {
        const t = TimePoint.parse('2018-08')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-09 is 30`, () => {
        const t = TimePoint.parse('2018-09')
        assert.strictEqual(t.lastDayOfThisMonth(), 30)
    })

    it(`last day of 2018-10 is 31`, () => {
        const t = TimePoint.parse('2018-10')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of 2018-11 is 30`, () => {
        const t = TimePoint.parse('2018-11')
        assert.strictEqual(t.lastDayOfThisMonth(), 30)
    })

    it(`last day of 2018-12 is 31`, () => {
        const t = TimePoint.parse('2018-12')
        assert.strictEqual(t.lastDayOfThisMonth(), 31)
    })

    it(`last day of the month 2 of the leap year is 29`, () => {
        const leapYears = [
            "1952",
            "1956",
            "1960",
            "1964",
            "1968",
            "1972",
            "1976",
            "1980",
            "1984",
            "1988",
            "1992",
            "1996",
            "2000",
            "2004",
            "2008",
            "2012",
            "2016",
            "2020",
            "2024",
            "2028",
            "2032",
            "2036",
            "2040",
            "2044",
            "2048"
        ]

        let start = 1952
        let end = 2048

        while (start <= end) {
            let month = `${start}-02`
            let year = start + ''
            let lastDay = TimePoint.parse(month).lastDayOfThisMonth()

            if (leapYears.indexOf(year) > -1) {
                assert.strictEqual(lastDay, 29)
            } else {
                assert.strictEqual(lastDay, 28)
            }

            start += 1;
        }
    })
})
