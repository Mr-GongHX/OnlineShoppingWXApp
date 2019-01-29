// pages/myOrder/myOrder.js

// 获取小程序实例
var app = getApp();

Page({
  /**
   * 页面初始数据
   */
  data: {
    // 订单列表数据
    list: [{
      orderId: "1",
      shopName: "苹果旗舰店",
      status: "已发货",
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
      ],
      totalAmount: "2",
      totalPrice: "112223",
    },
      {
        orderId: "3",
        shopName: "苹果旗舰店",
        status: "已发货",
        goodsItem: [{
          name: "这里是昵称这里是昵称这里是昵称这里是昵称这里是昵称",
          image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
          price: "56",
          amount: "4"
        },
        {
          name: "这里是昵称这里是昵称这里是昵称这里是昵称这里是昵称",
          image: "https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg",
          price: "99999",
          amount: "4"
        },
        ],
        totalAmount: "2",
        totalPrice: "112",
      }],
  },
  // 确认收货
  confirmReceipt: function () {
    console.log("qwer")
  },
  // 初始化加载
  onLoad: function () {
    var that = this;
  }
})
