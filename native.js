const EventEmitter = require('events').EventEmitter;
const net = require('net');
const tcp = exports;

tcp.createNode = async function createNode(port) {
    await tcp.createServer(port,'localhost');
    tcp.createSocket(port,'localhost');
}
tcp.createSocket = function createSocket(port, host) {
    return net.connect(port, host);
}
tcp.createServer = function listen(port, host) {
    let server = new net.Server();
    let ee = new EventEmitter();

    return new Promise(function (resolve, reject) {
        server.listen(port, host, wrap(resolve, reject));
    });
}
function wrap(resolve, reject) {
    return function(err, result) {
        if (err) {
            reject(err);
            return;
        }
        resolve(result);
    };
}
