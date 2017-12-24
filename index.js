#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const pkg = require('./package');
const rmlist = require(path.join(require('os').homedir(),".broadlinkjs.config"));

let hostValue = undefined;
let commandValue = undefined;

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('broadlinkjs-rm-cli <host> <command>')
    .arguments('<host> <command>')
    .action(function(host,command){
        hostValue = host;
        commandValue = command;
    });
program.parse(process.argv);
if(typeof hostValue === 'undefined' || typeof commandValue === 'undefined'){
    console.error(program.usage());
    process.exit(1);
}

let BroadlinkjsRmCli = require('./lib/broadlinkjs-rm-cli');
let brc = new BroadlinkjsRmCli();
const timer = setInterval(function() {
    brc.run(hostValue ,function(device){
        if(device && rmlist[commandValue]){
            console.log(`command %s -> Device %s(%s)`,commandValue,device.host.address,device.host.macAddress);
            const hexDataBuffer = new Buffer(rmlist[commandValue], "hex")
            device.sendData(hexDataBuffer)
        }
        clearInterval(timer)
        setTimeout(function(){
            process.exit(0);
        },0);
    })
}, 100)
