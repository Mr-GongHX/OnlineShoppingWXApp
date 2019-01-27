// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    passwordPrevious: "",
    passwordAfter: ""
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
  // 获取用户名
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取第一次输入密码
  passwordInputPrevious: function (e) {
    this.setData({
      passwordPrevious: e.detail.value
    })
  },
  // 获取第二次输入密码
  passwordInputAfter: function (e) {
    this.setData({
      passwordAfter: e.detail.value
    })
  },
  // 提交FORM表单
  formSubmit: function () {
    // 提示用户
    if(this.data.username === "" || this.data.passwordInputPrevious === "" || this.data.passwordAfter === ""){
      wx.showModal({
        title: "请将信息填写完整!",
        showCancel: false
      });
    } else {
      // 输入判断
      if(this.data.passwordPrevious !== this.data.passwordAfter){
        wx.showModal({
          title: '提示',
          content: '请确认第一次和第二次输入的密码一致',
          showCancel: false
        });
      } else {
        // 成功注册
        wx.showToast({
          title: '注册成功！',
          icon: 'success',
          duration: 1000,
          success: function(){
            // 延时1s跳转
            setTimeout(function () {
              // 返回登录页面进行登录
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
            clearTimeout();
          }
        });
      }
    }


  }

})