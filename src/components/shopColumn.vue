<template>
  <div>
    <ul class="shopping">
      <li @click="navigatorToFn('home')" class="home"></li>
      <li class="car" @click="navigatorToFn('shop')">
          <span>{{goods}}</span>
      </li>
      <li class="buy">立即购买</li>
      <li class="add-car" @click="select=!select;selectHandel()">加入购物车</li>
    </ul>
    <!-- 遮盖层-->
    <div class="select" v-show="select">
        <div class="cont">
          <div class="hd">
            <div class="img">
              <image :src="data.imgSrc" mode="widthFix"></image>
            </div>
            <div class="price">
              <p>￥{{data.price}}</p>
              <span>请选择数量规格</span>
            </div>
            <div class="close" @click="select=false">×</div>
          </div>
          <div class="bd">
            <!--<ul>-->
              <!--<li v-for="(item,index) in data.specificationList" :key="index">-->
                <!--<h6>{{item.name}}</h6>-->
                <!--<span v-for="(child,ind) in item.valueList" :index="ind">-->
                  <!--{{child.value}}-->
                <!--</span>-->
              <!--</li>-->
            <!--</ul>-->
          </div>
          <div class="quantity">
            <p>数量</p>
            <div>
              <span :class="[{'sub':sub},'iconfont','icon-jian']" @click="numSubFn" ></span>
              <span>{{num}}</span>
              <span @click="num++;sub=false" class="iconfont icon-jia"></span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {nodeAjax} from '@/utils/api'
  export default {
    name: "shopColumn",
    props:['goods','data'],
    data(){
      return {
        goodsId: 0,
        num: 1,
        select: false,
        sub: true,
        id: 0,
      }
    },
    onShow(){
      this.num = 1
    },
    methods: {
      numSubFn(){
        if(this.num === 1 ){
          return
        }else if(this.num === 2) {
          this.sub = true;
          this.num--
        }else{
          this.num--
        }
      },
      selectHandel(){
        if(!this.select){
          nodeAjax('cart/add',{
            goodsId: this.data.goodsId,
            number: this.num,
            productId: this.data.id
          },'POST').then(res=>{
            if(res.errno === 0){
              this.goods = res.data.cartTotal.goodsCount
            }else{
              debugger
              wx.showToast({
                title: res.errmsg,
                icon: 'none',
                duration: 2000//持续的时间
              })
            }
          })
          this.num = 1
        }
      },
      navigatorToFn(name){
        if(name === 'home' || name === 'shop'){
          wx.switchTab({
            url: `../${name}/main`
          })
        }
      }
    }
  };
</script>
<style>
  @import "../font/iconfont.scss";
</style>
<style lang="scss">
  .shopping{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    z-index: 10;
    background-color: #fff;
    display: flex;
    border-top: 1rpx solid #d9d9d9;
    li{
      border-right: 1rpx solid #d9d9d9;
    }
    li:last-child{
      border-right-color: #a53533;
    }
    .home,
    .service,
    .car{
      width: 45px;
      background-image: url('../images/home.png');
      background-repeat: no-repeat;
      background-size: 42rpx;
      background-position: center;
    }
    .car{
      position: relative;
      span{
        height:28rpx;
        width:28rpx;
        z-index:10;
        position:absolute;
        top:7px;
        right:4px;
        background:#b4282d;
        text-align:center;
        font-size:18rpx;
        color:#fff;
        line-height:28rpx;
        border-radius:50%;
      }
    }
    .buy,
    .add-car{
      flex: 2;
      text-align: center;
    }
    .service{
      background-image: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/detail-kefu-d10f0489d2.png);
      background-size: 40rpx;
      background-position:center;
    }
    .car{
      background-image: url('../images/car.png');
    }
    .add-car{
      background: #a53533;
      color: #fff;
    }
  }
  .select{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.3);
    position: fixed;
    top: 0;
    left: 0;
    .cont{
      min-height: 180rpx;
      background-color: #fff;
      padding: 30rpx;
      position: absolute;
      bottom: 90rpx;
      left: 0;
      width: 100%;
      .hd{
        display: flex;
        .img{
          width: 240rpx;
          margin-right: 10px;
          image{
            width: 100%;
          }
        }
        .price{
          margin-top: 140rpx;
          p{
            color: #a53533;
          }
        }
        .close{
          font-size: 30px;
          color: #959595;
          position: absolute;
          right: 30rpx;
          top: 0;
        }
      }
    }
    .quantity{
      margin-top: 10px;
      div{
        margin-top: 5px;
        .sub{
          opacity: 0.5;
        }
        span{
          display: inline-block;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 34rpx;
          text-align: center;
          &:nth-child(1),
          &:nth-child(3){
            color: #959595;
            width: 80rpx;
            border:1px solid #a8a8a8;
          }
          &:nth-child(1){
            border-right-width: 0;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          &:nth-child(2){
            width: 100rpx;
            border:1px solid #a8a8a8;
            color: #333;
            position: relative;
            top: 2px;
          }
          &:nth-child(3){
            border-left-width: 0;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
        }
      }
    }
  }
  .bd{
    ul{
      li{
        /*display: flex;*/
        h6{
          margin: 5px 0;
        }
        span{
          display: inline-block;
          font-size: 30rpx;
          padding: 15rpx;
          border: 1rpx solid #cfcfcf;
          margin-right: 10rpx;
          border-radius: 3px;
        }
        .active{
          border-color: #a53533;
        }
      }
    }
  }
</style>
