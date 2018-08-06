//此JS用于放置请求function
var md5 = require('../utils/md5.js')
var urlSet = require('../utils/urlSet.js')
var util = require('../utils/util.js')
var common =require('../utils/common.js')
var that = this;
let user_id = wx.getStorageSync("user_id");
let token = wx.getStorageSync("token");
let verify = wx.getStorageSync("verify");

//登录方法
function indexStore(store_id,cb) {
  wx.request({
    url: urlSet.indexStore,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data: util.json2Form({ store_id: store_id}),
    complete: function (res) {
      console.log(res)
      var statusCode = res.data.statusCode;
      if (statusCode!=null&&statusCode == 200 ) {
        //保存关键数据
        return typeof cb == "function" && cb("获取店铺信息成功！", res.data)
      } else{
          return typeof cb == "function" && cb("获取店铺信息失败！", false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb('获取店铺信息失败！', false)
    }
  })

}




module.exports = {
  indexStore: indexStore,
}