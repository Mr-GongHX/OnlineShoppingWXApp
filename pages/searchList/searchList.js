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
        if (res.statusCode == 200) {
          that.setData({
            goodsList: res.data
          });
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   var that = this;
  //   setTimeout(function () {
  //     that.setData({
  //       isHideLoadMore: true,
  //       dataList: [
  //         {
  //           goods_id: 10,
  //           goods_title: '商品标题5',
  //           goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
  //           goods_store: '三星旗舰店',
  //           goods_price: '110'        
  //         }
  //       ]
  //     });
  //   }, 100);
  // }
})