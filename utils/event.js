let kLoginSuccessEventName = 'kLoginSuccessEventName'    //登录成功的通知


var events = {};

function on(name, self, callback) {
    console.log(events)
    var tuple = [self, callback];
    var callbacks = [];
        callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.splice(name,1)
        callbacks.push(tuple);
    }
    else {
        events[name] = [tuple];
    }
  
}

function remove(name, self) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        events[name] = callbacks.filter((tuple) => {
            return tuple[0] != self;
        })
    }

}

function emit(name, data) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.map((tuple) => {
            var self = tuple[0];
            var callback = tuple[1];
            callback.call(self, data);
        })
    }
}


exports.on = on;
exports.remove = remove;
exports.emit = emit;
exports.kLoginSuccessEventName = kLoginSuccessEventName;