<template>
  <!--<scroll-view :scroll-into-view="scrollId" class="scroll-box" scroll-x="true" @touchend="touchEndFn"-->
  <!--@touchstart="touchStartFn">-->
  <!--<div v-for="(item,index) in navList" :key="index" :id="'c'+index" class="tab-box" :ref="'r'+item.id">-->
  <div class="switch">
    <div class="title">
      <p>{{titleMsg.name}}</p>
      <span>{{titleMsg.title}}</span>
    </div>
    <div class="goods-box" v-if="list.length>0">
      <div class="goods" v-for="(item,ind) in list" :key="item.id">
        <navigator :url="'../details/main?id='+item.id">
          <image mode="widthFix" :src="item.list_pic_url"></image>
          <div class="msg">
            <p>{{item.name}}</p>
            <span>￥{{item.retail_price}}</span>
          </div>
        </navigator>
      </div>
    </div>
    <div class="goods-box null-data" v-if="list.length<1 && !loading">
          <span>
            该分类下暂无商品哦~
          </span>
    </div>
    <div class="goods-box null-data" v-if="loading">
     <span> 加载中...</span>
    </div>
  </div>
  <!--</div>-->
  <!--</scroll-view>-->
</template>

<script>
  import { nodeAjax } from "@/utils/api";
  import bus from "@/utils/bus";
  // let innerAudioContext = null
  export default {
    name: "switchList",
    data() {
      return {
        list: [],
        loading: true
      };
    },
    props: {
      // initial:{
      //   type:Number
      // },
      isRequested: {
        type: Boolean,
        default: false
      },
      listId: {
        type: Number,
        default: 1
      },
      titleMsg: {
        type: Object,
        default: {
          "name": "",
          "title": ""
        }
      }
      // navList: {
      //   type: Array,
      //   default: []
      // }
    },
    // lifetimes:{
    //   detached(){
    //     console.log('detached')
    //   },
    // },
    // onShow(){
    //   // if (this.isRequested) {
    //   // }
    //   console.log('onshpw')
    //   this.listInfo();
    // },
    created(){
    },
    onLoad(option) {
      bus.$on("navToggle", (id) => {
        this.id = id
        this.listInfo(id);
      });
    },
    onShow(){
      this.list = [];
      this.listInfo('','category');
    },
    methods: {
      listInfo(id,type) {
        wx.showLoading({
          title: '加载中',
        })
        let _id = 0, that = this;
        if (id) {
          _id = id;
        } else {
          that.name = that.titleMsg.name;
          that.title = that.titleMsg.title;
          _id = that.listId;
        }
        nodeAjax("goods/list", {
          categoryId: _id,
          page: 1,
          size: 10000
        }).then(res => {
          if (res.errno === 0) {
            that.list = res.data.data;
          }
        });
        if(type !== 'category'){
          nodeAjax("goods/category", {
            id: _id
          }).then(res => {
            if (res.errno === 0) {
              that.titleMsg.name = res.data.currentCategory.name;
              that.titleMsg.title = res.data.currentCategory.front_name;
            }
          });
        }
        this.isRequested = false
        wx.hideLoading()
        this.loading = false
      },
      // touchStartFn(e) {
      //   this.startX = e.pageX;
      // },
      // touchEndFn(e) {
      //   let x = e.mp.changedTouches[0].pageX;
      //   if (x - this.startX > 0 && x - this.startX > 50) {
      //     // 向左滑动
      //     console.test("准备向左");
      //     this.scrollId = "box2";
      //   } else if (this.startX - x > 0 && this.startX - x > 50) {
      //     // 向右滑动
      //     console.test("准备向右");
      //     this.scrollId = "box3";
      //   }
      // },
    }
  };
</script>

<style lang="scss">
  .scroll-box {
    padding: 0 10px;
    white-space: nowrap;
    > div {
      display: inline-block;
      height: 100px;
      width: 100%;
    }
  }

  .tab-box {
    display: inline-block;
  }

  .switch {
    background-color: #f9f9f9;
    .title {
      height: 60px;
      text-align: center;
      p {
        padding-top: 10px;
      }
      span {
        color: #b3b3b3;
      }
    }
  }

  .null-data {
    text-align: center;
    background-color: #fff;
    position: relative;
    span {
      margin-top: 20px;
      position: absolute;
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .goods-box {
    display: flex;
    padding: 0 10px;
    /*justify-content: center;*/
    flex-direction: row;
    flex-wrap: wrap;
    .goods {
      background-color: #fff;
      margin-bottom: 2vw;
      width: 48%;
      navigator {
        text-align: center;
        .msg {
          padding: 0 10px;
        }
        span {
          color: #b4282d;
        }
        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        image {
          width: 100%;
        }
      }
    }
    .goods:nth-child(odd) {
      margin-right: 2%;
    }
  }
</style>
