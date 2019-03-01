// pages/commentDetail/commentDetail.js

// 获取小程序实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: false,
    urlPrefix: "",
    goodsId: "",
    // 评价详情列表
    commentDetailList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    this.setData({
      urlPrefix: app.globalData.urlPrefix,
      goodsId: options.goodsId
    });
    var that = this;
    wx.request({
      url: that.data.urlPrefix + 'user/goodsCommentDetail',
      method: "POST",
      data: {
        goodsId: that.data.goodsId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.statusCode == 200){
          // 将时间戳转化为（年-月-日）的格式
          var date = null;
          var year = null;
          var month = null;
          var day = null;
          for (var i in res.data) {
            date = new Date(res.data[i].commentTime);
            year = date.getFullYear() + '-';
            month = (date.getMonth() + 1 < 10 ? '0' +
              (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            day = date.getDate() < 10 ? '0' +
              date.getDate() : date.getDate();
            res.data[i].commentTime = year + month + day;
          }
          //  更新渲染层 
          that.setData({
            commentDetailList: res.data
          });
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log("进入")
  //   var that = this;
  //   setTimeout(function () {
  //     that.setData({
  //       isHideLoadMore: true,
  //       pjDataList: [
  //         {
  //           headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
  //           author: '王五',
  //           add_time: '2018-06-01',
  //           content: '好评好评，真实太好了!'
  //         }
  //       ]
  //     });
  //   }, 100);
  // },
})