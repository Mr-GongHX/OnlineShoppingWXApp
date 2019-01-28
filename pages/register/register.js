// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    passwordPrevious: "",
    passwordAfter: "",
    nickname: "",
    isUsernameDuplicate: true
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
  // 获取昵称
  nicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // 提交FORM表单
  formSubmit: function () {
    // 1.提示用户(输入信息均不能为空)
    if(this.data.username === "" || 
      this.data.passwordInputPrevious === "" || 
      this.data.passwordAfter === "" || 
      this.data.nickname === ""){
        wx.showModal({
          title: "请将信息填写完整!",
          showCancel: false
        });
    } else {
      // 输入密码判断是否一致
      if(this.data.passwordPrevious !== this.data.passwordAfter){
        wx.showModal({
          title: '提示',
          content: '请确认第一次和第二次输入的密码一致',
          showCancel: false
        });
      } else {
        // 发起POST查询用户名是否重复请求
        wx.request({
          url: 'http://localhost:8080/checkUsernameDuplicate.do',
          method: 'POST',
          data: 'username=' + this.data.username,
          header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            // 将返回用户名是否重复的结果（true/false）
            this.data.isUsernameDuplicate = res.data.isUsernameDuplicate;
          },
          fail: function() {
            wx.showToast({
              title: '请稍后再试！',
              icon: 'loading',
              duration: 1000,
            });
          }         
        });
        
        // 判断用户名是否重复
        if(this.data.isUsernameDuplicate) {
          wx.showToast({
            title: '用户名重复！',
            icon: 'loading',
            duration: 1000,
          });
        } else {
          // 发起POST注册请求
          wx.request({
            url: 'http://localhost:8080/userRegister.do',
            method: 'POST',
            data: 'username=' + this.data.username + 
            '&password=' + this.data.passwordAfter + 
            '&nickname=' + this.data.nickname,
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              if(res.statusCode == 200) {
                // 成功注册
                wx.showToast({
                  title: '注册成功！',
                  icon: 'success',
                  duration: 1000,
                  success: function () {
                    // 延时1s跳转
                    setTimeout(function () {
                      // 返回登录页面进行登录
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000);
                    // 清空计时器
                    clearTimeout();
                  }
                });
              } else {
                wx.showToast({
                  title: '注册失败！',
                  icon: 'loading',
                  duration: 1000
                });
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '注册失败！',
                icon: 'loading',
                duration: 1000
              });
            }
          });
        }      
      }
    }
  }
})