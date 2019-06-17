/**
 * 解析毫秒字符串
 *
 * 1. '1' => 100
 * 2. '10' => 100
 * 3. '01' => 10
 * 4. '001' => 1
 * 5. '0001' => 0
 *
 * @param {string} ms
 * @returns {number}
 */
function parseMs(ms) {
    if (typeof ms === 'string') {
        while (ms.length < 3) {
            ms += '0';
        }
        ms = ms.substr(0, 3);
        return parseInt(ms, 10);
    } else {
        return 0;
    }
}

module.exports = parseMs;
