// pages/shoppingList/shoppingList.js

Page({
  data: {
    // 购物车列表
    cartItems: [],
    // 商品总额
    total: 0,
    // 是否全选
    checkAll: true
  },
  /**
   * 页面唤起时触发
   */
  onShow: function () {
    var that = this;
    // 获取购物车缓存
    wx.getStorage({
      key: 'cartItems',
      success: function (res) {
        that.setData({
          cartItems: res.data
        });
      },
      fail: function (res) {
        that.setData({
          cartItems: []
        });
      }
    });
    // 商品总额
    this.getsumTotal();
  },
  /**
   * 全选
   */
  selectAll: function (e) {
    var checkAll = this.data.checkAll;
    // 取反
    checkAll = !checkAll;
    var cartItems = this.data.cartItems;
    // 遍历购物车列表
    for (var i = 0; i < cartItems.length; i++) {
      cartItems[i].selected = checkAll;
    }
    // 更新界面
    this.setData({
      cartItems: cartItems,
      checkAll: checkAll
    })
    // 商品总额
    this.getsumTotal();
    // 异步存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  /**
   * 增加商品数量
   */
  add: function (e) {
    //获取购物车列表
    var cartItems = this.data.cartItems;
    //获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;
    //获取购物车里面的value值
    var value = cartItems[index].goodsQuantity;  
    value++;
    cartItems[index].goodsQuantity = value;
    // 更新界面
    this.setData({
      cartItems: cartItems
    });
    // 商品总额
    this.getsumTotal();
    // 异步存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  /**
   * 减少商品数量
   */
  reduce: function (e) {
    var cartItems = this.data.cartItems;  //获取购物车列表
    var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
    var value = cartItems[index].goodsQuantity;  //获取购物车里面的value值
    if (value == 1) {
      wx.showToast({
        title: "不能再少了！",
        icon: "loading",
        duration: 500
      });
      value--;
      cartItems[index].goodsQuantity = 1;
    } else {
      value--;
      cartItems[index].goodsQuantity = value;
    }
    // 更新界面
    this.setData({
      cartItems: cartItems
    });
    // 商品总额
    this.getsumTotal();
    // 异步存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  /**
   * 勾选商品
   */
  selectedCart: function (e) {
    //获取购物车列表
    var cartItems = this.data.cartItems;   
    //获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;  
    //获取购物车里面的value值
    var selected = cartItems[index].selected;    
    //取反
    cartItems[index].selected = !selected;
    // 更新界面
    this.setData({
      cartItems: cartItems
    })
    // 商品总额
    this.getsumTotal();
    // 异步存缓存
    wx.setStorageSync("cartItems", cartItems);
  },
  /**
   * 删除商品
   */
  deleteGoods: function (e) {
    var that = this;
    wx.showModal({
      title: '确定要删除吗？',
      showCancel: true,
      success: function (res) {
        // 用户点击确定
        if(!res.cancel){
          //获取购物车列表
          var cartItems = that.data.cartItems;  
          //获取当前点击事件的下标索引
          var index = e.currentTarget.dataset.index;  
          cartItems.splice(index, 1);
          // 更新界面
          that.setData({
            cartItems: cartItems
          });
          if (cartItems.length) {
            that.setData({
              cartList: false
            });
          }
          // 商品总额
          that.getsumTotal();
          // 异步存缓存
          wx.setStorageSync("cartItems", cartItems);      
        }
      },     
    });
  },
  /**
   * 跳转确认订单页
   */
  moveToOrderCheck: function () {
    
    for(var i = 0; i < this.data.cartItems.length; i ++) {
      // 判断购物车列表是否有已勾选的商品
      if(this.data.cartItems[i].selected) {
        var that = this;
        // 跳转确认订单页
        wx.navigateTo({
          url: '../orderCheck/orderCheck?orderTotal=' + that.data.total,
        });
        break;
      }
    }
  },
  /**
   * 商品总额
   */
  getsumTotal: function () {
    var sum = 0;
    for (var i = 0; i < this.data.cartItems.length; i++) {
      if (this.data.cartItems[i].selected) {
        sum += this.data.cartItems[i].goodsQuantity * 
        this.data.cartItems[i].goodsPrice;
      }
    }
    //更新界面
    this.setData({
      total: sum
    });
  }
})