/* eslint require-jsdoc: 1 */
import chai from 'chai';
chai.should();
import BroadlinkjsRmCli from '../src/broadlinkjs-rm-cli';
describe('BroadlinkjsRmCli test.', (suite) => {
    it('should have properties ', () => {
        const brc = new BroadlinkjsRmCli();
        brc.should.be.a('object');
        brc.should.have.property('broadlink').with.equal(undefined);
        brc.should.have.property('discoveredDevices').with.deep.equal({});
    });
    it('should convert macAddressBuffer To String properly ', () => {
        const brc = new BroadlinkjsRmCli();
        brc.should.have.
            property('macAddressBufferToString').with.be.a('function');
        brc.macAddressBufferToString(new Buffer('34ea3442a966', 'hex')).
            should.be.a('string').with.equal('34:ea:34:42:a9:66');
    });
    it('should store device to discoveredDevices properly ', () => {
        const brc = new BroadlinkjsRmCli();
        brc.should.have.property('deviceFound').with.be.a('function');
        brc.deviceFound({
            host: {address: '127.0.0.1'},
            mac: new Buffer('34ea3442a966', 'hex'),
        });
        Object.keys(brc.discoveredDevices).length.should.equal(2);
        brc.discoveredDevices.should.have.
            property('127.0.0.1').with.deep.equal({
                host: {address: '127.0.0.1', macAddress: '34:ea:34:42:a9:66'},
                mac: new Buffer('34ea3442a966', 'hex'),
            });
        brc.discoveredDevices.should.have.
            property('34:ea:34:42:a9:66').with.deep.equal({
                host: {address: '127.0.0.1', macAddress: '34:ea:34:42:a9:66'},
                mac: new Buffer('34ea3442a966', 'hex'),
            });
        brc.deviceFound({
            host: {address: '127.0.0.1'},
            mac: new Buffer('34ea3442a966', 'hex'),
        });
        Object.keys(brc.discoveredDevices).length.should.equal(2);
    });
    it('should run properly ', (done) => {
        const brc = new BroadlinkjsRmCli();
        brc.should.have.property('run').with.be.a('function');
        brc.broadlink = new BroadlinkJSMock();
        brc.run('127.0.0.1', (device) => {
            device.should.deep.equal({
                host: {address: '127.0.0.1', macAddress: '34:ea:34:42:a9:66'},
                mac: new Buffer('34ea3442a966', 'hex'),
            });
            done();
        });
    });
});

/**
 ** main class of BroadlinkJSMock
 */
class BroadlinkJSMock {
    /**
     * @constructor
     */
    constructor() {
    }
    /**
     * discover RM devices
     */
    discover() {
    }
    /**
     * on handler
     *
     * @param {string} handler
     * @param {Function} callback
     */
    on(handler, callback) {
        if (handler === 'deviceReady') {
            callback({
                host: {address: '127.0.0.1'},
                mac: new Buffer('34ea3442a966', 'hex'),
            });
        }
    }
}
