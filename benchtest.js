const native = require('./native');
const zmq = require('./zmq');
const os = require('os');
const {misc} = require('khal');
const memwatch = require('memwatch-next');
const Benchtest = {
    scenarii:[fn0, fn1],
    getConsumption:function () {
        let snapshot = new memwatch.HeapDiff();
        let diff = snapshot.end();
        let memuse = process.memoryUsage();
        let consumption = {
            memory:{
                os:{
                    freemem:misc.formatByteSize(os.freemem()),
                    total:misc.formatByteSize(os.totalmem())
                },
                nodeUsage:{
                    rss:misc.formatByteSize(memuse.rss),
                    heapTotal:misc.formatByteSize(memuse.heapTotal),
                    heapUsed:misc.formatByteSize(memuse.heapUsed),
                    external:misc.formatByteSize(memuse.external),
                }
            },
            snapshotDiff:diff,
        }
        console.log(consumption);
    }
};
function fn0() {
    console.log('Scenario 0')
    Benchtest.getConsumption();
    console.log('Starting 1000 nodes');
    for(let i = 0; i<1000; i++){
        native.createNode(10000+i);
    }
    console.log('Feeding with heavy data');
    console.log('Feeding with light data');
    console.log('Overfeeding with both');
}
function fn1() {
    console.log('Scenario 1');
    Benchtest.getConsumption();
}
function start() {
    console.log('Pre-start : State of consumption');
    Benchtest.getConsumption();
    console.log('Starting...');
    Benchtest.scenarii.filter(function (_el) {
        _el();
    });
}
start();