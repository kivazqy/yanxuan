<template>
  <div class="recommend-cont">
    <div v-for="(item,index) in dataList" :key="index">
      <div class="ttt">
        <div class="pic">
          <image mode="widthFix" :src="item.scenePicUrl"></image>
          <p class="title">{{item.simpleDesc}}</p>
        </div>
        <!--图片下部文字-->
        <div class="text">
          <block v-if="item.itemTagList">
            <span class="icon" v-for="(name,ind) in item.itemTagList" :key="ind">
                {{name.name}}
            </span>
          </block>
          <span class="name">{{item.name}}</span>
          <span class="price">￥{{item.retailPrice}}</span>
          <span class="old-price" v-if="item.retailPrice!=item.counterPrice">￥{{item.counterPrice}}</span>
          <p v-if="item.hotSaleListBottomInfo">
            <image mode="widthFix" v-if="item.hotSaleListBottomInfo.iconUrl"
                   :src="item.hotSaleListBottomInfo.iconUrl"></image>
            <image mode="widthFix" v-else
                   src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"></image>
            <span>
                <em>{{item.hotSaleListBottomInfo.content}}</em>
              </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "waterfall",
    props:['dataList']
  };
</script>

<style lang="scss">
  .recommend-cont{
    display: flex;
    flex-direction: column;
    width: 48.5%;
    >div{
      margin-bottom: 20px;
    }
    .pic {
      margin-bottom: 5px;
      width: 100%;
      image {
        width: 100%;
        margin-bottom: 0;
        display: block;
      }
      .title {
        height: 50rpx;
        background: #f0ece3;
        font-size: 26rpx;
        color: #9c8c67;
        padding-left: 5px;
        line-height: 50rpx;
        //text-overflow: ellipsis;
        overflow: hidden;
        //white-space: nowrap;
      }
    }
    .text {
      .icon{
        font-size: 22rpx;
        margin-right: 5px;
        background-color:#d7807e;
        color: #fff;
        border-radius: 2px;
        padding: 2px 5px;
      }
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        margin: 5px 0;
      }
      .price {
        color: #a53533;
        font-size: 32rpx;
      }
      .old-price {
        color: #7f7f7f;
        font-size: 24rpx;
        margin-left: 5px;
        text-decoration: line-through;
      }
      > p {
        margin-top: 5px;
        height: 40px;
        background-color: #f4f4f4;
        color: #7f7f7f;
        border-radius: 25px;
        display: flex;
        align-items: center;
        image {
          margin-left: 10px;
          width: 20%;
          //height: 20%;
          border-radius: 50%;
          margin-right: 10px;
        }
        span {
          width: 60%;
          color: #7f7f7f;
          height: 100%;
          font-size: 24rpx;
          padding: 5px 0;
          display: flex;
          align-items: center;
          em {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
</style>
