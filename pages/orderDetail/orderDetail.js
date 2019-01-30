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
    address: "北京市海淀区魏公村小学",
    shopName: "苹果旗舰店",
    totalAmount: "2",
    goodsItem: [
      {
        goodsId: "1",
        name: "iPhoneXs Max",
        image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
        price: "6000",
        amount: "1"
      },
      {
        goodsId: "1",
        name: "iPhoneXsMax",
        image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
        price: "3000",
        amount: "3"
      }
    ],
    orderNum: "233243244",
    orderCreateTime: "2019-1-29",
    totalPrice: "12345"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 我的订单页的订单id
    this.data.orderId = options.orderId;
    console.log(this.data.orderId);
    wx.request({
      url: 'http://localhost:8080/orderDetail',
      method: 'POST',
      data: 'orderId=' + this.data.orderId,
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {  // 查询成功
        for(var i = 0; i < red.data.length; i ++){
          console.log(res.data[i]);
        }
        // that.setData({
        //   status: res.data.status,
        //   name: res.data.name,
        //   phone: res.data.phone,
        //   shopName: res.data.shopName,
        //   totalAmount: res.data.totalAmount,
        //   orderNum: res.data.orderNum,
        //   orderCreateTime: res.data.orderCreateTime,
        //   totalPrice: res.data.totalPrice,
        //   goodsItem: []
        // });
      } 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})