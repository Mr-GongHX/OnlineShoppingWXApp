// pages/myOrder/myOrder.js

// 获取小程序实例
var app = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 订单列表数据
    list: [
      {
        orderId: "1",
        shopName: "苹果旗舰店",
        status: "0",
        totalAmount: "2",
        totalPrice: "112223",
        isConfirm: false,
        isCancelled: false,
        isConfirmBtnShow: "",
        isCancelBtnShow: "",
        goodsItem: [{
            name: "这里是昵称这里是昵称这里是昵称这里是昵称这里是昵称",
            image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
            price: "56",
            amount: "1"
          },
          {
            name: "这里是昵称这里是昵称这里是昵称这里是昵称这里是昵称",
            image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
            price: "99999",
            amount: "4"
          },
        ]      
      }
    ]
  },
  // 取消订单
  cancelOrder: function () {
    var that = this;
    wx.showToast({
      title: '取消订单成功！',
      icon: 'success',
      duration: 1000,
      success: function () {
        that.setData({
          "list[0].isCancelled": true,
          "list[0].status": "3",
          "list[0].isConfirmBtnShow": "display: none;",
        });
        console.log(that.data.list[0].isConfirm)
        console.log(that.data.list[0].isConfirmBtnShow)
      }
    }); 
  },
  // 确认收货
  confirmReceipt: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/confirmReceive.do',
      method: 'POST',
      data: 'orderId=' + this.data.orderId,
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      fail: function (res) {  // 确认收货成功 
        // 判断服务器返回的状态码是否是200
        if (true) {
          wx.showToast({
            title: '确认收货成功！',
            icon: 'success',
            duration: 1000,
            success: function () {
              that.setData({
                "list[0].isConfirm": true,
                "list[0].status": "2",
                "list[0].isCancelBtnShow": "display: none;"
              });
              console.log(that.data.list[0].isConfirm)
              console.log(that.data.list[0].isCancelBtnShow)
            }
          });          
        }
      }
    });
  },
  // 初始化加载
  onLoad: function () {
    var that = this;
  }
})
