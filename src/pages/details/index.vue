<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <swiper @change="bannerFn">
        <swiper-item v-for="(item,index) in bannerList" :key="index">
          <image :src="item.img_url" mode="widthFix"></image>
        </swiper-item>
      </swiper>
      <div class="badge">{{badge.current}}/{{badge.total}}</div>
    </div>
    <!-- 商品标题信息-->
    <ul class="title-information">
      <li>
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
      </li>
      <li>
        <p>￥<span>{{info.retail_price}}</span></p>
        <p>{{info.promotion_desc}}></p>
      </li>
    </ul>
    <div class="line"></div>
    <!-- 选择购买商品信息-->
    <div class="choice">
      <span>数量规格选择</span>
      <span>></span>
    </div>
    <!-- 服务信息-->
    <div class="serve">
      <p>服务：</p>
      <ul>
        <li>48小时快速退款</li>
        <li>满88元免邮费</li>
        <li>网易自营品牌</li>
        <li>免费配送到家</li>
        <li>部分地区无法配送</li>
      </ul>
      <div>></div>
    </div>
    <div class="line"></div>
    <!-- 大家都在看，原项目为猜你喜欢信息-->
    <div class="popular">
      <p>大家都在看</p>
      <scroll-list @scrollFn="scrollFn" :dataList="popularList"></scroll-list>
    </div>
    <div class="line"></div>
    <!-- 商品参数-->
    <div class="parameter">
      <div>商品参数</div>
      <ul>
        <li v-for="(item,index) in parameterList" :key="index">
          <p>{{item.name}}</p>
          <span>{{item.value}}</span>
        </li>
      </ul>
    </div>
    <!-- 商品图片详情-->
    <div class="particulars">
      <wx-parse :lazyLoad="true" :imageProp="{mode:'widthFix'}" :content="particulars"/>
    </div>
    <!-- 常见问题-->
    <div class="issue">
      <h4>常见问题</h4>
      <ul>
        <li v-for="(item,index) in issueList" :key="item.id">
          <h6>{{item.question}}</h6>
          <p>{{item.answer}}</p>
        </li>
      </ul>
    </div>
    <shop-column :goods="goodsNum" :data="shopColData"></shop-column>
  </div>
</template>

<script>
import { nodeAjax } from '@/utils/api'
import scrollList from '@/components/scrollList'
import shopColumn from '@/components/shopColumn'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      id: '',
      bannerList: [],
      badge: {
        total: 1,
        current: 1
      },
      info: {
        name:'',
        goods_brief:'',
        retail_price:'',
        promotion_desc:''
      },
      popularList: [],
      parameterList:[],
      particulars:'',
      issueList:[],
      shopColData:{
        specificationList:[],
        imgSrc: '',
        price: '',
        goodsId: 0,
        id:0,
      },
      goodsNum:0
    }
  },
  onLoad(option) {
    this.id = option.id;
    // this.id = 1138000;
    this.dataInfo(this.id);
    // this.$on('scrollFn',function(a) {
    //   console.log(a)
    // })
  },
  created () {
  },
  methods:{
    scrollFn(id){
      this.dataInfo(id);
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    dataInfo(id){
      const list = Promise.all([this.detailInfo(id),this.goodScountInfo(),this.relatedInfo(id)]).then(res=>res).catch(err=>{
        console.log(err)
      });
      return list
    },
    async detailInfo(id){
      const r = await nodeAjax('goods/detail',{
        id: id
      }).then(res => {
        if (res.errno === 0) {
          if(res.data.attribute.length < 1){
            wx.showModal({
              title: '提示',
              content: '该商品已下架，即将返回至上级页面',
              showCancel: false,
              success(){
                wx.navigateBack({
                  delta:1
                });
              }
            })
            return
          }
          this.bannerList = res.data.gallery;
          this.badge.total = res.data.gallery.length
          this.info = res.data.info
          this.parameterList = res.data.attribute
          this.particulars = res.data.info.goods_desc
          this.issueList = res.data.issue
          this.shopColData = {
            price: res.data.info.retail_price,
            id: res.data.productList[0].id,
            goodsId: res.data.productList[0].goods_id,
            specificationList: res.data.specificationList,
            imgSrc: res.data.gallery[0].img_url
          }
        }
      });
      return r
    },
    // 购物车数量 接口
    async goodScountInfo(){
      const r = await nodeAjax('cart/goodscount').then(res=>{
        this.goodsNum = res.data.cartTotal.goodsCount
      });
      return r
    },
    async relatedInfo(id){
      const r = await nodeAjax("goods/related", {
        id: id
      }).then(res => {
        if (res.errno === 0) {
          this.popularList = res.data.goodsList;
        }
      });
      return r;
    },
    bannerFn(e){
      this.badge.current = e.target.current + 1;

    }
  },
  components:{
    'scroll-list': scrollList,
    'wx-parse': wxParse,
    'shop-column': shopColumn
  }
}
</script>

