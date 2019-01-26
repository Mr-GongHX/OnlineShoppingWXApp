// pages/productInfo/productInfo.js
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
    goods_info: { 
      goods_id: 1, 
      goods_title: "苹果iPhoneXs Max 256GB 玫瑰金", 
      goods_price: '9999.99', 
      goods_yunfei: 0, 
      goods_kucun: 100, 
      goods_xiaoliang: 1, 
      goods_shopName:"苹果旗舰店",
      content: "商品介绍详情啦啦啦啦啦啦啦啦啦阿拉"
    },
    goods_img: [
      { 'img': 'https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg' },
      { 'img': 'https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg' },
      { 'img': 'https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg' },
      { 'img': 'https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg' },
    ],
    pjDataList: [
      { 
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg', 
        author: '张三', 
        add_time: '2018-06-01', 
        content: '好评好评，真实太好了!' 
      },
      { 
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg', 
        author: '张三', 
        add_time: '2018-06-01',
        content: '好评好评，真实太好了!' 
      }
    ],//评价数据
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
  }
})
