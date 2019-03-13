<template>
  <div class="box">
    <!--顶部搜索-->
    <div class="search">
      <div>
        <span class="iconfont icon-sousuo"></span>
        <span @click="searchFn">搜索商品，共239款好物</span>
      </div>
    </div>
    <!--banner部分-->
    <div class="banner">
      <swiper
        class="banner-swiper"
        indicator-dots="true"
        indicator-active-color="#a53533"
        indicator-color="rgba(255, 255, 255, 0.9)"
        previous-margin="15px"
        next-margin="15px"
        autoplay="true"
        circular="true">
        <block v-for="(item, index) in bannerList " :key="index">
          <navigator>
            <swiper-item class="banner-item">
              <image :src="item.url" alt=""/>
            </swiper-item>
          </navigator>
        </block>
      </swiper>
    </div>
    <!--服务广告语-->
    <ul class="ad-hd">
      <li><span class="iconfont icon-quangou"></span>网易自营品牌</li>
      <li><span class="iconfont icon-quangou"></span>30天无忧退货</li>
      <li><span class="iconfont icon-quangou"></span>48小时快速退款</li>
    </ul>
    <!--特价图片-->
    <div class="sale-img">
      <navigator>
        <image mode="widthFix" src="../../images/sale-img.png" alt=""/>
      </navigator>
    </div>
    <!--免邮拼团-->
    <div class="group">
      <!--头部文字-->
      <div class="hd">
        <span>免邮拼团</span>
        <span><navigator>更多 ></navigator></span>
      </div>
      <!--底部图片-->
      <div class="ft">
        <swiper
          @change="groupChange"
          class="group-swiper"
          indicator-active-color="#a53533"
          indicator-color="rgba(0, 0, 0, 0.3)"
          indicator-dots="true">
          <block v-for="item in 4" :key="item">
            <swiper-item class="group-cont">
              <block v-for="(img,ind) in groupNowList[item]" :key="ind">
                <navigator>
                  <div class="cont-box">
                    <div class="img-box">
                      <span>{{img.userNum}}人团</span>
                      <image :src="img.picUrl"/>
                    </div>
                    <div class="img-txt">
                      <span>拼团价￥{{img.price}}</span>
                      <em>￥{{img.originPrice}}</em>
                    </div>
                  </div>
                </navigator>
              </block>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <!--分隔栏-->
    <div class="line-gary"></div>
    <!--模块略去-->
    <!--品牌制造商直供-->
    <div class="supply">
      <h2 class="model-title">
        <span>品牌制造商直供</span>
        <span><navigator>更多 ></navigator></span>
      </h2>
      <div class="supply-cont">
        <navigator v-for="item in supplyList" :key="item.materialId">
          <div class="box">
            <div class="text">
              <p>来自{{item.materialName}}</p>
              <div class="text-price">
                <span>{{item.price}}元起</span><em>上新</em>
              </div>
            </div>
            <image mode="widthFix" :src="item.pic"></image>
          </div>
        </navigator>
      </div>
    </div>
    <!--图片模块-->
    <div class="wy-reco">
      <navigator>
        <image mode="widthFix" src="https://yanxuan.nosdn.127.net/729bd2e31e6f7837a08186259feb8d69.png"></image>
      </navigator>
    </div>
    <!--分隔栏-->
    <div class="line-gary">
    </div>
    <!--限时购-->
    <div class="time-shopping">
      <h2>
        <div>
          <span>限时购</span>
          <p><em>{{countDown.hour}}</em>：<em>{{countDown.min}}</em>：<em>{{countDown.second}}</em></p>
        </div>
        <span><navigator>更多 ></navigator></span>
      </h2>
      <div class="time">
        <navigator v-for="(item,index) in timeList" :key="index" class="time-box">
          <image mode="widthFix" :src="item.pic"></image>
          <p><span>￥{{item.price}}</span><span>￥{{item.oldPrice}}</span></p>
        </navigator>
      </div>
    </div>
    <!--分隔栏-->
    <div class="line-gary">
    </div>
    <!--人气推荐-->
    <div class="popularity">
      <h2>
        <span>人气推荐</span>
        <span><navigator>更多 ></navigator></span>
      </h2>
      <div class="popularity-cont">
        <navitator :class="{'first':item.sequen==1,'other':item.sequen!=1}" v-for="(item,index) in popularityList"
                   :key="index">
          <image mode="widthFix" :src="item.extra.resource.picture"></image>
          <div class="text">
            <span class="icon"
                  v-if="(item.sequen!=1)&&(item.extra.resource.tagTxt!='')">{{item.extra.resource.tagTxt}}</span>
            <p>{{item.extra.resource.materialName}}</p>
            <span class="introduce" v-if="item.sequen==1">
              {{item.extra.resource.introduce}}
            </span>
            <span class="price">￥{{item.extra.resource.price}}</span>
          </div>
        </navitator>
      </div>
    </div>
    <!--分隔栏-->
    <div class="line-gary"></div>
    <!--类目热销榜-->
    <div class="kindHot">
      <h2>
        <span>类目热销榜</span>
      </h2>
      <div class="hot">
        <navigator :class="{'first':item.sequen<3,'other':item.sequen>2}" v-for="(item,index) in kindHotList"
                   :key="index">
          <div class="text">
            <span>{{item.name}}</span>
            <span v-if="item.sequen<3" class="line"></span>
          </div>
          <image mode="widthFix" :src="item.url"></image>
        </navigator>
      </div>
    </div>
    <!--分隔栏-->
    <div class="line-gary"></div>
    <!--为你推荐-->
    <div class="recommend">
      <h2>为你推荐</h2>
      <div class="recommend-box">
        <waterfall :dataList="recommendListL"></waterfall>
        <waterfall :dataList="recommendListR"></waterfall>
      </div>
    </div>
    <div class="loading" v-show="loading">
      {{loadingTxt}}
    </div>
  </div>
