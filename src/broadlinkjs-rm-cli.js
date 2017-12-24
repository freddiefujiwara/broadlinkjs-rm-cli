import BroadlinkJS from 'broadlinkjs-rm';
/**
 ** main class of BroadlinkjsRmCli
 */
export default class BroadlinkjsRmCli {
    /**
     * @constructor
     */
    constructor() {
        this.broadlink = undefined;
        this.discoveredDevices = {};
    }
    /**
     * convert buffer to string
     *
     * @param {Buffer} mac
     * @return {string} string of mac
     */
    macAddressBufferToString(mac) {
        return (mac.toString('hex').match(/[\s\S]{1,2}/g) || []).join(':');
    }
    /**
     * getDevice
     *
     * @param {string} device
     */
    deviceFound(device) {
        device.host.macAddress = this.macAddressBufferToString(device.mac);
        if (this.discoveredDevices[device.host.address] ||
            this.discoveredDevices[device.host.macAddress]) return;
        this.discoveredDevices[device.host.address] = device;
        this.discoveredDevices[device.host.macAddress] = device;
    }
    /**
     * run
     *
     * @param {string} host
     * @param {Function} callback
     * @param {number} count
     * @return {void}
     */
    run(host, callback, count = 5 ) {
        if (count < 0 ) {
            return callback(null); ;
        }
        if (Object.keys(this.discoveredDevices).length == 0 ) {
            if (typeof this.broadlink === 'undefined') {
                this.broadlink = new BroadlinkJS();
            }
            this.broadlink.discover();
            this.broadlink.on('deviceReady', (device) => {
                this.deviceFound(device);
            });
        }
        if (this.discoveredDevices.hasOwnProperty(host)) {
            return callback(this.discoveredDevices[host]);
        }
        setTimeout(()=>{
            return this.run(host, callback, count - 1);
        }, 1000);
    }
}
