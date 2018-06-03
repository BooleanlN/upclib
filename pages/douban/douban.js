// pages/douban/douban.js
var bookin=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  bookinfo:[],
  inputVal:''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  
//sou suo kuang 
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
    var that = this;
    wx.showLoading({
      title: 'searching....',
    });
    wx.request({
      url: 'https://www.booleanln.cn/xiaochengx/soushu/douban.php',
      data: {
        book: e.detail.value
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          bookinfo: res.data.result.books,
        });
        bookin = res.data.result.books;
        console.log(bookin);
      }
    })
  },
  //jia ru shu jia 
  addshelf:function(val)
  {
    var that = this;
    console.log(val);
    var id = val.currentTarget.dataset.book;
    console.log(bookin);
    var bookName  =  bookin[id]["title"];
    var bookIsbn  = bookin[id]["isbn10"];
    var bookImg = bookin[id]["images"]["large"];
    wx.login({
      success:function(res)
      {
         var code = res.code;
         wx.request({
           url: 'https://www.booleanln.cn/xiaochengx/soushu/registe.php',
           data:{
              code:res.code,
              book:bookName,
              isbn:bookIsbn,
              imgurl:bookImg
           },
           header:{
             "content-type":"application/x-www-form-urlencoded"
           },
           method:"post",
           success:function(res){
             console.log(res.data);
              if(res.data.code==0)
              {
                wx.showToast({
                  title: '添加成功',
                });
              }
           }
         })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  wx.request({
    url: 'https://www.booleanln.cn/xiaochengx/soushu/douban.php',
    data: {
      book:this.data.inputVal
    },
    method: 'get',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res);
      that.setData({
        bookinfo:res.data.result.books,
      });
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