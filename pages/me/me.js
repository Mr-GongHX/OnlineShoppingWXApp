// pages/me/me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPic: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
    nickName: "测试用户昵称"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 用户登录
   */
  toLogin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 跳转到我的地址页
   */
  moveToMyAddress: function() {
    wx.getSetting({
      success: function(res){
        if(res.authSetting['scope.address']){
          wx.chooseAddress({
            success: function (res) {
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
            },
            fail: function (res) {
            }
          })
        }else{
          wx.openSetting({});
        }
      }
    });

  }
})