const BroadlinkJS = require('broadlinkjs-rm');
const broadlink = new BroadlinkJS()

const discoveredDevices = {};
const macAddressBufferToString = (mac) => {
     return (mac.toString('hex').match(/[\s\S]{1,2}/g) || []).join(':');
}
const getDevice = ({ host, count, callback }) => {
    if(count < 0 ){
        return callback(null);;
    }
    if(Object.keys(discoveredDevices).length == 0 ){
        broadlink.discover();
        broadlink.on('deviceReady', (device) => {
            device.host.macAddress = macAddressBufferToString(device.mac);

            if (discoveredDevices[device.host.address] || discoveredDevices[device.host.macAddress]) return;

            console.log(`Discovered Broadlink RM device at ${device.host.address} (${device.host.macAddress})`)

            discoveredDevices[device.host.address] = device;
            discoveredDevices[device.host.macAddress] = device;
        })
    }
    if(discoveredDevices.hasOwnProperty(host)){
        return callback(discoveredDevices[host]);
    }
    setTimeout(()=>{
        return getDevice({host:host, count:(count - 1 ),callback:callback});
    },1000);
}

module.exports = getDevice;
