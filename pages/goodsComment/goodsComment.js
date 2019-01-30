// pages/goodsComment/goodsComment.js

// 获取小程序实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: "",
    userId: "",
    commentContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = app.globalData.userId
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
  // 获取输入框的值
  commentContent: function (e) {
    this.data.commentContent = e.detail.value;
  },
  // 评论提交
  commentSubmit: function() {
    var that = this;
    if(this.data.commentContent === ""){
      wx.showToast({
        title: '您的评论为空！',
        icon: 'loading',
        duration: 1000
      });
    } else { 
      console.log(this.data.commentContent)
      wx.request({
        url: 'http://localhost:8080/comment',
        data: 'goodsId=' + that.data.goodsId + 'userId=' + that.data.userId,
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
        },
        fail: function(res) { 
          if(true) {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000,
              success: function() {
                setTimeout( function (){             
                  wx.navigateBack({
                    delta: 1
                  });
                },1000);
                clearTimeout();
              }
            })
          }
        }
      });
    }
  }
})