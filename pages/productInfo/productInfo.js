// pages/productInfo/productInfo.js

// 获取小程序实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imghref: "",
    goodsId: "",
    urlPrefix: "",
    // 商品详情,评价
    goodsInfo: [],
  },
  // 预览商品图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist     // 需要预览的图片http链接列表  
    })
  },
  // 跳转评价详情
  moveToCommentDetail: function() {
    wx.navigateTo({
      url: "../commentDetail/commentDetail?id={{goods_id}}"
    })
  },
  // 跳转到购物车
  moveToCar: function() {
    wx.switchTab({
      url: '../shoppingList/shoppingList',
    })
  },
  // 加入购物车
  addCar: function() {
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000,
      mask: true,
      success: function() { //添加成功回调
        
      }
    })
  },
  // 立即购买
  buyNow: function() {
    wx.navigateTo({
      url: "../orderCheck/orderCheck"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      goodsId: options.goodsId,
      urlPrefix: app.globalData.urlPrefix
    });
    // 根据商品id查找商品详情
    wx.request({
      url: that.data.urlPrefix + 'user/goodsInfo',
      method: "POST",
      data: {
        goodsId: that.data.goodsId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            goodsInfo: res.data
          });
        }
        // 将时间戳转化为（年-月-日）的格式
        var date = null;
        var year = null;
        var month = null;
        var day = null;
        for(var i = 0; i< res.data.length; i ++){
          date = new Date(res.data[i].commentTime);
          year = date.getFullYear() + '-';
          month = (date.getMonth() + 1 < 10 ? '0' +
            (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          day = date.getDate() < 10 ? '0' +
            date.getDate() : date.getDate();
          res.data[i].commentTime = year + month + day;
        }  
        //  更新渲染出=层 
        that.setData({
          goodsInfo: res.data
        })

      }
    });
  },
  onShow: function () {   
    
  }
})
