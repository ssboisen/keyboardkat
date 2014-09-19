(function(name, definition, context) {
  if (typeof module != 'undefined') module.exports = definition(context.Mousetrap);
  else if (typeof define == 'function' && typeof define.amd == 'object') define(name, ['Mousetrap'], definition);
  else context[name] = definition(context.Mousetrap);

  delete context.Mousetrap;
})('KeyboardKat', function(Mousetrap) {

  function isAction(flap) {
    return flap === 'keypress' || flap === 'keydown' || flap === 'keyup';
  }

  function makeCallbackId(serializedKeys, flap, nonce) {
    return [serializedKeys,flap,nonce].join(':');
  }

  var callbackStore = { };
  var currentFlap = 'all';
  var callbackCounter = 0;

  var KeyboardKat = {

    // bind(keys, [, flap][, action], callback)
    bind: function (keys, flap, action, callback) {
      if(!keys || keys.length === 0) throw new Error("bind must be called with keys");
      keys = keys instanceof Array ? keys : [keys];

      if(action instanceof Function && isAction(flap)) {
        callback = action;
        action = flap;
        flap = undefined
      } else if(action instanceof Function) {
        callback = action;
        action = undefined;
      } else if(flap instanceof Function) {
        callback = flap;
        flap = undefined;
      }

      if(!(callback instanceof Function)) throw new Error("callback must be an instance of Function");

      if (!flap) {
        flap = 'all'
      }

      var serializedKeys = keys.join(',');
      var callbackId = makeCallbackId(serializedKeys, flap, callbackCounter++);

      callbackStore[serializedKeys] = callbackStore[serializedKeys] || [];
      callbackStore[serializedKeys].push({ callback: callback, flap: flap, id: callbackId });

      Mousetrap.bind(keys, function () {
        var callbacks = callbackStore[serializedKeys];
        var args = arguments;

        if(callbacks) {
          var flap = currentFlap;
          var returnValue = undefined;
          callbacks.forEach(function (cbInfo) {
            if(cbInfo.flap === flap || cbInfo.flap === 'all') {
              var res = cbInfo.callback.apply(null, args);
              if(res === false) returnValue = false;
            }
          });

          return returnValue;
        }
      }, action);

      return function () {
        callbackStore[serializedKeys] = callbackStore[serializedKeys].filter(function (cbInfo) { return cbInfo.id !== callbackId; });
      };
    },

    bindGlobal: function (keys, flap, action, callback) {
      var unsubscribeFunc = this.bind(keys, flap, action, callback);
      callback = [flap, action, callback].filter(function (v) { return v instanceof Function; })[0];
      action = [flap, action].filter(function (v) { return isAction(v); })[0];

      Mousetrap.bindGlobal(keys, callback, action);

      return unsubscribeFunc;
    },

    // unbind(keys[, flap]])
    unbind: function (keys, flap) {
      if(!keys || keys.length === 0) throw new Error("unbind must be called with keys");
      keys = keys instanceof Array ? keys : [keys];

      if(!flap) flap = 'all';

      var serializedKeys = keys.join(',');

      if(callbackStore[serializedKeys]) {
        var callbacks = callbackStore[serializedKeys] = callbackStore[serializedKeys].filter(function (cbInfo) { return cbInfo.flap !== flap; });

        if(callbacks.length === 0) {
          Mousetrap.unbind(keys);
        }
      }
    },

    // useFlap([flap])
    useFlap: function (flap) {
      currentFlap = flap ? flap : 'all';
    },

    trigger: function () {
      Mousetrap.trigger.apply(Mousetrap, arguments);
    },

    reset: function () {
      callbackStore = {};
      Mousetrap.reset();
    }
  };

  Object.defineProperty(KeyboardKat, "stopCallback", {
    set: function (fn) { Mousetrap.stopCallback = fn; }
  });

  return KeyboardKat;
}, this);
