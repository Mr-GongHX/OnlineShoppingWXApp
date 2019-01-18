// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage:{},
    nickname:{},
    code:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            successfunction(res) {
              if (res.statusCode == 200) {
                console.log("获取到的openid为：" + res.data);
                that.userImage = res.data.userImage;
                that.nickname = res.data.nickname;
                wx.setStorageSync('openid', res.data);
              } else {
                console.log(res.errMsg);
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })
  }
})