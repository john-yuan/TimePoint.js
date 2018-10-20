const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.create', () => {

    it(`TimePoint.create('2018-10-01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.create('2018-10-01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.create('2018/10/01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.create('2018/10/01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.create('2018-10-1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.create('2018-10-1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.create('2018/10/1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.create('2018/10/1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.create('2018-10-01 12:30:00').getTime() === 1538368200000`, () => {
        const t = TimePoint.create('2018-10-01 12:30:00')
        const d = new Date(0)

        d.setFullYear(2018)
        d.setMonth(9) // month = 10 - 1
        d.setDate(1)
        d.setHours(12)
        d.setMinutes(30)
        d.setSeconds(0)

        assert.equal(t.getTime(), d.getTime())
    })

    it(`TimePoint.create(1538368200000).getTime() === 1538368200000`, () => {
        const time = TimePoint.create(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.create('1538368200000').getTime() === 1538368200000`, () => {
        const time = TimePoint.create(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.create('2018-10-01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.create('2018-10-01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`TimePoint.create('2018/10/01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.create('2018/10/01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`create TimePoint instance from a TimePoint instance`, () => {
        const t1 = new TimePoint()

        const d1 = Date.now();

        while ( ( Date.now() - d1 ) < 10 ) {
            // sleep 10ms
        }

        const t2 = new TimePoint(t1)

        assert.equal(t1.getTime(), t2.getTime())
    })

    it(`Create TimePoint instance from a Date instance`, () => {
        const d = new Date()
        const t = new TimePoint(d)

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.create() is the current time`, () => {
        const d = new Date()
        const t = new TimePoint()

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.create(NaN).getTime() === TimePoint.create().getTime()`, () => {
        const t1 = TimePoint.create(NaN).getTime()
        const t2 = TimePoint.create().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.create(null).getTime() === TimePoint.create().getTime()`, () => {
        const t1 = TimePoint.create(null).getTime()
        const t2 = TimePoint.create().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.create(false).getTime() === TimePoint.create().getTime()`, () => {
        const t1 = TimePoint.create(false).getTime()
        const t2 = TimePoint.create().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.create(0).format() === '1970-01-01 08:00:00'`, () => {
        const format = TimePoint.create(0).format()
        const expected = '1970-01-01 08:00:00'

        assert.equal(format, expected)
    })

})
