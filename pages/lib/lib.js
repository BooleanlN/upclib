// pages/lib/lib.js
var URL1 = 'https://pws.upc.edu.cn/library.asmx/BorrowInfo';
var url = 'https://wxcard.upc.edu.cn/upclib/searchBook';
var page = 1;
var value;
var totalpage;
var sliderWidth = 96;
var username;
Page({
  /**
   * 页面的初始数据
   * 
   */
  data: {
    books: [],
    allpage: 1,
    tabs: ["我的图书", "图书查询"],
    activeIndex:1,
    sliderOffset: 0,
    sliderLeft: 0,
    book_info: "",
    height:'100px',
    dis:'none'
  },
  search: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenHeight);
        console.log(res.windowHeight);
        var high=res.screenHeight+250;
        that.setData({
          height: high+'rpx',
          dis:''
        });
      },
    })
    if (!e.detail.value) {
      return 0;
    }
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 10000

    });
    var that = this;
    page = 1;
    wx.request({
      url: url + "?title=" + e.detail.value + "&page=" + page,
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        //console.log(url);
        //console.log(res);
        if (res.data.error == undefined) {
          value = e.detail.value;
          totalpage = res.data.total_page;
          wx.hideToast();
          that.setData({
            books: res.data.book_info,
            allpage: res.data.total_page
          });
        }
        else {
          wx.showToast({
            title: '未查询到该图书的相关信息',
            icon: 'loading'
          })
        }
      }
    });
  },
  more: function () {
    var that = this;
    page++;
    if (page > totalpage) {
      wx.showToast({
        title: '没有更多藏书',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: url + "?title=" + value + "&page=" + page,
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(url);
        console.log(res);
        wx.hideToast();
        that.setData({
          books: res.data.book_info
        });
      }
    });
  },
  tz: function (e) {
    if (!e.detail.value) {
      return 0;
    }
    var that = this;
    page = e.detail.value;
    if (page > totalpage) {
      wx.showToast({
        title: '没有更多藏书',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: url + "?title=" + value + "&page=" + page,
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(url);
        console.log(res);
        wx.hideToast();
        that.setData({
          books: res.data.book_info
        });
      }
    });
  },
  getheight:function(){
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username=options.username;
    console.log(username);
    var that = this;
    that.getheight();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: URL1,
      data: {
        num: username
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var index = res.data.lastIndexOf('<');
        var strr = res.data.substring(81, index);
        var json = JSON.parse(strr);
        console.log(json['Table']);
        that.setData({
          book_info: json['Table']
        });
      }
    })
  },
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