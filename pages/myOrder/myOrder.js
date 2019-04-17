// pages/myOrder/myOrder.js
// 获取小程序实例
var app = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    urlPrefix: "",
    userId: "",
    // 订单列表数据
    orderList: []
  },
  // 初始化加载
  onShow: function () {
    this.setData({
      urlPrefix: app.globalData.urlPrefix
    });
    var that = this;
    // 获取用户id
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        });
      }
    });
    // 需要设定延时
    setTimeout(function() { 
      // 发起查询用户订单请求
      wx.request({
        url: that.data.urlPrefix + 'order/showMyOrder-' + that.data.userId,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.statusCode == 200) {
            that.setData({
              orderList: res.data
            });
          }
        }
      });
    }, 500);
    clearTimeout();
  }
})
