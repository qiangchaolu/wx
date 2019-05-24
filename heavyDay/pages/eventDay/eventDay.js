// pages/eventDay/eventDay.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:"http://127.0.0.1:3000/img/eventDay/jia.png",
    list:[],
  },
  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 1,  //选中图片数量
      sourceType: ["camera", "album"],  //图片来源
      success: function (res) {
        //获取选中的图片
        var src = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/uploadFile', 
          filePath: src,
          name: 'mypic',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: (res) => {
            console.log(src);
            that.setData({
              img_url:src,
            })
          }
        })
      }
    })
  },
  //
  detail_btn:function(e){
    app.globalData.pid=e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../eventDetail/eventDetail'
    })
  },
  xinjian: function () {
    wx.navigateTo({
      url: '../add/add'
    })
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
    var u="http://127.0.0.1:3000/getList"
    wx.request({
      url: u,
      method:"GET",
      success: (res) => {
        this.setData({
          list:res.data.data,
        })
      },
      fail: () => {
        console.log("请求失败");
      },
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})