</template>

<script>
  import waterfall from "@/components/waterfall";
  import { ajax,nodeAjax } from "@/utils/api";

  export default {
    data() {
      return {
        userInfo: {},
        bannerList: [],
        groupList: [],
        groupNowList: [],
        supplyList: [],
        timeList: [],
        popularityList: [],
        kindHotList: [],
        recommendListL: [],
        recommendListR: [],
        recommendPage: 1,
        recommendPageMax: 0,
        listDone: false,
        loading: false,
        loadingTxt: "加载中...",
        currentIndex:1,
        countDown: {
          hour: "",
          min: "",
          second: ""
        },
        recommendType: true
      };
    },
    // 下拉事件
    onPullDownRefresh(){
      this.getData();
      this.countDownFn();
    },
    components: {
      waterfall,
    },
    // 下拉事件 - 用于顶部搜索定位
    // onPageScroll(num){
    //   if(num.scrollTop < shop){
    //     this.searchFix = false
    //   }else{
    //     this.searchFix = true
    //   }
    // },
    // 触底事件 - 用于为你推荐模块
    onReachBottom() {
      // 加载猜你喜欢模块
      this.getRecommend();
    },

    onLoad: (options)=> {
    },
    methods: {
      // 跳转搜索页
      searchFn(){
        wx.navigateTo({
          url: '../search/main'
        })
      },
      // 倒计时
      countDownFn() {
        const that = this;
        fn();
        function fn () {
          let date = new Date();
          let time = {
            hour: that.appendZero(23 -  date.getHours()),
            min: that.appendZero(59  -  date.getMinutes()),
            second: that.appendZero(59 -  date.getSeconds())
          }
          that.countDown = time
          setTimeout(fn,1000)
        }
      },
      appendZero(num){
        if(num > 9){
          return num
        }else{
          return '0'+num
        }
      },
      // 汇总所有初始接口，使用promise.all 同时请求
      getData() {
        let requestList = Promise.all([this.getBanner(), this.getGroup(), this.getSupply(), this.getTime(), this.getPopularity(), this.getKindHot(),this.getRecommend()]).then(res => res).catch(e => {
          console.log(e);
        });
        return requestList;
      },
      async getRecommend() {
        if (this.recommendType) {
          let that = this;
          this.loading = true;
          if (this.listDone) {
            this.loadingTxt = "没有啦~";
            return;
          }
          that.recommendType = false
          let r = await ajax(`/recommend${this.recommendPage}`, "", "GET").then(res => {
            let r = [], l = [];
            res.data.forEach((v, i) => {
              if (i % 2) {
                r.push(v);
              } else {
                l.push(v);
              }
            });
            if (that.recommendPage === 1) {
              that.recommendListR = r;
              that.recommendListL = l;
            } else {
              that.recommendListR = that.recommendListR.concat(r);
              that.recommendListL = that.recommendListL.concat(l);
            }
            that.recommendPageMax = res.maxPage;
            if (that.recommendPage === res.maxPage - 0) {
              that.listDone = true;
            } else {
              that.recommendPage++;
            }
            that.loading = false;
            that.recommendType = true
          });
          return r;
        }
      },
      async getKindHot() {
        let r = await ajax("/kindhot", "", "GET").then(res => {
          this.kindHotList = res.data;
        });
      },
      async getPopularity() {
        let r = await ajax("/popularity", "", "GET").then(res => {
          this.popularityList = res.data;
        });
        return r;
      },
      async getTime() {
        let r = await ajax("/timeLimit", "", "GET").then(res => {
          this.timeList = res.data;
        });
        return r;
      },
      async getBanner() {
        let r = await ajax("/banner", "", "GET").then((res) => {
          this.bannerList = res.data.list;
        });
        return r;
      },
      async getGroup() {
        let r = await ajax("/group", "", "GET").then(res => {
          let list = res.data.slice(0, 12);
          this.groupList = list;
          for (let i = 0; i < 4; i++) {
            this.groupNowList[i] = list.slice(i * 3, (i * 3) + 3);
          }
        });
        return r;
      },
      async getSupply() {
        let r = await ajax("/supply", "", "GET").then(res => {
          this.supplyList = res.data;
        });
        return r;
      },
      // 滑动免邮拼团
      groupChange(event) {
        let num = event.target.current;
        // this.groupNowList = this.groupList.slice(num * 3, (num * 3) + 3);
      },
      bindViewTap() {
        const url = "../logs/main";
        wx.navigateTo({ url });
      },

      clickHandle(msg, ev) {
        console.log("clickHandle:", msg, ev);
      }
    },
    created() {
      // 调用应用实例的方法获取全局数据
      // this.getUserInfo();
      this.getData();
      this.countDownFn();
    }
  };
</script>
<style>
  @import "../../font/iconfont.scss";
</style>
<style lang="scss">
  @import "../../css/home.scss";
</style>
