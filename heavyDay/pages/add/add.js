// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startProduceDate: '2018-01-01',
    endProduceDate: '2018-12-31',
    selectedProduceDate: '2018-03-22',
    value:"",
  },
  dateChange: function (e) {
    this.setData({
      selectedProduceDate: e.detail.value,
    })
  },
  formName: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  add:function(){
    var u = "http://127.0.0.1:3000/add?val=" + this.data.value + "&rq=" + this.data.selectedProduceDate;
    wx.request({
      url: u,
      success:(res)=>{
        if(res.code=1){
          wx.showToast({
            title: '保存成功',
          })
        }
      }
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