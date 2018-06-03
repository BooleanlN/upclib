// pages/bookinfo/bookinfo.js
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getbookinfo:function(id){
    var that=this;
    var url = "https://wxcard.upc.edu.cn/upclib/bookDetails"
    wx.request({
      url: url+"?marc_no="+id,
      header:{
        "Content-Type":"json"
      },
      success:function(res){
        console.log(res.data[0].skzt);
          that.setData({
            bookinfo:res.data
          });
      }
    })
  },
  onLoad: function (data) {
    id = data.id;
    var that=this;
    that.getbookinfo(id);
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