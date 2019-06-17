const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.format default', () => {

    it(`The default format is YYYY-MM-DD HH:mm:ss`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format()

        assert.strictEqual(format, '2018-10-01 12:30:00')
    })

})

describe('TimePoint.prototype.format year', () => {

    it(`YYYY is the year`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('YYYY')

        assert.strictEqual(format, '2018')
    })

    it(`YY is the last two number of the year`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('YY')

        assert.strictEqual(format, '18')
    })

})

describe('TimePoint.prototype.format month', () => {

    it(`MM is the month without leading zero if the month is greater than 9`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('MM')

        assert.strictEqual(format, '10')
    })

    it(`MM is the month with a leading zero if the month is less than 10`, () => {
        const format = timepoint.parse('2018-09-01 12:30:00').format('MM')

        assert.strictEqual(format, '09')
    })

    it(`M is the month without leading zero`, () => {
        const format = timepoint.parse('2018-09-01 12:30:00').format('M')

        assert.strictEqual(format, '9')
    })

})

describe('TimePoint.prototype.format day', () => {

    it(`DD is the day without leading zero if the day is greater than 9`, () => {
        const format = timepoint.parse('2018-10-12 12:30:00').format('DD')

        assert.strictEqual(format, '12')
    })

    it(`DD is the day with a leading zero if the day is less than 10`, () => {
        const format = timepoint.parse('2018-09-01 12:30:00').format('DD')

        assert.strictEqual(format, '01')
    })

    it(`D is the day without leading zero`, () => {
        const format = timepoint.parse('2018-09-01 12:30:00').format('D')

        assert.strictEqual(format, '1')
    })

})

describe('TimePoint.prototype.format hour', () => {

    it(`HH is the hour without leading zero if the hour is greater than 9`, () => {
        const format = timepoint.parse('2018-10-12 12:30:00').format('HH')

        assert.strictEqual(format, '12')
    })

    it(`HH is the hour with a leading zero if the hour is less than 10`, () => {
        const format = timepoint.parse('2018-09-01 09:30:00').format('HH')

        assert.strictEqual(format, '09')
    })

    it(`h is the hour without leading zero`, () => {
        const format = timepoint.parse('2018-09-01 09:30:00').format('H')

        assert.strictEqual(format, '9')
    })

})

describe('TimePoint.prototype.format minute', () => {

    it(`mm is the minute without leading zero if the minute is greater than 9`, () => {
        const format = timepoint.parse('2018-10-12 12:30:00').format('mm')

        assert.strictEqual(format, '30')
    })

    it(`mm is the minute with a leading zero if the minute is less than 10`, () => {
        const format = timepoint.parse('2018-09-01 09:03:00').format('mm')

        assert.strictEqual(format, '03')
    })

    it(`m is the minute without leading zero`, () => {
        const format = timepoint.parse('2018-09-01 09:03:00').format('m')

        assert.strictEqual(format, '3')
    })

})

describe('TimePoint.prototype.format second', () => {

    it(`ss is the second without leading zero if the second is greater than 9`, () => {
        const format = timepoint.parse('2018-10-12 12:30:12').format('ss')

        assert.strictEqual(format, '12')
    })

    it(`ss is the second with a leading zero if the second is less than 10`, () => {
        const format = timepoint.parse('2018-09-01 09:03:03').format('ss')

        assert.strictEqual(format, '03')
    })

    it(`s is the second without leading zero`, () => {
        const format = timepoint.parse('2018-09-01 09:03:03').format('s')

        assert.strictEqual(format, '3')
    })

})

describe('TimePoint.prototype.format', () => {

    it(`timepoint.parse('2018-10-01 12:30:00').format('YYYY/MM/DD HH:mm:ss') === '2018/10/01 12:30:00'`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('YYYY/MM/DD HH:mm:ss')

        assert.strictEqual(format, '2018/10/01 12:30:00')
    })

    it(`timepoint.parse('2018-10-01 12:30:00').format('YY/MM/DD HH:mm:ss') === '18/10/01 12:30:00'`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('YY/MM/DD HH:mm:ss')

        assert.strictEqual(format, '18/10/01 12:30:00')
    })

    it(`timepoint.parse('2018-10-01 12:30:00').format('HH:mm:ss') === '12:30:00'`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('HH:mm:ss')

        assert.strictEqual(format, '12:30:00')
    })

    it(`timepoint.parse('2018-10-01 12:30:00').format('HH:mm') === '12:30'`, () => {
        const format = timepoint.parse('2018-10-01 12:30:00').format('HH:mm')

        assert.strictEqual(format, '12:30')
    })

    it(`timepoint.parse('2018-10-01 12:01:00').format('H:m:s') === '12:1:0'`, () => {
        const format = timepoint.parse('2018-10-01 12:01:00').format('H:m:0')

        assert.strictEqual(format, '12:1:0')
    })

    it(`timepoint.parse('2018-10-01 12:01:00').format('H:m') === '12:1'`, () => {
        const format = timepoint.parse('2018-10-01 12:01:00').format('H:m')

        assert.strictEqual(format, '12:1')
    })

})
