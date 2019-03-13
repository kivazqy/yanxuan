<template>
  <div>
    <div class="nav">
      <scroll-view class="nav-box" scroll-x scroll-with-animation :scroll-into-view="'nav'+id">
        <div @click="clickFn(item)" :class="['cont',{'active':(id-0)===item.id}]" :id="'nav'+item.id"
             v-for="item in navArr" :key="item.id">
          {{item.name}}
        </div>
      </scroll-view>
    </div>
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
  </div>
</template>

<script>
  import { nodeAjax } from "@/utils/api";

  export default {
    data() {
      return {
        navArr: [],
        id: 0,
        x: 25,
        touchEnd: false,
        startX: 0,
        endX: 0,
        list: [],
        isRequested: false,
        titleMsg: {
          "name": "",
          "title": ""
        },
        loading: true
      };
    },
    onUnload() {
      // 解决第二次打开页面仍有上一次渲染结果的闪动情况
      this.list = [];
    },
    onLoad(option) {
      this.id = option.id;
      this.dataInfo();
      this.listInfo(option.id);
    },
    methods: {
      clickFn(item) {
        this.id = item.id;
        this.listInfo(item.id);
      },
      listInfo(id, type) {
        wx.showLoading({
          title: "加载中"
        });
        let that = this;
        nodeAjax("goods/list", {
          categoryId: id,
          page: 1,
          size: 10000
        }).then(res => {
          if (res.errno === 0) {
            that.list = res.data.data;
          }
        });
        if (type !== "category") {
          nodeAjax("goods/category", {
            id: id
          }).then(res => {
            if (res.errno === 0) {
              that.titleMsg.name = res.data.currentCategory.name;
              that.titleMsg.title = res.data.currentCategory.front_name;
            }
          });
        }
        wx.hideLoading();
        this.loading = false;
      },
      dataInfo() {
        let that = this;
        nodeAjax("goods/category", { "id": that.id }, "GET").then(res => {
          if (res.errno === 0) {
            // 修改页面title
            wx.setNavigationBarTitle({
              title: res.data.currentCategory.name,
              success: function(res) {
                // success
              }
            });
            that.navArr = res.data.brotherCategory;
            that.id = res.data.currentCategory.id;
            that.titleMsg.name = res.data.currentCategory.name;
            that.titleMsg.title = res.data.currentCategory.front_name;
          }
        });
      }
      // 原用于横向滚动
      // listHandel(arr) {
      //   let list = [];
      //   arr.forEach((item, index) => {
      //     nodeAjax("goods/list", {
      //       categoryId: item.id,
      //       page: 1,
      //       size: 1000
      //     }).then(res => {
      //       if (res.errno === 0) {
      //         list.push(res.data.data);
      //       }
      //     });
      //   })
      //   this.list = list
      //   console.test(list)
      // }
    },
    components: {
    }
  };
</script>

<style lang="scss">
.nav{
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
        height:auto;
        background-color: #fff;
        margin-bottom: 2vw;
        width: 49%;
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
            height:auto;
            width: 100%;
          }
        }
      }
      .goods:nth-child(odd) {
        margin-right: 2%;
      }
  }

</style>
