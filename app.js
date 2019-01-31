//app.js
App({
  onLaunch: function () {
    wx.login({
      timeout: 10000,
      success: (res) =>{
        console.log(res.code);
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration:1000
        });
      },
      fail: () =>{
        wx.showToast({
          title: '登录失败',
          icon: 'loading',
          duration: 1000
        });
      }
    });
  },
  globalData: {
    isLogin: true,
    userId: "1",
    nickName: "用户昵称测试数据",
    userProfile: ""
  }
})