"use strict";

var expect = require('chai').expect;
var fs = require('fs');
var should = require('should');

var Pid = require('../lib/pid');

describe('usual pid using', function() {

  var PID_FILE = '/tmp/2pidtestUsual.pid';
  var pid = new Pid(PID_FILE);

  it('pid at start', function(done) {
    pid.should.exists;
    pid.should.have.property('status');
    pid.should.have.property('remove');
    pid.status.should.equal('started');
    done();
  });

  it('pid file exists', function(done) {
    fs.stat(PID_FILE, function(err, stat) {
      should.not.exist(err);
      should.exist(stat);
      stat.should.have.property('size');
      done();
    })
  });

  it('pid exists and have all properies', function(done) {
    pid.should.exists;
    pid.should.have.property('status');
    pid.should.have.property('remove');
    done();
  });

  it('pid should be in started status', function(done) {
    pid.status.should.equal('started');
    done();
  });

  it('try to remove pid', function(done) {
    pid.remove();
    pid.status.should.equal('stopped');
    done();
  });

  it('pid should be in stopped status', function(done) {
    pid.status.should.equal('stopped');
    done();
  });

  it('pid file not exists', function(done) {
    fs.stat(PID_FILE, function(err, stat) {
      should.exist(err);
      should.not.exist(stat);
      err.should.have.property('code');
      err.code.should.equal('ENOENT');
      done();
    })
  });

});
