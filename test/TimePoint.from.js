const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.from', () => {

    it(`TimePoint.from('2018-10-01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.from('2018/10/01 12:30:00').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.from('2018/10/01 12:30:00').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.from('2018-10-1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.from('2018-10-1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.from('2018/10/1 12:30:0').format() === '2018-10-01 12:30:00'`, () => {
        const format = TimePoint.from('2018/10/1 12:30:0').format()
        const expected = '2018-10-01 12:30:00'
        assert.equal(format, expected)
    })

    it(`TimePoint.from('2018-10-01 12:30:00').getTime() === 1538368200000`, () => {
        const t = TimePoint.from('2018-10-01 12:30:00')
        const d = new Date(0)

        d.setFullYear(2018)
        d.setMonth(9) // month = 10 - 1
        d.setDate(1)
        d.setHours(12)
        d.setMinutes(30)
        d.setSeconds(0)

        assert.equal(t.getTime(), d.getTime())
    })

    it(`TimePoint.from(1538368200000).getTime() === 1538368200000`, () => {
        const time = TimePoint.from(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.from('1538368200000').getTime() === 1538368200000`, () => {
        const time = TimePoint.from(1538368200000).getTime()
        const expected = 1538368200000

        assert.equal(time, expected)
    })

    it(`TimePoint.from('2018-10-01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.from('2018-10-01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`TimePoint.from('2018/10/01').format() === '2018-10-01 00:00:00'`, () => {
        const format = TimePoint.from('2018/10/01').format()
        const expected = '2018-10-01 00:00:00'

        assert.equal(format, expected)
    })

    it(`from TimePoint instance from a TimePoint instance`, () => {
        const t1 = new TimePoint()

        const d1 = Date.now();

        while ( ( Date.now() - d1 ) < 10 ) {
            // sleep 10ms
        }

        const t2 = new TimePoint(t1)

        assert.equal(t1.getTime(), t2.getTime())
    })

    it(`from TimePoint instance from a Date instance`, () => {
        const d = new Date()
        const t = new TimePoint(d)

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.from() is the current time`, () => {
        const d = new Date()
        const t = new TimePoint()

        assert.equal(d.getTime(), t.getTime())
    })

    it(`TimePoint.from(NaN).getTime() === TimePoint.from().getTime()`, () => {
        const t1 = TimePoint.from(NaN).getTime()
        const t2 = TimePoint.from().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.from(null).getTime() === TimePoint.from().getTime()`, () => {
        const t1 = TimePoint.from(null).getTime()
        const t2 = TimePoint.from().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.from(false).getTime() === TimePoint.from().getTime()`, () => {
        const t1 = TimePoint.from(false).getTime()
        const t2 = TimePoint.from().getTime()

        assert.equal(t1, t2)
    })

    it(`TimePoint.from(0).getTime() === new Date(0).getTime()`, () => {
        const t = TimePoint.from(0)
        const d = new Date(0);

        assert.equal(t.getTime(), d.getTime())
    })

})
