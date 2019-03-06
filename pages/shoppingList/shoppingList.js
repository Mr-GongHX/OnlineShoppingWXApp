// pages/shoppingList/shoppingList.js

Page({
  data: {
    // 购物车列表
    cartItems: [],
    total: 0,
    CheckAll: true
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'cartItems',
      success: function (res) {
        that.setData({
          cartItems: res.data
        });
      },
    });
    this.getsumTotal()
  },
  //选择
  select: function (e) {
    var CheckAll = this.data.CheckAll;
    CheckAll = !CheckAll
    var cartItems = this.data.cartItems
    for (var i = 0; i < cartItems.length; i++) {
      cartItems[i].selected = CheckAll
    }
    this.setData({
      cartItems: cartItems,
      CheckAll: CheckAll
    })
    this.getsumTotal()
  },
  // 增加商品数量
  add: function (e) {
    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var value = cartItems[index].goodsQuantity  //获取购物车里面的value值
    value++;
    cartItems[index].goodsQuantity = value;
    this.setData({
      cartItems: cartItems
    });
    this.getsumTotal()
    //存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  // 减少商品数量
  reduce: function (e) {
    var cartItems = this.data.cartItems  //获取购物车列表
    var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
    var value = cartItems[index].goodsQuantity  //获取购物车里面的value值
    if (value == 1) {
      wx.showToast({
        title: "不能再少了！",
        icon: "loading",
        duration: 500
      })
      value--;
      cartItems[index].goodsQuantity = 1
    } else {
      value--;
      cartItems[index].goodsQuantity = value;
    }
    this.setData({
      cartItems: cartItems
    });
    this.getsumTotal()
    //存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  // 选择
  selectedCart: function (e) {

    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
    var selected = cartItems[index].selected;    //获取购物车里面的value值

    //取反
    cartItems[index].selected = !selected;
    this.setData({
      cartItems: cartItems
    })
    this.getsumTotal();
    wx.setStorageSync("cartItems", cartItems)
  },
  //删除商品
  deleteGoods: function (e) {
    var that = this;
    wx.showModal({
      title: '确定要删除吗？',
      showCancel: true,
      success: function (res) {
        // 用户点击确定
        if(!res.cancel){
          var cartItems = that.data.cartItems  //获取购物车列表
          var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
          cartItems.splice(index, 1)
          that.setData({
            cartItems: cartItems
          });
          if (cartItems.length) {
            that.setData({
              cartList: false
            });
          }
          that.getsumTotal()
          wx.setStorageSync("cartItems", cartItems);      
        }
      },     
    });
  },
  // 跳转确认订单页
  go: function (e) {
    this.setData({
      cartItems: []
    })
    wx.setStorageSync("cartItems", [])
    wx.navigateTo({
      url: '../orderCheck/orderCheck',
    });
  },
  //合计
  getsumTotal: function () {
    var sum = 0
    for (var i = 0; i < this.data.cartItems.length; i++) {
      if (this.data.cartItems[i].selected) {
        sum += this.data.cartItems[i].value * this.data.cartItems[i].price
      }
    }
    //更新数据
    this.setData({
      total: sum
    })
  }
})