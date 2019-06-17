/**
 * 移除字符串首尾的空白字符。如果 `str` 不是字符串，则将其转换为字符串。如果 `str` 为 `null` 或者 `undefined`，则将其转换为空字符串。
 *
 * @param {any} str
 * @returns {string}
 */
function trim(str) {
    if (typeof str !== 'string') {
        if (str === null || str === void 0) {
            str = '';
        } else {
            str = '' + str;
        }
    }
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

module.exports = trim;
