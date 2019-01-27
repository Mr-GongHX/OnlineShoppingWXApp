// pages/me/me.js

// 获取小程序实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userId: "",
    userProfile: "",
    nickName: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      isLogin : app.globalData.isLogin,
      userId : app.globalData.userId,
      userProfile : app.globalData.userProfile,
      nickName : app.globalData.nickName
    });
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
    //判断用户是否授权访问地址权限
    wx.getSetting({
      success: function(res){
        //用户从未授权
        if(res.authSetting['scope.address'] === undefined){
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
          });
          // 用户授权
        } else if(res.authSetting['scope.address']){
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
          });
        //未授权
        }else{
          wx.showModal({
            title: '提示',
            content: '未授权访问地址，将无法下单。点击“确定”授权！',
            success: function(res) {
              if(res.confirm){
                wx.openSetting({});
              }
            }
          })
        }
      }
    });
  },
  // 退出登录
  logout: function () {
    app.globalData.isLogin = false;
    app.globalData.userId = "";
    app.globalData.userProfile = "";
    app.globalData.nickName = "";
    this.setData({
      isLogin: app.globalData.isLogin,
      userId: app.globalData.userId,
      userProfile: app.globalData.userProfile,
      nickName: app.globalData.nickName
    });
  }
})