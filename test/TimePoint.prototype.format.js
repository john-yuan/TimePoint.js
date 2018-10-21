const assert = require('assert');
const TimePoint = require('../dist/cmd/TimePoint')

describe('TimePoint.prototype.format default', () => {

    it(`The default format is YYYY-MM-DD hh:mm:ss`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format()

        assert.equal(format, '2018-10-01 12:30:00')
    })

})

describe('TimePoint.prototype.format year', () => {

    it(`YYYY is the year`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('YYYY')

        assert.equal(format, '2018')
    })

    it(`YY is the last two number of the year`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('YY')

        assert.equal(format, '18')
    })

})

describe('TimePoint.prototype.format month', () => {

    it(`MM is the month without leading zero if the month is greater than 9`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('MM')

        assert.equal(format, '10')
    })

    it(`MM is the month with a leading zero if the month is less than 10`, () => {
        const format = TimePoint.from('2018-09-01 12:30:00').format('MM')

        assert.equal(format, '09')
    })

    it(`M is the month without leading zero`, () => {
        const format = TimePoint.from('2018-09-01 12:30:00').format('M')

        assert.equal(format, '9')
    })

})

describe('TimePoint.prototype.format day', () => {

    it(`DD is the day without leading zero if the day is greater than 9`, () => {
        const format = TimePoint.from('2018-10-12 12:30:00').format('DD')

        assert.equal(format, '12')
    })

    it(`DD is the day with a leading zero if the day is less than 10`, () => {
        const format = TimePoint.from('2018-09-01 12:30:00').format('DD')

        assert.equal(format, '01')
    })

    it(`D is the day without leading zero`, () => {
        const format = TimePoint.from('2018-09-01 12:30:00').format('D')

        assert.equal(format, '1')
    })

})

describe('TimePoint.prototype.format hour', () => {

    it(`hh is the hour without leading zero if the hour is greater than 9`, () => {
        const format = TimePoint.from('2018-10-12 12:30:00').format('hh')

        assert.equal(format, '12')
    })

    it(`hh is the hour with a leading zero if the hour is less than 10`, () => {
        const format = TimePoint.from('2018-09-01 09:30:00').format('hh')

        assert.equal(format, '09')
    })

    it(`h is the hour without leading zero`, () => {
        const format = TimePoint.from('2018-09-01 09:30:00').format('h')

        assert.equal(format, '9')
    })

})

describe('TimePoint.prototype.format minute', () => {

    it(`mm is the minute without leading zero if the minute is greater than 9`, () => {
        const format = TimePoint.from('2018-10-12 12:30:00').format('mm')

        assert.equal(format, '30')
    })

    it(`mm is the minute with a leading zero if the minute is less than 10`, () => {
        const format = TimePoint.from('2018-09-01 09:03:00').format('mm')

        assert.equal(format, '03')
    })

    it(`m is the minute without leading zero`, () => {
        const format = TimePoint.from('2018-09-01 09:03:00').format('m')

        assert.equal(format, '3')
    })

})

describe('TimePoint.prototype.format second', () => {

    it(`ss is the second without leading zero if the second is greater than 9`, () => {
        const format = TimePoint.from('2018-10-12 12:30:12').format('ss')

        assert.equal(format, '12')
    })

    it(`ss is the second with a leading zero if the second is less than 10`, () => {
        const format = TimePoint.from('2018-09-01 09:03:03').format('ss')

        assert.equal(format, '03')
    })

    it(`s is the second without leading zero`, () => {
        const format = TimePoint.from('2018-09-01 09:03:03').format('s')

        assert.equal(format, '3')
    })

})

describe('TimePoint.prototype.format', () => {

    it(`TimePoint.from('2018-10-01 12:30:00').format('YYYY/MM/DD hh:mm:ss') === '2018/10/01 12:30:00'`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('YYYY/MM/DD hh:mm:ss')

        assert.equal(format, '2018/10/01 12:30:00')
    })

    it(`TimePoint.from('2018-10-01 12:30:00').format('YY/MM/DD hh:mm:ss') === '18/10/01 12:30:00'`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('YY/MM/DD hh:mm:ss')

        assert.equal(format, '18/10/01 12:30:00')
    })

    it(`TimePoint.from('2018-10-01 12:30:00').format('hh:mm:ss') === '12:30:00'`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('hh:mm:ss')

        assert.equal(format, '12:30:00')
    })

    it(`TimePoint.from('2018-10-01 12:30:00').format('hh:mm') === '12:30'`, () => {
        const format = TimePoint.from('2018-10-01 12:30:00').format('hh:mm')

        assert.equal(format, '12:30')
    })

    it(`TimePoint.from('2018-10-01 12:01:00').format('h:m:s') === '12:1:0'`, () => {
        const format = TimePoint.from('2018-10-01 12:01:00').format('h:m:0')

        assert.equal(format, '12:1:0')
    })

    it(`TimePoint.from('2018-10-01 12:01:00').format('h:m') === '12:1'`, () => {
        const format = TimePoint.from('2018-10-01 12:01:00').format('h:m')

        assert.equal(format, '12:1')
    })

})
