// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "1",
    status: "0",
    name: "张三",
    phone: "184889541656",
    address: "北京市海淀区完全户外活发货覅回复",
    shopName: "苹果旗舰店",
    amount: "2",
    goodsItem: [
      {
        name: "iPhoneXs Max",
        image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
        price: "6000",
        amount: "1"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 我的订单页的订单id
    this.data.orderId = options.orderId;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})