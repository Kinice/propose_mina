"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  data: {
    userInfo: {
      nickName: '用户'
    },
    isLogin: false,
    hasLocationAuth: false,
    location: {},
    workLocation: {
      latitude: 39.9859412184,
      longitude: 116.4786708355
    },
    PI: 3.1415926,
    EARTH_RADIUS: 6378137.0,
    distance: 99999,
    maxDiff: 200,
    statusList: {
      list1: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      list2: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }
    }
  },
  methods: {
    loginFadeIn: function loginFadeIn(index) {
      var _this = this;

      var _loop = function _loop(i) {
        setTimeout(function () {
          _this.statusList[index][i] = true;
        }, (i + 1) * 160);
      };

      for (var i in this.statusList[index]) {
        _loop(i);
      }
    },
    onGotUserInfo: function onGotUserInfo(e) {
      var _this2 = this;

      if (e.$wx.detail.userInfo) {
        this.userInfo = e.$wx.detail.userInfo;
        this.isLogin = true;
        this.loginFadeIn('list1');
      } else {
        wx.showModal({
          title: '提示',
          content: '需要授权才可以使用，请重新授权',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              _this2.isLogin = false;
            }
          }
        });
      }
    },
    getLocationAuth: function getLocationAuth() {
      var _this3 = this;

      wx.authorize({
        scope: 'scope.userLocation',
        success: function success(res) {
          _this3.hasLocationAuth = true;

          _this3.loginFadeIn('list2');
        }
      });
    },
    getLocation: function getLocation() {
      var _this4 = this;

      if (!this.hasLocationAuth) return;
      wx.getLocation({
        type: 'gcj02',
        success: function success(res) {
          console.log(res);
          _this4.location = res;
          _this4.distance = _this4.getGreatCircleDistance(res.latitude, res.longitude, _this4.workLocation.latitude, _this4.workLocation.longitude);
          wx.openLocation({
            latitude: 39.9859412184,
            longitude: 116.4786708355,
            scale: 18
          });
        }
      });
    },
    chooseLocation: function chooseLocation() {
      if (!this.hasLocationAuth) return;
      wx.chooseLocation({
        success: function success(res) {
          console.log(res);
        }
      });
    },
    getRad: function getRad(d) {
      return d * this.PI / 180.0;
    },
    getGreatCircleDistance: function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = this.getRad(lat1);
      var radLat2 = this.getRad(lat2);
      var a = radLat1 - radLat2;
      var b = this.getRad(lng1) - this.getRad(lng2);
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * this.EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000.0;
      return s;
    },
    goPuzzle: function goPuzzle(status) {
      wx.redirectTo({
        url: "puzzle?status=".concat(status)
      });
    }
  },
  created: function created() {
    var _this5 = this;

    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function success(res) {
              _this5.userInfo = res.userInfo;
              _this5.isLogin = true;

              _this5.loginFadeIn('list1');
            }
          });
        }

        if (res.authSetting['scope.userLocation']) {
          _this5.hasLocationAuth = true;
        }
      }
    });
    var status = wx.getStorageSync('status');

    if (status) {
      this.goPuzzle(status);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'5-12': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getLocationAuth($event)
      })();
    
  }},'5-13': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.goPuzzle(1)
      })();
    
  }},'5-14': {"getuserinfo": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGotUserInfo($event)
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'5-12': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getLocationAuth($event)
      })();
    
  }},'5-13': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.goPuzzle(1)
      })();
    
  }},'5-14': {"getuserinfo": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGotUserInfo($event)
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'5-12': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getLocationAuth($event)
      })();
    
  }},'5-13': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.goPuzzle(1)
      })();
    
  }},'5-14': {"getuserinfo": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGotUserInfo($event)
      })();
    
  }}}, models: {} });