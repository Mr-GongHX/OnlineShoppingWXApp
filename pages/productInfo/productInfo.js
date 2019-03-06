// pages/productInfo/productInfo.js

// 获取小程序实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    pause: false,
    imghref: "",
    goodsId: "",
    urlPrefix: "",
    // 商品详情,评价
    goodsInfo: []
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
    var that = this;
    wx.navigateTo({
      url: "../commentDetail/commentDetail?goodsId=" + that.data.goodsId
    })
  },
  // 跳转到购物车
  moveToCar: function() {
    wx.switchTab({
      url: '../shoppingList/shoppingList',
    })
  },
  // 加入购物车
  addCar: function(res) {
    var that = this;
    // 用是否能获得userId来判断用户是否已登录
    wx.getStorage({
      key: 'userId',
      success: function (res) {      
        //先获取缓存中的已添加购物车的商品信息
        var cartItems = wx.getStorageSync('cartItems') || []
        //判断购物车缓存中是否已存在该商品
        var exist = cartItems.find(function (ele) {
          return ele.id === that.data.goodsId
        }) 
        if (exist) {
          //如果存在，则增加该商品的购买数量
          exist.goodsQuantity = parseInt(exist.goodsQuantity) + 1
        } else {
          //如果不存在，传入该商品的详细信息
          cartItems.push({
            id: that.data.goodsId,
            goodsQuantity: 1,
            goodsPrice: that.data.goodsInfo[0].goodsPrice,
            goodsName: that.data.goodsInfo[0].goodsName,
            goodsPicture: that.data.urlPrefix + "goods/showMyGoodsImg-goodsImg-" +
              that.data.goodsId
          });
        }
        //加入购物车数据，存入缓存
        wx.setStorage({
          key: 'cartItems',
          data: cartItems,
          success: function (res) {
            //添加购物车的消息提示框
            wx.showToast({
              title: "添加成功",
              icon: "success",
              durantion: 2000
            });
          }
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '您尚未登录,无法添加购物车',
          content: '即将带您前往登录页',
          showCancel: false,
          success: function () {
            wx.navigateTo({
              url: '../login/login',
            });
          }
        });
      }
    })
  },
  // 立即购买
  buyNow: function() {
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // 跳转确认订单页
        wx.navigateTo({
          url: "../orderCheck/orderCheck"
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '您尚未登录，无法购买商品',
          content: '即将带您前往登录页',
          showCancel: false,
          success: function () {
            wx.navigateTo({
              url: '../login/login',
            });
          }
        });
      }
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
          // 将时间戳转化为（年-月-日）的格式
          var date = null;
          var year = null;
          var month = null;
          var day = null;
          for(var i in res.data){
            date = new Date(res.data[i].commentTime);
            year = date.getFullYear() + '-';
            month = (date.getMonth() + 1 < 10 ? '0' +
              (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            day = date.getDate() < 10 ? '0' +
              date.getDate() : date.getDate();
            res.data[i].commentTime = year + month + day;
          }  
          //  更新渲染层 
          that.setData({
            goodsInfo: res.data
          });
        }

      }
    });
  },
  onShow: function () {   
    
  }
})
