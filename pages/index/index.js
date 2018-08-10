//index.js
//获取应用实例
const app = getApp()
var order = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5']
Page({
  data: {
    toView: 'green',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    storeUrl:"/images/head.jpg",//店铺头像
    storeName:"暂无名字",//店铺名字
    storeContent:"暂无描述",//店铺描述
    isHideCoupons:false,//是否隐藏优惠券层
    hotGoodsList:[],//
    imgHeight:'',

  },

  scroll: function (e) {
    console.log(e)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that =this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //进入首页首先要获取店铺信息
    getApp().func.indexStore("100",function(message,res){
      console.log(message)
      console.log(res.data)
      //店铺信息
      if(res.data!=null&&res.data.length>0){
        //获取数据
        var storeAddress = res.data[0][0].store_address;
        var storeBanner = res.data[0][0].store_banner;
        var storeId = res.data[0][0].store_id;
        var storeLogo = res.data[0][0].store_logo;
        var storeName = res.data[0][0].store_name;
        
        //给店铺信息部分赋值
        that.setData({
          storeUrl: storeLogo,
          storeName: storeName,
          storeContent: "暂无描述",
        })

      }
      //是否有优惠券
      if (res.data != null && res.data.length > 0&&res.data[1].length>0){
        console.log("有优惠券")

      }else{
        console.log("没有有优惠券")
        that.setData({
          isHideCoupons:true
        })
      }
      //热卖商品；
     
      if(res.data!=null&&res.data.length>0&&res.data[3].data.length>0){
        console.log("有热卖商品")
        that.setData({
          hotGoodsList: res.data[3].data
        })
      }else{
        console.log("没有热卖商品")
      }
    })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
