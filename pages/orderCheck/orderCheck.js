// pages/orderCheck/orderCheck.js

// 获取小程序实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPrefix: "",
    addressHasChosen: false,
    userName: "",
    userPhone: "",
    userDetailAddress: "",
    cartItems: [],
    total: "",
    userId: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        });
      },
    })
    this.setData({
      urlPrefix: app.globalData.urlPrefix,
      total: options.orderTotal
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'cartItems',
      success: function(res) {
        that.setData({
          cartItems: res.data
        });
      }
    });

  },
  // 选择地址
  chooseAddress: function () {
    var that = this;
    //判断用户是否授权访问地址权限
    wx.getSetting({
      success: function (res) {
        //用户从未授权
        if (res.authSetting['scope.address'] === undefined) {
          // 调用地址API
          wx.chooseAddress({
            success: function (res) {
            },
            fail: function (res) {
            }
          });
          // 用户授权
        } else if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success: function (res) {
              that.setData({
                userName: res.userName,
                userPhone: res.telNumber,
                userDetailAddress: res.provinceName + 
                  res.cityName + res.countyName + res.detailInfo, 
                addressHasChosen: true
              });
            },
            fail: function (res) {
            }
          });
          //未授权
        } else {
          wx.showModal({
            title: '提示',
            content: '未授权访问地址，将无法下单。点击“确定”授权！',
            success: function (res) {
              if (res.confirm) {
                // 打开地址授权页面
                wx.openSetting({});
              }
            }
          });
        }
      }
    });
  },
  // 订单支付
  orderPay: function () {
    var that = this;
    if (this.data.userName === "" && 
    this.data.userPhone === "" &&
    this.data.userDetailAddress === ""){
      wx.showToast({
        title: '未选择收货地址',
        icon: 'loading',
        duration: 500
      });
    } else {
      // 已选择收货地址
      // 调用指纹或面部验证进行支付
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint','facial'],
        challenge: '123456',
        authContent: '请用指纹解锁',
        success(res) {
          wx.request({
            url: that.data.urlPrefix + 'user/userInfo-' + that.data.userId,
            method: "POST",
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              // 判断服务器是否响应成功
              if (res.statusCode == 200 && res.data) {
                if (that.data.total < res.data.userBalance) {
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 500
                  });
                } else {
                  wx.showToast({
                    title: '您的余额不足',
                    icon: 'loading',
                    duration: 500
                  });
                }
              }
            }
          });
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 500
          });
        },
        fail(res) {
          wx.showToast({
            title: '无法验证',
            icon: 'loading',
            duration: 500
          });
        }
      });
    }
  }
})