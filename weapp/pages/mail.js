"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  data: {
    days: 0,
    statusList: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false
    }
  },
  methods: {
    loginFadeIn: function loginFadeIn() {
      var _this = this;

      var _loop = function _loop(i) {
        setTimeout(function () {
          _this.statusList[i] = true;
        }, (i + 1) * 200);
      };

      for (var i in this.statusList) {
        _loop(i);
      }
    }
  },
  onLoad: function onLoad(e) {
    var oldDay = +new Date('2013/06/08');
    var now = +new Date();
    this.days = parseInt((now - oldDay) / 1000 / 3600 / 24);
    this.loginFadeIn();
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {} }, {info: {"components":{},"on":{}}, handlers: {}, models: {} });