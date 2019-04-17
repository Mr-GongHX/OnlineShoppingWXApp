// pages/orderDetail/orderDetail.js
// 获取小程序实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPrefix: "",
    orderId: "",
    orderDetail: [],
    goodsId: "",
    goodsImg: "",
    goodsName: "",
    goodsPrice: "",
    goodsQuantity: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      urlPrefix: app.globalData.urlPrefix
    });
    // 我的订单页的订单id
    this.data.orderId = options.orderId;
    wx.request({
      url: that.data.urlPrefix +'order/showMyOrderInfo-' + that.data.orderId ,
      method: 'POST',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {  
        if(res.statusCode == 200) {
          // 将时间戳转化为（年-月-日）的格式
          var date = null;
          var year = null;
          var month = null;
          var day = null;
          var hour = null;
          var minute = null;
          var second = null;
          for (var i in res.data) {
            // 将时间戳转化为（年-月-日 时:分:秒）的格式
            date = new Date(res.data[i].orderCreateTime);
            year = date.getFullYear() + '-';
            month = (date.getMonth() + 1 < 10 ? '0' +
              (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            day = date.getDate() < 10 ? '0' +
              date.getDate() : date.getDate() + '    ';
            hour = (date.getHours() + 1 < 10 ? '0' + 
              (date.getHours() + 1) : date.getHours() + 1) + ':';
            minute = (date.getMinutes() + 1 < 10 ? '0' +
              (date.getMinutes() + 1) : date.getMinutes() + 1)  + ':';
            second = (date.getSeconds() + 1 < 10 ? '0' +
              (date.getSeconds() + 1) : date.getSeconds() + 1);
            res.data[i].orderCreateTime = 
              year + month + day + hour + minute + second;
          }  
          // 更新渲染层
          that.setData({
            orderDetail: res.data,
            goodsId: res.data[0].goodsId,
            goodsImg: res.data[0].goodsImg,
            goodsName: res.data[0].goodsName,
            goodsPrice: res.data[0].goodsPrice,
            goodsQuantity: res.data[0].goodsQuantity
          });
        }
      } 
    });
  }
})