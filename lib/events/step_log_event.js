'use strict';
var util = require('util');
var BBPromise = require('bluebird');
var BaseStepLogEvent = require('broker/lib/event_types/step_log_event');
var Keen = require('keen.io');
var config = require('config');
var client = BBPromise.promisifyAll(Keen.configure(config.get('Hoist.keenio')));
var EventLogEvent = function (brokeredMessageOrProperties) {
  BaseStepLogEvent.call(this, brokeredMessageOrProperties);
};



util.inherits(EventLogEvent, BaseStepLogEvent);
console.log(BaseStepLogEvent.QueueName);

EventLogEvent.QueueName = BaseStepLogEvent.QueueName;



EventLogEvent.prototype.process = function (callback) {
  var self = this;
  return BBPromise.try(function () {
    return client.addEventAsync('hoist connect step',self.toJSON());
  }).bind(self)
  .then(function(){
    console.log('sent to keen');
    self.emit('done');
  }).nodeify(callback);
};
module.exports = EventLogEvent;
