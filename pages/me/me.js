// pages/me/me.js

// 获取小程序实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urlPrefix: "",
    userId: "",
    userProfile: "",
    nickname: "",
    balance: ""
  },
  onShow: function () {
    this.setData({
      urlPrefix: app.globalData.urlPrefix
    });
    // 初始化设置数据（用户Id，用户头像网络地址，用户昵称,用户余额）
    var that = this;
    // 获取相应数据
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        });
      },
    });
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
        });
      },
    });
    wx.getStorage({
      key: 'balance',
      success: function (res) {
        that.setData({
          balance: res.data
        });
      },
    });
    // 需要设定延时
    setTimeout(function () {
      if (that.data.userId != '') {
        that.setData({
          userProfile: that.data.urlPrefix +
            'user/userProfile-' + that.data.userId
        });
        wx.request({
          url: that.data.urlPrefix + 'user/userInfo-' + that.data.userId,
          method: "POST",
          header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // 判断服务器是否响应成功
            if (res.statusCode == 200) {
              wx.setStorage({
                key: 'balance',
                data: res.data.userBalance
              });
              wx.getStorage({
                key: 'balance',
                success: function (res) {
                  that.setData({
                    balance: res.data
                  });
                },
              });
            }
          }
        });
      }
    }, 500);
    clearTimeout();
  },
  /**
   * 用户登录
   */
  toLogin: function() {
    // 跳转到登录页
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 用户上传头像
   */
  setUserProfile: function () {
    var that = this;
    // 上传图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {//调用API成功
        // 获取临时本地图片路径
        var imgUrl = res.tempFilePaths;
        // 将头像上传到服务器中
        wx.uploadFile({
          url: that.data.urlPrefix + 'user/uploadUserProfile-' + that.data.userId,
          filePath: imgUrl[0],
          name: 'userProfile',
          header: {
            // 设置参数内容类型为multipart/form-data
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            // 判断服务器返回的状态码是否是200
            if (res.statusCode == 200) {
              wx.showToast({
                title: '上传成功！',
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.setData({
                  userProfile: imgUrl
                });
              }, 500);
              clearTimeout();
            } else {
              wx.showToast({
                title: '上传失败！',
                icon: 'loading',
                duration: 1000
              });
            }
          },
          fail: function () {
            wx.showToast({
              title: '上传失败！',
              icon: 'loading',
              duration: 1000
            });
          }
        });
      }
    });
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
          // 调用地址API
          wx.chooseAddress({
            success: function (res) {
            },
            fail: function (res) {
            }
          });
          // 用户授权
        } else if(res.authSetting['scope.address']){
          wx.chooseAddress({});
        //未授权
        }else{
          wx.showModal({
            title: '提示',
            content: '未授权访问地址，将无法下单。点击“确定”授权！',
            success: function(res) {
              if(res.confirm){
                // 打开地址授权页面
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
    var that = this;
    wx.showModal({
      title: '您确定要退出登录吗？',
      content: '退出之后，您的购物车会被清空以及无法进行购买商品，查看订单等操作',
      showCancel: true,
      success: function (e) {
        // 点击确定
        if (!e.cancel) {
          // 退出登录请求
          wx.request({
            url: that.data.urlPrefix + 'user/userLogout.do',
            method: 'POST',
            data: {
              'userId': that.data.userId
            },
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
              if (res.statusCode == 200 && res.data) {
                // 清空shopId,shopName,shopBalance
                wx.clearStorage();
                that.setData({
                  userId: false
                })
                wx.showToast({
                  title: '退出成功！',
                  icon: 'success',
                  duration: 1000
                });
              } else {
                wx.showToast({
                  title: '退出失败！',
                  icon: 'loading',
                  duration: 1000
                });
              }
            },
            fail: function () {
              wx.showToast({
                title: '退出失败！',
                icon: 'loading',
                duration: 1000
              });
            }
          });
        }
      }
    });
  }
})