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
    unselectedCartItems: [],
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
    var selectedGoods = [];
    var unselectedGoods = [];
    wx.getStorage({
      key: 'cartItems',
      success: function(res) {
        // 已选择的商品
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].selected) {
            selectedGoods.push(res.data[i]);
          }
        }
        // 未选择的商品
        for (var i = 0; i < res.data.length; i++) {
          if (!res.data[i].selected) {
            unselectedGoods.push(res.data[i]);
          }
        }
        // 更新数据
        that.setData({
          cartItems: selectedGoods,
          unselectedCartItems: unselectedGoods
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
    var goodsList = this.data.cartItems;
    goodsList = JSON.stringify(goodsList); 
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
        fail(res) {
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
                // 判断用户余额是否大于等于订单总额
                if (that.data.total <= res.data.userBalance) {
                  // 提交订单
                  wx.request({
                    url: that.data.urlPrefix + 'order/createOrder.do',
                    method: "POST",
                    data: {
                      userId: that.data.userId,
                      cartItems: goodsList.toString(),
                      consigneeName: that.data.userName,
                      consigneeAddress: that.data.userDetailAddress,
                      consigneePhone: that.data.userPhone,
                      orderPrice: that.data.total
                    },
                    header: {
                      //设置参数内容类型为x-www-form-urlencoded
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    success: function (res) {
                      // 判断服务器是否响应成功
                      if (res.statusCode == 200 && res.data) {
                        var cartItems = null;
                        // 清空购物车中已勾选的商品        
                        wx.setStorageSync("cartItems", that.data.unselectedCartItems)
                        wx.showToast({
                          title: '支付成功',
                          icon: 'success',
                          duration: 500
                        });
                        // 跳转到首页
                        setTimeout(function() {
                          wx.switchTab({
                            url: '../index/index',
                          });
                        },500);
                        clearTimeout();
                      }
                    }
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
        },
        success(res) {
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