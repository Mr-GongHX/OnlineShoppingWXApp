// pages/login/login.js

// 获取小程序实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPrefix: "",
    username: "",
    password: ""
  },
  onLoad: function () {
    this.setData({
      urlPrefix: app.globalData.urlPrefix
    });
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
      var that = this;
      // 发起POST登录请求
      wx.request({
        url: that.data.urlPrefix + 'user/userLogin.do',
        method: 'POST',
        data: {
          'username': encodeURI(that.data.username),
          'password': encodeURI(that.data.password)
        },  
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {  
          // 登录成功         
          if (res.statusCode == 200 && res.data.userId) {
            // 赋值（userId）
            wx.setStorage({
              key: 'userId',
              data: res.data.userId,
            });
            // 赋值（昵称）
            wx.setStorage({
              key: 'nickname',
              data: res.data.userNickname,
            });
            // 赋值（昵称）
            wx.setStorage({
              key: 'balance',
              data: res.data.userBalance,
            });
            // 登录成功提示
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 1000,
              success: function() {
                // 延时1s跳转
                setTimeout(function(){
                  // 跳转到“我的”页面
                  wx.switchTab({
                    url: "../me/me"
                  });
                },1000);
                // 清空计时器
                clearTimeout();
              }
            });     
          } else {
            // 登录失败
            wx.showModal({
              title: '登录失败',
              content: '用户名或密码错误，请重新填写',
              showCancel: false
            });
          }
        },
        fail: function () {  
          // 登录失败
          wx.showToast({
            title: '登录失败！',
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