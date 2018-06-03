// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toux:"",
    userName:"",
    bookshelf:"",
    bookimg:"",
    nameArr:[],
    imgArr:[],
    sumArr:[]
  },
getUser:function()
{
  var that = this;
  wx.login({
    success:function(res)
    {
      var code = res.code;
      console.log(code);
      wx.request({
        url: 'https://www.booleanln.cn/xiaochengx/soushu/registe.php',
        data:{
          code:res.code,
          name:that.data.userName
        },
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        method:'post',
        success:function(res)
        {
          if (res.data.code == 0 && typeof (res.data.booklist)==undefined)
          {
              that.setData({
                bookshelf:["还没添加书籍，快去添加喜欢的书籍吧"]
              })
          } else if(res.data.code == 0)
          {
            console.log(res.data);
            res.data.booklist.splice(0, 1);
            res.data.imgArr.splice(0, 1);
            var nameArr = res.data.booklist;
            var imgArr = res.data.imgArr;
            var Arrsum  = [];
           for(var i=0;i<nameArr.length;i++)
           {
             var arrTemp ={};
             arrTemp["name"]=nameArr[i];
             arrTemp["imgurl"]=imgArr[i];
             var temp =JSON.stringify(arrTemp);
             //console.log(arrTemp);
             Arrsum[i]=arrTemp;
           }
           console.log(Arrsum);
              that.setData({
                nameArr:nameArr,
                imgArr:imgArr,
                sumArr:Arrsum
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
    wx.getUserInfo({
      success:function(res){
        var userInfo = res.userInfo;
        var imgurl = userInfo.avatarUrl;
        console.log(imgurl);
        that.setData({
           toux:imgurl,
           userName:userInfo.nickName
        });
        that.getUser();
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
    console.log("onshow...");
  var that = this;
  that.getUser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  console.log("onhide...");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUNload...");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    console.log("下拉刷新...");
    var that = this;
    setTimeout(function()
    {
      wx.startPullDownRefresh({
        success: function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          that.getUser();
        }
      })
    },2000)
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