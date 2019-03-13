<template>
  <div>
    <scroll-view class="nav-box" scroll-x scroll-with-animation :scroll-into-view="'nav'+id">
      <div @click="clickFn(item)" :class="['cont',{'active':(id-0)===item.id}]" :id="'nav'+item.id" v-for="item in navArr" :key="item.id">
        {{item.name}}
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import bus from '@/utils/bus'
  export default {
    name: "categoryNav",
    props: {
      navArr:{
        type: Array,
        default: []
      },
      navId:{
        type: Number
      }
    },
    data(){
      return{
        id: 0
      }
    },
    onLoad(){
      this.id = this.navId
    },
    methods:{
      clickFn(item){
        console.log(item.id)
        this.id = item.id
        bus.$emit('navToggle',item.id)
      }
    }
  };
</script>

<style lang="scss">
  .nav-box {
    white-space: nowrap;
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1rpx solid #f4f4f4;
    .cont {
      display: inline-block;
      margin: 0 25rpx;
      padding: 0 8rpx;
    }
    .active{
      position: relative;
      color: #9d3631;
      &:after{
        content: '';
        width: 100%;
        height: 3px;
        background: #9d3631;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
</style>
