// pages/login/login.js

// 获取小程序实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
      // console.log(app.globalData.nickname);
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
  // 获取用户名
  usernameInput: function(e) {
    this.setData({
      username : e.detail.value
    })
  },
  // 获取密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // FORM表单提交（登录）
  formSubmit: function(e) {
    // 提示用户
    if(this.data.username === "" || this.data.password === ""){
      wx.showModal({
        title: "用户名与密码不能为空!",
        showCancel: false
      })
    // 成功输入
    } else {
      // 发起POST登录请求
      wx.request({
        url: 'http://localhost:8080/userLogin.do',
        method: 'POST',
        data: 'username='+this.data.username+'&password='+this.data.password, 
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {  // 登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });
          // 赋值（昵称）
          app.globalData.nickname = res.data.nickname;
          // 赋值（用户头像）
          app.globalData.userProfile = res.data.userProfile;
          // 赋值（userId）
          app.globalData.userId = res.data.userId;
          // 修改登录状态 isLogin 为 true
          app.globalData.isLogin = true;
          // 跳转到“我的”页面
          wx.switchTab({
            url: "../me/me"
          });
        },
        fail: function () {  // 登录失败
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 1000
          });
        }
      });
    }
  },
  // 跳转注册页面
  register: function() {
    wx.navigateTo({
      url: "../register/register",
    })
  }
})