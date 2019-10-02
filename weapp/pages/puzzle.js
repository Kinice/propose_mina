"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  data: {
    nowStatus: 1,
    puzzleList: [{
      title: 'Puzzle 1',
      description: '黄海之滨，以人为名，虽居海滨，不常踏足',
      location: {
        latitude: 37.4797538329,
        longitude: 121.4609599113
      },
      name: '于维弘学术交流中心'
    }, {
      title: 'Puzzle 2',
      description: '又进村里，尽为海风折腰',
      location: {
        latitude: 37.4779573435,
        longitude: 121.4598977566
      },
      name: '小树林'
    }, {
      title: 'Puzzle 3',
      description: '2πr=400m的中央',
      location: {
        latitude: 37.4765993051,
        longitude: 121.4614534378
      },
      name: '体育场'
    }, {
      title: 'Puzzle 4',
      description: '餐饮娱乐洗浴生活中心',
      location: {
        latitude: 37.4731210817,
        longitude: 121.4621776342
      },
      name: '第七餐厅'
    }, {
      title: 'Puzzle 5',
      description: '中轴线中，穹顶之下',
      location: {
        latitude: 37.4720354341,
        longitude: 121.4577680826
      },
      name: '综合楼大门'
    }, {
      title: 'Puzzle 6',
      description: '谁人降白蛇',
      location: {
        latitude: 37.4708220446,
        longitude: 121.4559227228
      },
      name: '法学院与海洋学院'
    }, {
      title: 'Puzzle 7',
      description: '一个永远被叫错名字的交通设施',
      location: {
        latitude: 37.4753221305,
        longitude: 121.4585834742
      },
      name: '三元桥？'
    }, {
      title: 'Puzzle 8',
      description: '高建筑，高精确，高科技',
      location: {
        latitude: 37.4760458655,
        longitude: 121.4571404457
      },
      name: '钟楼'
    }, {
      title: 'Puzzle 9',
      description: '八条路',
      location: {
        latitude: 37.4771910553,
        longitude: 121.4563840628
      },
      name: '八景园'
    }, {
      title: 'Puzzle 10',
      description: '横眉冷对千夫指，',
      location: {
        latitude: 37.4751433243,
        longitude: 121.4547747374
      },
      name: '孺子牛'
    }, {
      title: 'Puzzle 11',
      description: '命运的交叉点',
      location: {
        latitude: 37.4750922367,
        longitude: 121.4536750317
      },
      name: '十字路口'
    }],
    PI: 3.1415926,
    EARTH_RADIUS: 6378137.0,
    distance: 99999,
    maxDiff: 300,
    wrongCount: 0,
    showWrong: false
  },
  methods: {
    imHere: function imHere() {
      var _this = this;

      wx.getLocation({
        type: 'gcj02',
        success: function success(res) {
          _this.location = res;
          _this.distance = _this.getGreatCircleDistance(res.latitude, res.longitude, _this.puzzleList[_this.nowStatus - 1].location.latitude, _this.puzzleList[_this.nowStatus - 1].location.longitude);

          if (_this.distance < _this.maxDiff) {
            if (_this.nowStatus < _this.puzzleList.length) {
              wx.showModal({
                title: '恭喜',
                content: "\u5C31\u662F\u8FD9\u91CC\uFF1A".concat(_this.puzzleList[_this.nowStatus - 1].name, "\uFF0C\u5148\u770B\u7F8E\u666F\u518D\u53BB\u4E0B\u4E00\u5173\u5427\uFF01"),
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    _this.nowStatus += 1;
                    wx.setStorageSync('status', _this.nowStatus);
                  }
                }
              });
            } else {
              wx.showModal({
                title: '恭喜',
                content: '你已经完成游览了，快去领取你的奖品吧！',
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: 'mail'
                    });
                  }
                }
              });
            }
          } else {
            wx.showToast({
              icon: 'none',
              title: '不是这里哦',
              duration: 2500
            });
            _this.wrongCount++;

            if (_this.wrongCount >= 5) {
              _this.showWrong = true;
            }
          }

          console.log(res, _this.distance);
        }
      });
    },
    imWrong: function imWrong() {
      var _this2 = this;

      this.wrongCount = 0;
      this.showWrong = false;

      if (this.nowStatus < this.puzzleList.length) {
        wx.showModal({
          title: '好吧',
          content: "\u662F".concat(this.puzzleList[this.nowStatus - 1].name, "\uFF0C\u4F60\u8BF4\u7684\u5BF9\uD83D\uDE11"),
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              _this2.nowStatus += 1;
              wx.setStorageSync('status', _this2.nowStatus);
            }
          }
        });
      } else {
        wx.showModal({
          title: '恭喜',
          content: '你已经完成游览了，快去领取你的奖品吧！',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: 'mail'
              });
            }
          }
        });
      }
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
    }
  },
  onLoad: function onLoad(e) {
    if (e.status) {
      this.nowStatus = parseInt(e.status);
      wx.setStorageSync('status', this.nowStatus);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'15-38': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.imHere($event)
      })();
    
  }},'15-39': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.imWrong($event)
      })();
    
  }}}, models: {} });