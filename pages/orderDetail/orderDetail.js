// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    status: "",
    name: "",
    phone: "",
    address: "",
    shopName: "",
    goodsItem: [
      {
        name: "",
        iamge: "",
        price: "",
        amount: ""
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