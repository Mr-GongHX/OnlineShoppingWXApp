// 获取小程序实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName: "",
    urlPrefix: "",
    // 搜索商品列表
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      searchName: options.searchName,
      urlPrefix: app.globalData.urlPrefix
    });
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: "搜索 - " + that.data.searchName
    });
  },
  onShow: function () {
    var that = this;
    // 搜索商品请求
    wx.request({
      url: that.data.urlPrefix + 
      'user/searchGoods-' + that.data.searchName,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data) {
          that.setData({
            goodsList: res.data
          });
        }
      }
    });
  }
})