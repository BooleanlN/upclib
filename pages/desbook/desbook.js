// pages/desbook/desbook.js
var sliderWidth = 96;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  bookinfo:[],
  bookid:'',
  bookname:'',
  content:'',
  tabs: ["我的书评", "热门评价", "写书评"],
  activeIndex: 1,
  sliderOffset: 0,
  sliderLeft: 0,
  hotcont:[],
  mycont:[],
  zansrc:'../images/zan.png'
  },
  inputcont:function(res){
    this.setData({
      content:res.detail.value
    });
    console.log(res.detail.value);
  },
  pinglun: function () {
    //写书评，参数：评论内容，code，bookid，书名
    var that = this;
    wx.login({
      success: function (res) {
        console.log(that.data.content);
        wx.request({
          url: 'https://www.booleanln.cn/xiaochengx/soushu/content.php',
          data: {
            bookname:that.data.bookname,
            code: res.code,
            bookid:that.data.bookid,
            content:that.data.content,
            username:'东野圭吾'
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //返回成功，并返回当前我的关于这本书的所有书评
            console.log(res);
            that.setData({
              mycont:res.data.result
            })
          }
        })
      }
    })
  },
  //获取热评
  getrepin:function(){
    var that = this;
    wx.request({
      url: 'https://www.booleanln.cn/xiaochengx/soushu/content.php',
      data: {
        bookid: that.data.bookid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        that.setData({
          hotcont:res.data.result
        });
      }
    });
  },
  //我的评论
  getmycont:function(){
    var that = this;
    wx.login({
      success:function(res){
   wx.request({
     url: 'https://www.booleanln.cn/xiaochengx/soushu/content.php',
      data: {
        bookid: that.data.bookid,
        code:res.code
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          mycont: res.data.result
        });
      }
      });
      }
    })
  },
  dianzan:function(){
    var that = this;
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  var index = options.bookid;
  //var bookarr = JSON.parse(options.bookarr);
  console.log(options.bookname);
  //获取书籍信息
  wx.request({
    url: 'https://www.booleanln.cn/xiaochengx/soushu/douban.php',
    data: {
      book: options.bookname
    },
    method: 'get',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res);
      var bookarr = res.data.result.books[parseInt(index)];
      console.log(bookarr);
      //如果描述超出50词，则处理
      if (bookarr.summary.length > 50) {
        bookarr.summary= bookarr.summary.substring(0, 45)+"......";
      }
      that.setData({
        bookinfo:bookarr,
        bookid:bookarr.id,
        bookname:bookarr.title
      });
      that.getrepin();
      that.getmycont();
    }
  })
  // 三个TAB的代码
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
      });
    }
  });
  // var res=JSON.parse(options.bookarr);
  // console.log(res);
  },
  //tab点击的代码
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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