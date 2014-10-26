'use strict';

var EventBroker = require('broker/lib/event_broker');
var EventLogEvent = require('./lib/events/step_log_event');
EventBroker.listen(EventLogEvent).then(function(){
  console.log('listening');
});
