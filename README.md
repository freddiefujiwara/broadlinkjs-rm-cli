[![Build Status](https://travis-ci.org/freddiefujiwara/broadlinkjs-rm-cli.svg?branch=master)](https://travis-ci.org/freddiefujiwara/broadlinkjs-rm-cli)
[![Build status](https://ci.appveyor.com/api/projects/status/a14pxw5roh4jecv2?svg=true)](https://ci.appveyor.com/project/freddiefujiwara/broadlinkjs-rm-cli)
[![CircleCI](https://circleci.com/gh/freddiefujiwara/broadlinkjs-rm-cli.svg?style=svg)](https://circleci.com/gh/freddiefujiwara/broadlinkjs-rm-cli)
[![npm version](https://badge.fury.io/js/broadlinkjs-rm-cli.svg)](https://badge.fury.io/js/broadlinkjs-rm-cli)
[![codecov](https://codecov.io/gh/freddiefujiwara/broadlinkjs-rm-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/freddiefujiwara/broadlinkjs-rm-cli)
[![dependencies Status](https://david-dm.org/freddiefujiwara/broadlinkjs-rm-cli/status.svg)](https://david-dm.org/freddiefujiwara/broadlinkjs-rm-cli)

# broadlinkjs-rm-cli
Command line client for broadlink rm 

## Requirements

 - Node 7.6 or later

## Installation

```bash
npm i -g broadlinkjs-rm-cli
```
## Preparation
$HOME/.broadlinkjs.config.js
```javascript
module.exports = {
    "heat": "[Infrared signal of air conditioner's heating button]",
    "cool": "[Infrared signal of air conditioner's cooling button]",
    "airoff": "[Infrared signal of air conditioner's off button]",
    "tv_on": "[Infrared signal of television power supply]",
    "light": "[Infrared signal of light]"
};
```

## Usage
```bash                                                                                     
  Usage: broadlinkjs-rm-cli <host> <command>                                                                                    
                                                                                                                         
                                                                                                                               
                                                                                                                               
  Options:                                                                                                                     
                                                                                                                               
    -V, --version     output the version number
    -h, --help        output usage information  
```

## Example
```bash
broadlinkjs-rm-cli 192.168.1.101 tv_on
```

## FAQ

[FAQ](https://github.com/freddiefujiwara/broadlinkjs-rm-cli/wiki/FAQ)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/freddiefujiwara/broadlinkjs-rm-cli
