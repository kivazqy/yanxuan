const URL = 'https://www.easy-mock.com/mock/5c46d8d6ecdb695a28c0d520/kiva/yanxuan'
const APIROOTURL = 'http://127.0.0.1:8360/api/';
// 手机调试模式d
// const APIROOTURL = 'http://192.168.0.107:8360/api/';

export function ajax (url, data, method) {
  let r = new Promise((resolve,reject)=>{    wx.request({
      url: URL+url, //仅为示例，并非真实的接口地址
      data: data || "",
      method: method || "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function(res) {
        if(res.data.code === '200' || res.data.code === 200 ){
          resolve(res.data)
        }else{
          reject(res)
        }
      }
    });
  })
  return r
}
export function nodeAjax(url, data, method) {
  let r = new Promise((resolve,reject)=>{
    wx.request({
      url: APIROOTURL +  url, //仅为示例，并非真实的接口地址
      data: data || {},
      method: method || "GET",
      header: {
        // "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function(res) {
        if(res.data.errno === '0' || res.data.errno === 0 ){
          resolve(res.data)
        }else{
          reject(res)
        }
      }
    });
  })
  return r
}
