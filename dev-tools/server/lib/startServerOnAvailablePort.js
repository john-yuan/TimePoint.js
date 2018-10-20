/**
 * 在首选端口号（port）上启动服务器，如果此端口被占用则尝试在 port + 1 上启动
 * 服务器。如此反复，直到找到一个可用的端口号。
 * 
 * @param {number} port 首选端口号
 * @param {(port: number) => net.Server} listen 启动服务器回调函数 
 * @param {(err: Error) => void} onerror 错误处理回调函数
 */
const startServerOnAvailablePort = function (port, listen, onerror) {
    let server = listen(port);
    let handleError = err => {
        if (typeof onerror === 'function') {
            onerror(err);
        } else {
            throw err;
        }
    };

    if (server && server.once) {
        server.once('error', err => {
            if (err.code === 'EADDRINUSE') {
                startServerOnAvailablePort(port + 1, listen, onerror);
            } else {
                handleError(err);
            }
        });
    } else {
        handleError(new TypeError('listen callback must return a net.Server'));
    }
};

module.exports = startServerOnAvailablePort;
