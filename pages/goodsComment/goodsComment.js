// pages/goodsComment/goodsComment.js
// 获取小程序实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPrefix: "",
    userId: "",
    goodsId: "",
    goodsImg: "",
    goodsName: "",
    goodsQuantity: "",
    goodsPrice: "",
    commentContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取用户id
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        });
      }
    });
    this.setData({
      urlPrefix: app.globalData.urlPrefix,
      goodsId: options.goodsId,
      goodsImg: options.goodsImg,
      goodsName: options.goodsName,
      goodsQuantity: options.goodsQuantity,
      goodsPrice: options.goodsPrice
    });
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
      wx.request({
        url: that.data.urlPrefix +  'comment/commentGoods',
        data: {
          goodsId: that.data.goodsId,
          userId: that.data.userId,
          commentContent: that.data.commentContent
        },
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function(res) { 
          // 判断服务器状态码是否为200
          if(res.statusCode == 200 && res.data) {
            // 提示成功弹窗
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000,
              success: function() {
                // 延迟1秒跳转到订单详情页
                setTimeout( function (){             
                  wx.navigateBack({
                    delta: 1
                  });
                },1000);
                clearTimeout();
              }
            });
          }
        },
        fail: function() {
          wx.showToast({
            title: '提交失败！',
            icon: 'loading',
            duration: 1000,
            success: function () {
            }
          });
        }
      });
    }
  }
})