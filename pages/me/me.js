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
    // 初始化设置数据（是否登录，用户Id，用户头像网络地址，用户昵称）
    this.setData({
      isLogin : app.globalData.isLogin,
      userId : app.globalData.userId,
      userProfile : app.globalData.userProfile,
      nickName : app.globalData.nickName
    });
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
          url: 'http://localhost:8080/uploadUserProfile.do',
          filePath: imgUrl[0],
          name: 'userProfile',
          header: {
            // 设置参数内容类型为multipart/form-data
            'content-type': 'multipart/form-data'
          },
          formData : {
            // 设置传递参数(用户id)
            'userId' : app.globalData.userId
          },
          success: function (res) {
            // 判断服务器返回的状态码是否是200
            if(res.statusCode != 200) {
              wx.showToast({
                title: '上传失败！',
                icon: 'loading',
                duration: 1000
              });
            } else {
              wx.showToast({
                title: '上传成功！',
                icon: 'success',
                duration: 1000
              });
              that.setData({
                userProfile: imgUrl
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
    wx.request({
      url: 'http://localhost:8080/userLogout.do',
      method: 'POST',
      data: 'userId=' + app.globalData.userId,
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        if(res.statusCode == 200) {
          wx.showToast({
            title: '退出成功！',
            icon: 'success',
            duration: 1000
          });
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
})