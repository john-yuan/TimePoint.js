const assert = require('assert')
const timepoint = require('../lib/index')
const TimePoint = timepoint.TimePoint

describe('TimePoint.prototype.map', function () {
    it('map', function () {
        const t = timepoint.parse('2000-05-01 08:30:50:789')
        const map = t.map()

        assert.deepStrictEqual(map, {
            YYYY: '2000',
            YY: '00',
            MM: '05',
            M: '5',
            DD: '01',
            D: '1',
            HH: '08',
            H: '8',
            mm: '30',
            m: '30',
            ss: '50',
            s: '50',
            S: '7',
            SS: '78',
            SSS: '789'
        })
    })
})
