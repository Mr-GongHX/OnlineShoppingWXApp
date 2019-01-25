//index.js

Page({
  data: {
    indicatorDots: true, //设置是否显示面板指示点
    indicatorActiveColor: "white",  //设置指示点的颜色为白色
    indicatorColor: "#ccc",  //设置当前选中点的颜色为灰色
    autoplay: true, //设置是否自动切换
    circular: true, //设置是否衔接滑动
    interval: 3000, //设置自动切换时间间隔：3s
    duration: 300,  //设置滑动动画时长：0.3s
    wxSearchData: "",  //输入框数据
    imgUrls: [
      'https://a4.vimage1.com/upload/flow/2017/10/20/117/15084947982974.jpg',
      'https://a2.vimage1.com/upload/flow/2017/11/07/73/15100619325212.jpg',
      'https://b.vimage1.com/upload/mst/2017/11/04/139/23b96f0e89abed2d9415e848fc3715ff_604x290_80.jpg'
    ],
    // 特价商品
    goodsHotItems: [
      {
        goodId: 0,
        name: '天然植物唇膏2.4g',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdc/272/707/8870197248301707272/2/6922446703595-5_360x456_90.jpg',
        newprice: "32.00",
        oldprice: "59.00",
      },
      {
        goodId: 1,
        name: '流光水彩唇膏升级版 3.5g',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/03/8/4fb444e7-3417-4f4a-b5a1-7f1d884c610f_218x274_70.jpg',
        newprice: "89.00",
        oldprice: "99.00",
      },
      {
        goodId: 2,
        name: '卡姿兰蜗牛氧气泡泡面膜',
        url: 'bill',
        imageurl: 'https:////a3.vimage1.com/upload/merchandise/pdcvis/2017/08/24/167/28c3726f-dfdd-4a59-89ac-b79ea8e24f40_218x274_70.jpg',
        newprice: "139.00",
        oldprice: "159.00",
      },
      {
        goodId: 3,
        name: '特效润肤露',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
        newprice: "30.00",
        oldprice: "80.00",
      },
      {
        goodId: 4,
        name: '御泥坊 | 美白嫩肤泥浆...',
        url: 'bill',
        imageurl: 'https://a4.vimage1.com/upload/merchandise/pdcvis/2017/11/03/98/f34a6c251abf45e5ba60a645f13c7757-5.jpg',
        newprice: "79.00",
        oldprice: "80.00",
      }, {
        goodId: 5,
        name: '日本资生堂洗颜',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058328876.jpg',
        newprice: "30.00",
        oldprice: "80.00",
      }
      , {
        goodId: 6,
        name: '玉兰油 | 水感透白光塑钻...',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/05/19/2/e5de903ab5ba4a6492f3574469fdfca9-5.jpg',
        newprice: "145.00",
        oldprice: "324.00",
      }
    ],
    // 新上架商品
    newGoodsItems: [
      {
        goodId: 0,
        name: '泊尔崖蜜蜜光面膜（5片盒装）',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
        newprice: "86",
        oldprice: "88",
      },
      {
        goodId: 1,
        name: '透无瑕矿物养护两用粉饼#03',
        url: 'bill',
        imageurl: 'https://a4.vimage1.com/upload/merchandise/pdcvis/2017/08/21/27/4b24e2a629644877866d3da755f6a36e-5_218x274_70.jpg',
        newprice: "147.00",
        oldprice: "150.00",
      },
      {
        goodId: 2,
        name: '川水水光面膜（5片盒装）',
        url: 'bill',
        imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/86/7891361fdab348a1bc91aeca31fc77b1-5_218x274_70.jpg',
        newprice: "86.00",
        oldprice: "88.00",
      },
      {
        goodId: 3,
        name: '蜜三色渐变咬唇膏3.2g 03蜜橙动心恋',
        url: 'bill',
        imageurl: 'http://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/176/c3b9453a4d7f46c6a8fe78705f77352b-5_218x274_70.jpg',
        newprice: "97.00",
        oldprice: "99.00",
      },
      {
        goodId: 4,
        name: '时焕颜亮采套装',
        url: 'bill',
        imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/93/69a6bc1c11eb4be184b7dffb43b8565b-5_218x274_70.jpg',
        newprice: "398.00",
        oldprice: "459.00",
      }, {
        goodId: 5,
        name: '雪域眼霜套装',
        url: 'bill',
        imageurl: 'https://a4.vimage1.com/upload/merchandise/pdcvis/2017/08/23/127/53409c86f74647af915bc379427b97c2-5_218x274_70.jpg',
        newprice: "238.00",
        oldprice: "358.00",
      }
      , {
        goodId: 6,
        name: '凝时鲜颜冰肌水套装',
        url: 'bill',
        imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/11/13/95/fb6c3d0c1f304b449dadb1f0100c1205-5_218x274_70.jpg',
        newprice: "248.00",
        oldprice: "348.00",
      }
      , {
        goodId: 7,
        name: '雪润皙白精选三件套',
        url: 'bill',
        imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/30/184/a5000156098940b5a05a0e696535ac20-5_218x274_70.jpg',
        newprice: "348.00",
        oldprice: "396.00",
      }
    ]
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
  wxSerchFocus: function(){

  },
  // 输入框内容
  wxSearchInput: function(e){
    this.data.wxSearchData = e.detail.value;
  },
  wxSearchBlur: function(){
 
  },
  // 跳转商品详情页
  catchTapCategory: function () {
    wx.navigateTo({
      url: '../productInfo/productInfo',
    })
  },
  // 跳转商品详情页
  productInfo: function () {
    console.log("点击")
    wx.navigateTo({
      url: '../productInfo/productInfo',
    })
  },
  onClick: function() {
    var that = this;
    wx.request({
      url: 'http://192.168.1.3:8080/user/showUser.do-'+this.data.id,
      method:'POST',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res){
        console.log("返回结果："+res)
        console.log("res:"+res.data)
        if(res.data == null){
          return;
        } else{
          that.setData({
            content: "用户名：" + res.data.username,
            password: "密码：" + res.data.userPassword,
            regTime: "注册时间:" + res.data.userRegisterTime,
          })
        }
      },
      fail: function(res){
        //失败执行回调
      }
    })
  },
  onLoad: function () {
    
  },
  // 触底加载更多
  onReachBottom: function () {
    console.log('加载更多');
    var that = this;
    setTimeout(function () {
      console.log("进入方法");
      that.setData({
        isHideLoadMore: true,
        newGoodsItems: [
          {
            goodId: 100,
            name: '测试数据1',
            url: 'bill',
            imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
            newprice: "8612",
            oldprice: "88",
            discount: "8.8",
          }
        ]
      });
    }, 100);
  }
})

