Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    dataList: [
      {
        goods_id: 1,
        goods_title: '商品标题1',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '60'
      }, {
        goods_id: 1,
        goods_title: '商品标题2',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '70'
      }, {
        goods_id: 1,
        goods_title: '商品标题3',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '80'
      }, {
        goods_id: 1,
        goods_title: '商品标题4',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '90'
      }, {
        goods_id: 1,
        goods_title: '商品标题5',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '110'
      },
      {
        goods_id: 1,
        goods_title: '商品标题6',
        goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        goods_store: '苹果旗舰店',
        goods_price: '110'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchName = options.searchName;
    this.setData({
      title: searchName
    })
    wx.setNavigationBarTitle({
      title: "搜索 - "+this.data.title,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        isHideLoadMore: true,
        dataList: [
          {
            goods_id: 10,
            goods_title: '商品标题5',
            goods_img: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
            goods_store: '三星旗舰店',
            goods_price: '110'        
          }
        ]
      });
    }, 100);
  }
})