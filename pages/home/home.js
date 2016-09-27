
Page({
  data: {
    toast: true,
    title: "商城首页",
    moreText: '点击加载更多',
    goodsList: [],
    page: 1,
    rows: 20,
    total: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  // 获取轮播图数据
  getGoodsData: function(options) {
    wx.showNavigationBarLoading();
    var _this = this;
    wx.request({
      method: 'GET',
      url: 'http://115.29.245.211:8181/jgouINF/inter/shop/queryIshopList.do',
      data: {
        page:_this.data.page,
        rows:_this.data.rows
      },
      success: function(res) {
        wx.hideNavigationBarLoading();
        if(res.data.retcode == 1){
            var rows = res.data.data.rows;
            var total = res.data.data.total;
            _this.setData({ total: total });
            if(rows.length > 0){
                for (var i = 0; i < rows.length; i++) {
                  var joinedmember = rows[i].joinedmember;
                  var totalmember = rows[i].totalmember;
                  rows[i].progress =  Math.floor(joinedmember/totalmember*100);
                }
                if(_this.data.page == 1){
                  _this.setData({
                    goodsList:rows
                  })
                }else{
                  _this.setData({
                    goodsList:_this.data.goodsList.concat(rows)
                  })
                }
            }
        }
      },
      fail: function(){
        wx.hideNavigationBarLoading();
      }
    })
  },
  //加载更多数据
  lodaMoreData: function(){
    var _page = this.data.page + 1;
    var _total = this.data.total
    if(_page <= _total){
      this.setData({ page:_page });
      this.getGoodsData();
    }else{
      this.setData({ moreText:"所有数据加载完" });
    }
  },
  // 跳转页面
  addCart: function(e){
    this.setData({ toast:false });
  },
  toastChange: function(){
    this.setData({ toast:true });
  },
  onLoad: function() {
    var _this = this;
    _this.getGoodsData();
  }

})
