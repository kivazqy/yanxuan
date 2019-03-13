<template>
  <div>
    <!-- 顶部title-->
    <div class="hd">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 商品列表-->
    <div class="bd">
      <ul>
        <li v-for="item in list" :key="item.id">
          <slider-left @delete="deleteHandel(item)" class="slider-left">
            <span @click="checkHandel(item)" :class="['iconfont',{'icon-xuanzhong':item.checked===1},{'icon-unselected':item.checked===0},'check']"></span>
            <div class="cont">
              <image @click="navigatorTo(item.goods_id)" mode="widthFix" :src="item.list_pic_url"></image>
              <div class="msg">
                <h6>{{item.goods_name}}</h6>
                <p></p>
                <div class="price">
                  <span>￥{{item.retail_price}}</span>
                  <ol>
                    <li @click="checkNumHandel(0,item)" :class="['iconfont','icon-jian',{'sub':item.number===1}]"></li>
                    <li>{{item.number}}</li>
                    <li  @click="checkNumHandel(1,item)" class="iconfont icon-jia"></li>
                  </ol>
                </div>
              </div>
            </div>
          </slider-left>
        </li>
      </ul>
    </div>
    <!-- 底部下单-->
    <div class="ft">
      <div class="choose">
        <span @click="allCheck" :class="['iconfont',{'icon-xuanzhong': info.goodsCount===info.checkedGoodsCount},{'icon-unselected': info.goodsCount!==info.checkedGoodsCount}]"></span>
        <span class="check-msg" v-show="info.checkedGoodsCount > 0">已选({{info.checkedGoodsCount}})</span>
        <span class="check-msg" v-show="info.checkedGoodsCount === 0">全选</span>
      </div>
      <div class="order">
        <span>￥{{info.checkedGoodsAmount}}</span>
        <button @click="purchase">下单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {nodeAjax} from "../../utils/api";
  export default {

    data() {
      return {
        list:[],
        info:{},
        checkNum: 0,
        token: ''
      };
    },

    onShow() {
      this.dataInfo()
      // let that = this;
      // wx.getStorage({
      //   key: 'token',
      //   success(res) {
      //     that.token = res.data
      //   }
      // })
    },
    onPullDownRefresh(){
      this.dataInfo()
    },
    created(){
    },

    methods:{
      // 下单
      purchase(){

        // if(this.checkNum > 0){
        //   if(this.token){
        //     wx.navigateTo({
        //       url: '../affirmInfo/main'
        //     })
        //   }else{
        //     wx.showToast({
        //       title: '请先登录',
        //       image: '../../images/fail.png',
        //     })
        //     setTimeout(function() {
        //       wx.switchTab({
        //         url: '../my/main'
        //       });
        //     })
        //   }
        // }else{
        //   wx.showToast({
        //     title: '请选择商品',
        //     image: '../../images/fail.png'
        //   })
        // }
        wx.showToast({
            title: '暂未开发，敬请期待',
            icon: 'none'
          })
      },
      deleteHandel(item){
        nodeAjax('cart/delete',{
          productIds: item.product_id.toString()
        },'POST').then(res=>{
          if(res.errno === 0){
            this.list = res.data.cartList
            this.info = res.data.cartTotal
            this.checkNum = res.data.cartTotal.checkedGoodsCount
          }
        })
      },
      navigatorTo(id){
        wx.navigateTo({
          url: `../details/main?id=${id}`
        })
      },
      dataHandel(res){
        this.list = res.data.cartList
        this.info = res.data.cartTotal
        this.checkNum = res.data.cartTotal.checkedGoodsCount
      },
      allCheck(){
        let type = null,
          arr = []
        // 全选状态
        if(this.info.checkedGoodsCount === this.info.goodsCount){
          type = 0
        }else{
          type = 1
        }
        this.list.forEach((item,index)=>{
         arr.push(item.product_id)
        })
        nodeAjax('cart/checked',{
          isChecked: type,
          productIds: arr.join()
        },'POST').then(res=>{
          if(res.errno === 0){
            this.dataHandel(res)
          }
        })
      },
      dataInfo(){
        nodeAjax('cart/index').then(res=>{
          let data = res.data
          if(res.errno === 0){
            this.dataHandel(res)
          }
        })
      },
      checkHandel(item){
        const that = this
        nodeAjax('cart/checked',{
          isChecked: item.checked===1?'0':'1',
          productIds: item.product_id
        },'POST').then(res=>{
          let data = res.data
          if(res.errno === 0){
            this.dataHandel(res)
          }
        })
      },
      checkNumHandel(type,item){
        if(type === 0 && item.number === 1){
          return
        }
        let num = item.number
        if(type === 0){
          num --
        }else{
          num ++
        }
        nodeAjax("cart/update", {
          goodsId: item.goods_id,
          id: item.id,
          number: num,
          productId: item.product_id
        }, "POST").then(res => {
          if (res.errno === 0) {
            this.dataHandel(res)
          }
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
    background-color: #f4f4f4;
  }
  .icon-xuanzhong{
    color: #9d3631;
  }
  .hd{
    background: #f4f4f4;
    padding: 0 40rpx;
    display: flex;
    justify-content: space-between;
    span{
      color: #676767;
      font-size: 28rpx;
      line-height: 80rpx;
      padding-left: 18rpx;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        width: 10rpx;
        height: 10rpx;
        border: 4rpx solid #666666;
        border-radius: 50%;
        left: -5rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .bd{
    padding-bottom: 90rpx;
    ul{
      >li{
        background-color: #ffffff;
        padding: 0 30rpx;
        display: flex;
        height: 170rpx;
        margin-bottom: 18rpx;
        .slider-left{
          span{
            font-size: 30rpx;
          }
        }

        .icon-unselected{
          color: #dbdbdb;
        }
        .check{
          align-self:center;
        }
        .check-in{
          background-color: #9d3631;
        }
        .slider-left{
          .cont{
          width: 100%;
          display: flex;
          padding: 25rpx 25rpx;
          image{
            width: 150rpx;
            background-color: #f4f4f4;
          }
          .msg{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 18rpx;
            padding-right: 25rpx;
            width: 100%;
            h6{
              font-size: 30rpx;
              line-height: 40rpx;
            }
            .price{
              height: 26px;
              display: flex;
              justify-content: space-between;
              span{
                font-size: 30rpx;
              }
              ol{
                display: flex;
                .sub{
                  opacity: 0.4;
                }
                li{
                  line-height: 26px;
                  text-align: center;
                  font-size: 30rpx;
                  &:nth-child(1),
                  &:nth-child(3){
                    color: #7f7f7f;
                    width: 70rpx;
                    font-size: 34rpx;
                    border:1px solid #7f7f7f;
                  }
                  &:nth-child(1){
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-right-width: 0;
                  }
                  &:nth-child(2){
                    width: 90rpx;
                    border:1px solid #7f7f7f;
                    color: #333;
                  }
                  &:nth-child(3){
                    border-left-width: 0;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                  }
                }
              }
            }
          }
        }
        }
      }
    }
  }
  .ft{
    height: 80rpx;
    background-color: #fafafa;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-left: 25rpx;
    display: flex;
    justify-content: space-between;
    .choose{
      display: flex;
      span{
        font-size: 28rpx;
        align-self: center;
        &.check-msg{
          color: #8c8c8c;
          margin-left: 10px;
        }
      }
    }
    .order{
      display: flex;
      span{
        color: #a53533;
        align-self: center;
        margin-right: 15px;
      }
      button{
        width: 200rpx;
        line-height: 3;
        height: 100%;
        background-color: #a53533;
        color: #fff;
        border-radius:0;
        font-size: 30rpx;
        align-self: center;
      }
    }
  }
</style>