<style lang="scss">
  @import url("~mpvue-wxparse/src/wxParse.css");
  .banner{
    position: relative;
    height: 100vw;
    image{
      width: 100%;
    }
    swiper{
      height: 100%;
    }
    .badge{
      position: absolute;
      background:rgba(255,255,255,.9);
      bottom: 15px;
      right: 15px;
      padding: 0 5px;
      border-radius: 3px;
    }
  }
  .title-information{
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    li{
        &:first-child{
        p{
          color: #7f7f7f;
          /*font-size: 30rpx;*/
        }
        p:first-child{
          margin-bottom: 5px;
          margin-top: 6px;
          color: #333333;
          font-weight: 700;
        }
      }
      &:last-child{
        p:first-child{
          color: #a53533;
          font-weight: 700;
          font-size: 30rpx;
          span{
            color: #a53533;
            font-weight: 700;
            font-size: 40rpx;
          }
        }
        p:last-child{
          color: #e89f48;
          font-size: 26rpx;
          border: 1px solid #e89f48;
          border-radius: 4px;
          padding: 0 3px;
        }
      }
    }
  }
  .line{
    height: 25rpx;
    background-color: #f4f4f4;
  }
  .choice{
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #dddddd;
    padding: 0 15px;
    span{
      &:last-child{
        color: #7f7f7f;
      }
    }
  }
  .serve{
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    p{
      flex: 3;
    }
    div{
      flex:1;
      text-align: right;
      align-self: center;
      color: #686868;
    }
    ul{
      flex: 15;
      display: flex;
      flex-wrap: wrap;
      li{
        margin-bottom: 5px;
        margin-right: 40rpx;
        position: relative;
        padding-left: 12px;
        color: #919191;
        font-size: 30rpx;
        &:after{
          content: '';
          width: 8px;
          left: 0;
          top:50%;
          transform: translateY(-50%);
          height: 8px;
          border-radius: 50%;
          background-color: #a53533;
          position: absolute;
        }
      }
    }
  }
  .popular{
    /*padding: 30rpx 0;*/
    text-align: center;
    >p{
      height: 80rpx;
      line-height: 80rpx;
      color: #a53533;
      font-weight: 700;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .parameter{
    padding: 40rpx 20rpx;
    >div{
     height: 70rpx;
    }
    >div, ul li{
      border-bottom: 1px dotted #919191;
    }
    ul{
      li{
        display: flex;
        padding: 15rpx 0;
        font-size: 30rpx;
        p{
          flex: 3;
          color: #999999;
        }
        span{
          flex:8;
          padding-right: 40rpx;
          font-size: 30rpx;
        }
      }
    }
  }
  .wxParse .p {
    margin: 0 !important;
  }
  .wxParse .img{
    display: block !important;
  }
  .issue{
    h4{
      position: relative;
      text-align: center;
      &:after,
      &:before{
        position: absolute;
        width: 100rpx;
        height: 1rpx;
        background-color: #cccccc;
        content: '';
        right: 22%;
        top: 50%;
        transform: translateY(-50);
      }
      &:before{
        left: 22%;
      }
    }
    ul{
      padding: 0 20px;
      li{
        font-size: 30rpx;
        line-height: 42rpx;
        h6{
          position: relative;
          &:before{
            position: absolute;
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            left: -8px;
            top:50%;
            transform: translateY(-50%);
            background-color: #a53533;
          }
        }
        p{
          color: #787878;
        }
      }
    }
  }
</style>
