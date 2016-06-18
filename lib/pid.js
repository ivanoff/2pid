/*
 * Pid controller
 */
"use strict";

var fs = require('fs');

module.exports = PidApplication;

function PidApplication(pidFile) {
  this.pidFile = pidFile;
  this.status = 'runned';

  if(!this.pidFile && !process.env.PID_FILE) {
    throw new Error('No pid file provided');
  }

  if(!this.pid()) {
    this.status = 'started';
    fs.writeFileSync(this.pidFile, process.pid);
  }
};

PidApplication.prototype.pid = function() {
  try {
    var stats = fs.statSync(this.pidFile);
    if(!stats.isFile()) throw new Error('Pid file is not a file');
    return fs.readFileSync(this.pidFile).toString();
  } catch(err) {
    if(err.code == 'ENOENT') return null;
    throw new Error(err);
  }
};

PidApplication.prototype.remove = function(options) {
  if(this.status == 'started' || (options && options.force) ) {
    this.status = 'stopped';
    try {
      fs.unlinkSync(this.pidFile);
      return true;
    } catch(err) {
      throw new Error(err);
    }
  }
}
