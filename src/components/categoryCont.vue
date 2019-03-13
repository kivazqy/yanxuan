<template>
  <div>
    <div class="img">
      <navigator>
        <image mode="widthFix" :src="dataFirst.wap_banner_url"></image>
        <span>
          {{dataFirst.front_name}}
        </span>
      </navigator>
    </div>
    <ul class="list">
      <li v-for="(item,index) in dataFirst.subCategoryList" :key="index">
        <navigator :url="'../categoryList/main?id='+item.id">
          <image :src="item.wap_banner_url" mode="widthFix"></image>
          <span>{{item.name}}</span>
        </navigator>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "navCont",
    props: ["dataFirst"]
  };
</script>

<style lang="scss">
  .img {
    min-height: 82px;
    navigator{
      position: relative;
      width: 100%;
      image {
        width: 100%;
        height: auto;
      }
      span {
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  .list{
    display: flex;
    justify-content: flex-start ;
    flex-wrap: wrap;
    li{
      width: 33.3%;
      text-align: center;
      image{
        width: 80%;
        height: auto;
      }
      span{
        font-size: 26rpx;
        display: block;
        text-align: center;
      }
    }
  }
</style>
