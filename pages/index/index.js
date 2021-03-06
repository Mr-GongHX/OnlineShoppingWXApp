//index.js

// 获取小程序实例
const app = getApp();
Page({
  data: {
    urlPrefix: "",
    indicatorDots: true, //设置是否显示面板指示点
    indicatorActiveColor: "white",  //设置指示点的颜色为白色
    indicatorColor: "#ccc",  //设置当前选中点的颜色为灰色
    autoplay: true, //设置是否自动切换
    circular: true, //设置是否衔接滑动
    interval: 3000, //设置自动切换时间间隔：3s
    duration: 300,  //设置滑动动画时长：0.3s
    wxSearchData: "",  //输入框数据
    // 低价好货
    lowPriceGoodsItems: [],
    // 新上架商品
    newGoodsItems: [],
  },
  // 搜索
  search: function() {
    if(this.data.wxSearchData === ""){
      // 提示用户输入信息不能为空
      wx.showModal({
        title: "请输入要搜索的商品名!",
        content: "文字不能为空！",
        showCancel: false
      })
    } else{
      // 跳转到商品列表页
      wx.navigateTo({
        url: '../searchList/searchList?searchName='+this.data.wxSearchData
      })
    }
  },
  // 跳转手机专区页
  moveToPhoneArea: function () {
    wx.navigateTo({
      url: '../phoneArea/phoneArea',
    })
  },
  // 跳转电脑专区页
  moveToComputerArea: function () {
    wx.navigateTo({
      url: '../computerArea/computerArea',
    })
  },
  // 跳转外设专区页
  moveToAccessoryArea: function () {
    wx.navigateTo({
      url: '../accessoryArea/accessoryArea',
    })
  },
  // 输入框内容
  wxSearchInput: function(e){
    this.data.wxSearchData = e.detail.value;
  },
  onLoad: function () {
    this.setData({
      urlPrefix: app.globalData.urlPrefix
    });
  },
  onShow: function () {
    var that = this;
    // 低价好货
    wx.request({
      url: that.data.urlPrefix + 'user/showLowPriceGoods.do',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            lowPriceGoodsItems: res.data
          });
        }
      }
    })
    // 新上架商品
    wx.request({
      url: that.data.urlPrefix + 'user/showNewGoods.do',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.statusCode == 200){
          that.setData({
            newGoodsItems: res.data
          });
        }
      }
    });
  }
})

