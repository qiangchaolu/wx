// pages/eventDetail/eventDetail.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startProduceDate:'2018-01-01',
    endProduceDate:'2018-12-31',
    selectedProduceDate:'2018-03-22',
    list:[],
    value:"",
    day:"",
  },
  dateChange:function(e){
    this.setData({
      selectedProduceDate:e.detail.value,
    })
  },
  //获取input中的修改后的值
  formName: function (e) {
    this.setData({
      value:e.detail.value
    })
  },
  baocun:function(){
    var pid=app.globalData.pid;
    var u = "http://127.0.0.1:3000/update?value=" + this.data.value + "&rq=" + this.data.selectedProduceDate+"&pid="+pid;
    wx.request({
      url: u,
      success:(res)=>{
        if(res.data.code=1){
          wx.showToast({
            title: '保存成功',
          })
        }else{
          wx.showToast({
            title: '保存失败',
          })
        }
      }
    })
  },
  shanchu:function(){
    var pid = app.globalData.pid;
    var u="http://127.0.0.1:3000/delete?pid="+pid;
    wx.request({
      url: u,
      success:(res)=>{
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var u="http://127.0.0.1:3000/getDetail?pid="+app.globalData.pid;
    wx.request({
      url: u,
      method:"GET",
      success:(res)=>{
        this.setData({
          list:res.data,
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})