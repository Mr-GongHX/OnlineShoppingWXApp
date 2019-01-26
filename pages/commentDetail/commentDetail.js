// pages/commentDetail/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoadMore: false,
    pjDataList: [
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '张三',
        add_time: '2018-06-01',
        content: '好评好评，真实太好了!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      }, {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      }, {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评斯蒂芬非常！！！！！！！！！!'
      }, {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
      {
        headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
        author: '李四',
        add_time: '2019-06-01',
        content: '差评！！！！！！！！！!'
      },
    ],//评价数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log("进入")
    var that = this;
    setTimeout(function () {
      that.setData({
        isHideLoadMore: true,
        pjDataList: [
          {
            headpic: 'http://t2.hddhhn.com/uploads/tu/201610/198/scx30045vxd.jpg',
            author: '王五',
            add_time: '2018-06-01',
            content: '好评好评，真实太好了!'
          }
        ]
      });
    }, 100);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})