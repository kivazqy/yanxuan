<template>
  <div class="classify">
    <!--左侧导航栏-->
    <ul class="let-nav">
      <li :class="{'active':navActive===item.id}" @click="navClickFn(item)" v-for="(item,index) in leftNavArr" :key="index">{{item.name}}</li>
    </ul>
    <!--右侧详情组件-->
    <div class="cont">
      <category-Cont :dataFirst="firstObj" ></category-Cont>
      <!--<nav-second v-else="contName==='nav-second'" :dataSecond="secondObj"></nav-second>-->
    </div>
  </div>
</template>

<script>
import {ajax,nodeAjax} from '@/utils/api'
import navCont from '@/components/categoryCont'
export default {
  data () {
    return {
      leftNavArr: [],
      navActive: 1005000,
      firstObj:{},
    }
  },
  methods:{
    getDataInfo(){
      let requestList = Promise.all([this.leftNav()]).then(res=>res).catch(err=>{
      })
      return requestList
    },
    // 左侧请求
    async leftNav(){
      let r = await nodeAjax('catalog/index','','GET').then(res=>{
        this.leftNavArr = res.data.categoryList
        this.firstObj = res.data.currentCategory
      })
      return r
    },
    // 点击左侧导航 - 变换右侧组件 发送请求
    navClickFn(item){
      this.contFn(item.id)
      this.navActive = item.id
    },
    // 右侧请求 第一项
    async contFn(id){
      let that = this
      let r = await nodeAjax('catalog/current',{'id':id},'GET').then(res=>{
          that.$nextTick(()=>{
            that.firstObj = res.data.currentCategory
          })
      })
      return r
    }
  },
  created () {
    this.getDataInfo()
  },
  components:{
    'category-Cont':navCont
  }
}
</script>

<style lang="scss">
  .classify{
    display: flex;
    flex-direction: row;
  }
.let-nav{
  width: 20%;
  border-right: 1rpx solid #d9d9d9;
  min-height: 100vh;

  li {
    /*font-size: 28rpx;*/
    line-height: 75rpx;
    text-align: center;
    position: relative;
  }
  li.active{
    color: #9d3631;
    font-size: 34rpx;
  }
  li.active::after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 50%;
    width: 2px;
    background-color: #9d3631;
  }
}
  .cont{
    padding: 20rpx;
    width: 80%;
  }
</style>
