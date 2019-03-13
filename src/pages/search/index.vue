<template>
  <div>
    <!--顶部搜索框-->
    <div class="hd">
      <div class="search-ipt">
        <input @input="keyCodeFn" type="text" :value="iptVal" placeholder="请输入" focus="true" @confirm="searchFn({'v':iptVal})">
        <icon v-show="cancelIcon" @click="cancelFn" type="cancel" size="15" color="rgba(0,0,0,0.6)"/>
      </div>
      <span @click="backFn">取消</span>
    </div>
    <!-- 输入时给出模糊答案-->
    <ul class="select" v-show="select">
      <li v-for="(item,index) in selectArr" @click="searchListFn(item)" :key="index">{{item}}</li>
    </ul>
    <!--历史记录-->
    <div class="bd" v-if="!select && !listShow">
      <p>
        <span>历史记录</span>
        <span @click="removeFn" class="iconfont icon-delete"></span>
      </p>
      <div class="history">
        <span @click="searchListFn(item)" v-for="(item,index) in historyArr" :key="index">{{item}}</span>
      </div>
    </div>
    <!--热门搜索-->
    <!--<div class="ft">-->
    <!--<p>热门搜索</p>-->
    <!--<div class="tag"></div>-->
    <!--</div>-->
    <!-- 搜索结果-->
    <div class="search" v-show="listShow">
      <!--有结果-->
      <div class="search-list" v-show="!listShowNone&&listShow">
        <div class="hd">
          <p @click="filtrateFn(1)" :class="{'active':!price}">综合</p>
          <p :class="['price',{'price-up':priceSel==='priceUp','price-down':priceSel==='priceDown'},{'active':price}]" @click="filtrateFn(2)" >价格
          <span class="icon"></span></p>
        </div>
        <ul class="ft">
          <li v-for="item in goodsList" :key="item.id">
            <navigator :url="'../details/main?id='+item.id">
              <image :src="item.list_pic_url" mode="widthFix"></image>
              <p>{{item.name}}</p>
              <span>￥{{item.retail_price}}</span>
            </navigator>
          </li>
        </ul>
      </div>
      <!--无结果-->
      <div class="search-null" v-show="listShowNone&&listShow">
        <p>您寻找的商品暂未上架</p>
      </div>
    </div>
  </div>
</template>

<script>

  import { nodeAjax } from "@/utils/api";

  export default {

    data() {
      return {
        historyArr: [],
        selectArr: [],
        select: false,
        cancelIcon: false,
        listShow: false,
        listShowNone: false,
        goodsList: [],
        price: false,
        iptVal: "",
        priceSel:''
      };
    },
    onLoad() {
      this.dataInfo();
    },
    methods: {
      // 筛选价格变换
      priceFn(){

      },
      // 结果筛选
      filtrateFn(v) {
        if (v === 1) {
          this.price = false;
          this.priceSel = ''
          this.searchFn({
            v: this.iptVal,
            sort: 'default',
            order: 'desc'
          })
        } else {
          this.price = true;
          if(!this.priceSel){
            this.priceSel = 'priceUp'
            this.searchFn({
              v: this.iptVal,
              sort: 'price',
              order: 'asc'
            })
          }else if(this.priceSel=== 'priceUp'){
            this.priceSel = 'priceDown'
            this.searchFn({
              v: this.iptVal,
              sort: 'price',
              order: 'desc'
            })
          }else if(this.priceSel=== 'priceDown'){
            this.priceSel = 'priceUp'
            this.priceSel = 'priceUp'
            this.searchFn({
              v: this.iptVal,
              sort: 'price',
              order: 'asc'
            })
          }
        }
      },
      // 点击取消icon
      cancelFn() {
        this.iptVal = "";
        this.select = false;
        this.listShow = false;
        this.dataInfo();
      },
      //点击下拉框事件处理
      searchListFn(v) {
        wx.showLoading({
          mask: true
        });
        this.select = false;
        this.iptVal = v;
        this.cancelIcon = true;
        this.searchFn({v:v});
      },
      searchFn(obj) {
        let data = {
          keyword: obj.v || this.iptVal,
          page: 1,
          size: 1000,
          sort: obj.sort || "default",
          order: obj.order ||"asc",
          categoryId: 0
        }
        this.select = false;
        nodeAjax("goods/list",data ).then(res => {
          let data = res.data;
          wx.hideLoading();
          if (res.errno === 0) {
            if (data.count > 0) {
              this.listShow = true;
              this.listShowNone = false;
              this.goodsList = data.data;
            } else {
              this.listShow = true;
              this.listShowNone = true;
            }
          }
        });
      },
      //点击键盘事件
      keyCodeFn(event) {
        let that = this;
        this.iptVal = event.target.value;
        if (event.target.value === "") {
          this.cancelIcon = false;
          return;
        }
        nodeAjax("search/helper", {
          keyword: event.target.value
        }).then(res => {
          if (res.errno === 0) {
            that.cancelIcon = true;
            if (res.data.length > 0) {
              that.select = true;
              that.selectArr = res.data;
            }
          }
        });
      },
      // 删除记录
      removeFn() {
        nodeAjax("search/clearhistory").then(res => {
          if (res.errno === 0) {
            this.historyArr = [];
          }
        });
      },
      // 返回上一页
      backFn() {
        wx.navigateBack({
          delta: 1
        });
      },
      //  初始获取所有数据
      dataInfo() {
        nodeAjax("search/index").then(res => {
          this.historyArr = res.data.historyKeywordList;
        });
      }
    }
  };
