const os = require('os');

/**
 * 获取本机所有网卡 IP 地址
 *
 * @returns {string[]} 返回一个 IP 地址数组
 */
const getAllIPv4Address = function () {
    let interfaces = new os.networkInterfaces();
    let hasOwn = Object.prototype.hasOwnProperty;
    let IPv4Address = [];

    for (let prop in interfaces) {
        if (hasOwn.call(interfaces, prop)) {
            for (let info of interfaces[prop]) {
                if (info.family === 'IPv4') {
                    IPv4Address.push(info.address);
                }
            }
        }
    }

    return IPv4Address.reverse();
};

module.exports = getAllIPv4Address;
