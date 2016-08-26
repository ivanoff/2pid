# 2pid

v.1.0.1

Working with PID file


## Install

`npm --save install 2pid`


## Usage Example

`cat index.js`

```javascript
var Pid = require('2pid');

var PID_FILE = '/tmp/myapp.pid';
var pid = new Pid(PID_FILE);

if(pid.status == 'runned') {
  throw new Error('application already running');
}

console.log(pid.status); //started

pid.remove();

console.log(pid.status); //stopped
```


## Change Log
[all changes](CHANGELOG.md)

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