</script>
<style>
  @import "../../font/iconfont.scss";
</style>
<style lang="scss">
  page{
    height: 100%;
    >div{
      height: 100%;
    }
  }
  .hd {
    background-color: #fff;
    padding: 0 20rpx;
    height: 80rpx;
    display: flex;
    border-bottom: 1rpx solid #d9d9d9;
    justify-content: space-between;
    input {
      border-radius: 45rpx;
      background-color: #fafafa;
      padding-left: 15px;
    }
    span {
      flex: 1;
      text-align: right;
    }
  }
  .search{
    height: 100%;
    background-color: #f4f4f4;
  }
  .search-ipt {
    flex: 8;
    position: relative;
    input{
      height: 60rpx;
    }
    icon {
      position: absolute;
      z-index: 9;
      right: 15rpx;
      bottom: 45%;
    }
  }

  .bd {
    padding: 20px;
    p {
      margin-bottom: 15px;
      color: #7f7f7f;
      display: flex;
      justify-content: space-between;
    }
    .history {
      display: flex;
      flex-wrap: wrap;
      span {
        border: 1rpx solid #858585;
        border-radius: 3px;
        margin-right: 8px;
        padding: 3px 5px;
        font-size: 28rpx;
        margin-bottom: 8px;
      }
    }
  }

  .select {
    background-color: #fff;
    li {
      padding: 30rpx 20rpx;
    }
  }

  .search-list {
    .hd {
      display: flex;
      height: 35px;
      line-height: 35px;
      p {
        width: 50%;
        text-align: center;
      }
      .active {
        color: #a53634;
      }
      .price{
        position: relative;
        span{
          position: absolute;
          background-image: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-d67e29c87b.png);
          background-repeat: no-repeat;
          background-size: 55%;
          background-position: 20% 50%;
          width: 20px;
          height: 100%;
          left: 60%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .price-up {
        .icon{
          background-image: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-630387f133.png);
        }
      }
      .price-down {
        .icon {
          background-image: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-2610d9592a.png);
        }
      }
    }
    .ft {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 5px;
      background-color: #f4f4f4;
      height: 100%;
      li {
        background-color: #fff;
        width: 49.5%;
        margin-top: 1vw;
        padding-bottom: 5px;
        image {
          width: 100%;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 5px;
          line-height: 20px;
        }
        span {
          margin-top: 5px;
          font-size: 34rpx;
          padding: 0 5px;
          color: #b4282d;
          line-height: 25px;
        }
      }
    }
  }
  .search-null{
    height: 100%;
    p{
      color: #999;
      text-align: center;
      padding-top: 200px;
    }
  }
</style>
