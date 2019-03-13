<template>
  <scroll-view
    class="scroll"
    scroll-x>
    <div class="cont" @click="navigateTo(item.id)" v-for="(item,index) in dataList" :key="item.id">
      <image mode="widthFix" :src="item.list_pic_url"></image>
      <div class="msg">
        <h6>{{item.name}}</h6>
        <p>￥{{item.retail_price}}</p>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  export default {
    name: "scrollList",
    props: ["dataList"],
    methods:{
      navigateTo(id){
        this.$emit('scrollFn',id)
      }
    }
  };
</script>

<style lang="scss">
  .scroll{
    white-space: nowrap;
    .cont{
      margin: 16rpx 20rpx;
      margin-top: 0;
      display: inline-block;
      width: 35%;
      text-align: left;
      image{
        height: auto;
        width: 100%;
      }
      h6{
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p{
        color: #a53533;
      }
    }
  }

</style>
