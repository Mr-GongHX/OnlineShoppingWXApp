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
        goodsItem: [{
            goodsId: "1",
            name: "iPhoneXs Max",
            image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
            price: "56",
            amount: "1"
          },
          {
            goodsId: "1",
            name: "iPhoneXs Max",
            image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
            price: "99999",
            amount: "4"
          },
        ]      
      },
      {
        orderId: "2",
        shopName: "旗舰店",
        status: "1",
        totalAmount: "3",
        totalPrice: "43434",
        isConfirm: false,
        isCancelled: false,
        goodsItem: [{
          goodsId: "1",
          name: "iPhoneXseer Max",
          image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
          price: "56",
          amount: "1"
        },
        {
          goodsId: "1",
          name: "iPhoneXserrew Max",
          image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
          price: "99999",
          amount: "4"
        },
        ]
      }
    ]
  },
  // 取消订单
  // cancelOrder: function () {
  //   var that = this;
  //   for(var i = 0; i < this.data.list.length; i ++){
  //     var isCancelledIndex = "list[" + i + "].isCancelled";
  //     var statusIndex = "list[" + i + "].status";
  //     console.log(isCancelledIndex);
  //     console.log(statusIndex)
  //     if(this.data.list[i].status == 0){
  //       // 卖家未发货，可取消订单
  //       wx.showToast({
  //         title: '取消订单成功！',
  //         icon: 'success',
  //         duration: 1000,
  //         success: function () {
  //           that.setData({
  //             [isCancelledIndex]: true,
  //             [statusIndex]: "3"
  //           });
  //         }
  //       }); 
  //     } else {
  //       // 卖家已发货或用户已收货或订单异常，不可取消订单
  //       var that = this;
  //       wx.showModal({
  //         title: '不可取消订单',
  //         content: '卖家已发货或您已确认收货',
  //         showCancel: false
  //       }); 
  //     }
  //   }
  // },
  // 确认收货
  // confirmReceipt: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'http://localhost:8080/confirmReceive.do',
  //     method: 'POST',
  //     data: 'orderId=' + this.data.orderId,
  //     header: {
  //       //设置参数内容类型为x-www-form-urlencoded
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json'
  //     },
  //     fail: function (res) {  // 确认收货成功 
  //       // 判断服务器返回的状态码是否是200
  //       if (true) {
  //         wx.showToast({
  //           title: '确认收货成功！',
  //           icon: 'success',
  //           duration: 1000,
  //           success: function () {
  //             that.setData({
  //               "list[0].isConfirm": true,
  //               "list[0].status": "2"
  //             });
  //             console.log(that.data.list[0].isConfirm)
  //             console.log(that.data.list[0].isCancelBtnShow)
  //           }
  //         });          
  //       }
  //     }
  //   });
  // },
  // 初始化加载
  onLoad: function () {
    var that = this;
  }
})
