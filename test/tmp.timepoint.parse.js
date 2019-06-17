const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint;

describe('timepoint.parse', () => {

    it(`timepoint.parse('2018-10-01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.strictEqual(format, expected)
    })

    it(`timepoint.parse('2018/10/01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = timepoint.parse('2018/10/01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.strictEqual(format, expected)
    })

    it(`timepoint.parse('2018-10-1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = timepoint.parse('2018-10-1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.strictEqual(format, expected)
    })

    it(`timepoint.parse('2018/10/1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = timepoint.parse('2018/10/1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.strictEqual(format, expected)
    })

    it(`timepoint.parse('2018-10-01 12:30:00').getTime() === 1538368200000`, () => {
        const t = timepoint.parse('2018-10-01 12:30:00')
        const d = new Date(0)

        d.setFullYear(2018)
        d.setMonth(9) // month = 10 - 1
        d.setDate(1)
        d.setHours(12)
        d.setMinutes(30)
        d.setSeconds(0)

        assert.strictEqual(t.getTime(), d.getTime())
    })

    it(`timepoint.parse(1538368200000).getTime() === 1538368200000`, () => {
        const time = timepoint.parse(1538368200000).getTime()
        const expected = 1538368200000

        assert.strictEqual(time, expected)
    })

    it(`timepoint.parse('1538368200000').getTime() === 1538368200000`, () => {
        const time = timepoint.parse(1538368200000).getTime()
        const expected = 1538368200000

        assert.strictEqual(time, expected)
    })

    it(`create timepoint instance from a timepoint instance`, () => {
        const t1 = new TimePoint()

        const d1 = Date.now();

        while ( ( Date.now() - d1 ) < 10 ) {
            // sleep 10ms
        }

        const t2 = new TimePoint(t1)

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`create timepoint instance from a Date instance`, () => {
        const d = new Date()
        const t = new TimePoint(d)

        assert.strictEqual(d.getTime(), t.getTime())
    })

    it(`timepoint.parse() is the current time`, () => {
        const d = new Date()
        const t = new TimePoint()

        assert.strictEqual(d.getTime(), t.getTime())
    })

    it(`timepoint.parse(NaN).getTime() === timepoint.parse().getTime()`, () => {
        const t1 = timepoint.parse(NaN)
        const t2 = timepoint.parse()

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`timepoint.parse(null).getTime() === timepoint.parse().getTime()`, () => {
        const t1 = timepoint.parse(null)
        const t2 = timepoint.parse()

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`timepoint.parse(false).getTime() === timepoint.parse().getTime()`, () => {
        const t1 = timepoint.parse(false)
        const t2 = timepoint.parse()

        assert.strictEqual(t1.getTime(), t2.getTime())
    })

    it(`timepoint.parse(0).getTime() === new Date(0).getTime()`, () => {
        const t = timepoint.parse(0)
        const d = new Date(0);

        assert.strictEqual(t.getTime(), d.getTime())
    })

})
