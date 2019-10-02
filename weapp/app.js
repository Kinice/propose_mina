"use strict";

var _core = _interopRequireDefault(require('vendor.js')(0));

var _eventHub = _interopRequireDefault(require('common/eventHub.js'));

var _x = _interopRequireDefault(require('vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].use(_x["default"]);

_core["default"].app({
  hooks: {
    // App 级别 hook，对整个 App 生效
    // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
    'before-setData': function beforeSetData(dirty) {
      return dirty;
    }
  },
  globalData: {
    userInfo: null
  },
  onLaunch: function onLaunch() {
    _eventHub["default"].$on('app-launch', function () {
      console.log('app-launch event emitted, the params are:');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args);
    });

    Promise.prototype["finally"] = function (callback) {
      var P = this.constructor;
      return this.then(function (value) {
        return P.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return P.resolve(callback()).then(function () {
          throw reason;
        });
      });
    };
  }
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} });