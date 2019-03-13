<template>
  <div>
    <div class="login">
      <div class="portrait">
        <p class="iconfont icon-icontouxiang"></p>
      </div>
      <p>请登录</p>
    </div>
    <ui class="icon-list">
      <li @click="clickHandel" v-for="(item,index) in iconList" :key="index">
        <div>
          <p :class="item.icon"></p>
          <h6>{{item.name}}</h6>
        </div>
      </li>
    </ui>
    <!--<button open-type="getUserInfo" @getuserinfo="onGotUserInfo">登陆</button>-->
    <!--<div @click="addAddress">获取地址</div>-->
    <!--<div @click="saveAddress">保存地址</div>-->
  </div>
</template>

<script>
  import { nodeAjax } from '@/utils/api'
  export default {
    data() {
      return {
        iconList:[
          {
            icon:'order',
            name: '我的订单',
            navigateTo:''
          },
          {
            icon:'address',
            name: '地址管理',
            navigateTo:''
          },
          {
            icon:'safety',
            name: '账号安全',
            navigateTo:''
          },
          // {
          //   icon:'',
          //   name: '我的足迹',
          //   navigateTo:''
          // },
          {
            icon:'service',
            name: '联系客服',
            navigateTo:''
          },
          {
            icon:'feedback',
            name: '用户反馈',
            navigateTo:''
          },
          {
            icon: 'help',
            name: '帮助中心',
            navigateTo: ''
          }
        ],
        userInfo:{
          code: '',
          userInfo: {},
        },
      };
    },
    created() {
      this.getUserInfo();
      // 其他 scope 测试
      // wx.getSetting({
      //   success(res) {
      //     if (!res.authSetting["scope.address"]) {
      //       wx.authorize({
      //         scope: 'scope.address',
      //         success(){
      //           wx.chooseAddress({
      //             success(obj){
      //               console.test(obj)
      //             }
      //           })
      //         }
      //       })
      //     }
      //   }
      // });
    },
    methods: {
      clickHandel(){
        wx.showToast({
          title: '暂未开发，敬请期待',
          icon: 'none'
        })
      },
      // 获取地址
      addAddress(){
        nodeAjax('address/list').then(res=>{
          console.log(res)
        })
      },
      onGotUserInfo(e) {
        console.log(e.target);
        delete this.userInfo.__keyPath
        nodeAjax('auth/loginByWeixin',this.userInfo,'POST').then(result => {
          wx.setStorage({
            key: 'token',
            data: result.data.token
          })
        })
      },
      getUserInfo() {
        const that = this
        wx.login({
          success(res) {
            // console.log(res);
            that.userInfo.code = res.code
          }
        });
        wx.getUserInfo({
          success(res) {
            // console.log(res);
            that.userInfo.userInfo = res
          }
        });
        }
    },
    components:{
    }
  };
</script>
<style>
  @import "../../font/iconfont.scss";
</style>
<style lang="scss">
.login{
  height: 300rpx;
  background: #dfcea1;
  padding: 40rpx 30rpx;
  display: flex;
  .portrait{
    width: 130rpx;
    height: 130rpx;
    align-self: center;
    background: rgba(255,255,255,.2);
    border-radius: 50%;
    p{
      font-size: 36px;
      text-align: center;
      line-height: 130rpx;
      color: #fff;
    }
    margin-right: 30px;
  }
  >p{
    font-size: 35rpx;
    align-self: center;
    color: #fff;
  }
}
  .icon-list{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 33.3%;
      height: 33.2vw;
      border-bottom: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      align-items: center;
      display: flex;
      justify-content: center;
      div{
      }
      h6{
        text-align: center;
      }
      p{
        margin:0 auto;
        height:52.803rpx;
        width:52.803rpx;
        margin-bottom:16rpx;
      }
      .order{
        background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -437.5rpx no-repeat;
        background-size:52.803rpx;
      }
      .address{
        background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -62.4997rpx no-repeat;
        background-size:52.803rpx;
      }
      .safety {
        background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -500rpx no-repeat;
        background-size:52.803rpx;
      }
      .service{
        background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -312.5rpx no-repeat;
        background-size:52.803rpx;
      }
      .feedback{
        background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -250rpx no-repeat;
        background-size:52.803rpx;
      }
      .help{
        background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -125rpx no-repeat;
        background-size:52.803rpx;
      }
    }
  }
</style>
