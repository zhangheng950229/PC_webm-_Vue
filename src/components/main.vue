<template>
  <div class="misim" style="height:100%">
    <div class="misim-chat-main">
      <mistop :session="session" @customersToggle="customer" @callCustomer="calls"></mistop>
      <div class="misim-chat-content">
        <message :session="session" :customer="cust" :assasTog="assas" :repTip="repeat" :callCus="callcus" :thinMs="thinmsg" :callJud="judgecount"></message>
        <mistext @callCustomer="calls" :session="session" @assasToggle="assasTog" @repeatTip="rep" @thinMsg="thin"></mistext>
      </div>
      <div class="misim-chat-other">
        <other :session="session" @callCustomer="calls" @callJudge="judge"></other>
      </div>
    </div>
    <button id="sub-shot" type="hidden" @click="subShot"></button>
  </div>
</template>
<style lang="less" scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

</style>
<style lang="less">
body,
html {
  height: 100%;
}

body,
ul {
  margin: 0;
  padding: 0;
}

body {
  color: #4d4d4d;
  font: 12px/1.4em 'Microsoft Yahei', Helvetica, 'Helvetica Neue', Arial, sans-serif;
  background-size: cover;
  font-smoothing: antialiased;
}

ul {
  list-style: none;
}

.misim-app-wrap {
  width: 100%;
  height: 100%
}

.misim-box-btn {
  cursor: pointer;
  background-image: url(../../static/img/kefu1.png);
  background-size: 100%;
  position: fixed;
  top: 50px;
  right: 0;
  width: 60px;
  height: 60px;
  z-index: 90
}

.misim-bigModel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  opacity: 0.5;
  z-index: 98;
  background: #000;
}

.misim-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  opacity: 0.5;
  z-index: 1000;
  background: #000;
}

.misim-dialog-main {
  position: fixed;
  width: 300px;
  height: 120px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -60px;
  display: none;
  z-index: 1001;
  background: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 10px 15px;
  p {
    padding: 20px 10px;
  }
  button {
    border: none;
    outline: none;
    background: transparent;
    position: absolute;
    bottom: 15px;
    cursor: pointer;
  }
  button:first-child {
    right: 60px;
  }
  button:last-child {
    right: 15px;
    color: #ff552e
  }
}

.screenshot-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    position: absolute;
    bottom: 0;
    width: 100px;
    height: 40px;
    z-index: 1000;
    background: none;
    outline: none;
    border: none;
    font-size: 20px;
    color: #fff;
    left: 50%;
    margin-left: -50px
  }
}

#screen-drag {
  width: 100px;
  height: 100px;
  border: 2px solid red;
  position: absolute;
  z-index: 1000;
  background: #fff;
  border-radius: 10px;
  opacity: 0.5;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px
}

.screenshot-main {
  position: absolute;
}

.layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  z-index: 998;
  display: none;
  background: #000;
}

.screenshot-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .screenshot-main {
    border-radius: 10px;
    width: 360px;
    background-color: #fff;
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%;
    -50%);
    div {
      padding: 10px;
    }
    button {
      width: 100%;
      height: 35px;
      outline: none;
      border: none;
      background: transparent;
      border-top: 1px solid #ccc;
      cursor: pointer;
    }
  }
}

.shade-md {
  position: fixed;
  top: 50%;
  left: 50%;
  transition: all 0.5s ease-out;
  z-index: 999;
  width: 700px;
  height: 700px;
  margin-top: -350px;
  margin-left: -350px;
  display: none;
  img {
    position: absolute;
    z-index: 999;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

#misim-app {
  overflow: hidden;
  border-radius: 10px;
  margin: 20px auto;
  width: 762px;
  height: 500px;
  box-shadow: 0 0 12px #ccc;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  margin-left: -381px;
  margin-top: -250px;
  font-family: 'Microsoft Yahei';
  display: none;
  .misim-sidebar,
  .misim-chat-main {
    height: 100%;
  }
  .misim-sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .misim-chat-main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
    .misim-chat-content {
      width: 491px;
      float: left;
      position: relative;
      /*height: 100%;*/
      height: ~'calc(100% - 50px)';
      border-right: solid 1px #ddd;
    }
    .misim-chat-other {
      width: 271px;
      float: right;
      /*height: 100%;*/
      height: ~'calc(100% - 50px)';
      background: #fff;
      position: relative;
    }
  }
  .misim-chat-text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 0;
  }
  .misim-chat-message {
    /*height: ~'calc(100% - 144px)'*/
    height: 306px
  }
  .misim-close {
    width: 30px;
    height: 30px;
    background: red;
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

.jcrop-holder {
  .jcrop-btn {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -40px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    button {
      border: none;
      outline: none;
      margin: 4px 10px;
      background: transparent;
      color: #fff
    }
  }
}

</style>
<script>
$(function() {
  /**
   * [IE10以下提示]
   */
  if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {

    alert("您的浏览器过旧不能使用聊天功能，请升级浏览器版本或者更换浏览器");
    return false;
  }

  /**
   * @namespace
   */
  ;
  (function() {
    var imWeiSpace = {} || window.imWeiSpace;
    imWeiSpace = {
      //截图功能初始化
      screenShotInit: function() {
        var g_width = $("#misim-app").width() > bindHeight().width ? bindHeight().width : $("#misim-app").width();
        html2canvas(document.querySelector('#misim-app'), {
          bgColor: "#fff",
          taintTest: true,
          onrendered: function(canvas) {
            var dataURL = canvas.toDataURL("image/png");
            localStorage.setItem('dataURL', dataURL);
            $("#showM").showmodal({
              flag: "info", //设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
              title: "截屏", //设置模态窗标题
              content: "", //设置模态窗内容
              SWidth: g_width,
              AutoBtn: "发送",
            });
            $("#showModal").on("shown.bs.modal", function() {
              $("#showModal .modal-dialog").css({ "margin-top": "40px", 'width': '762px' });
              $(".modal-body").attr("id", "m_body").css({ "padding": "0px", "overflow": "auto" });
              //在模态框加载的同时做一些动作
              document.getElementById('m_body').appendChild(canvas);
              $(".modal-body").children("canvas").css({ "margin": "0px auto", "width": "100%", "height": 500 });
            });
            $("#close").click(function() {
              //var imgName="PC页面截图_EVA";
              $('#sub-shot').trigger('click');
              jcrop_api.disable();
              jcrop_api.release();
            })

            $('#showModal').click(function() {
              $('.btnBack').find('img').attr('src', './static/img/expression_icon2.png')
            })
          }
        })
      }
    }

    /*******点击裁剪图功能*********/
    var jcrop_api;
    $('.btnBack').click(function() {
      $('.jcrop-tracker').show();
      $('.jcrop-keymgr').next().show();
      if (typeof jcrop_api != 'undefined') {
        jcrop_api.enable()
      } else {

        let el = $('.misim-chat-message')[0];
        el.scrollTop = el.scrollHeight - el.clientHeight;
        $('.misim-app-wrap').Jcrop({
          onDblClick: function() {
            $('.jcrop-btn').remove();
            imWeiSpace.screenShotInit();
          },
          onChange: function() {
            $('.jcrop-tracker')[0].innerHTML = '';
            $('.jcrop-btn').remove();
          },
          onRelease: function() {
            $('.jcrop-tracker').hide();
            $('.jcrop-keymgr').next().hide();
            $('.btnBack').find('img').attr('src', './static/img/expression_icon2.png')
          },
          onSelect: function() {
            localStorage.setItem('mix-h', jcrop_api.tellSelect().h);
            localStorage.setItem('mix-w', jcrop_api.tellSelect().w);
            localStorage.setItem('mix-x', jcrop_api.tellSelect().x);
            localStorage.setItem('mix-y', jcrop_api.tellSelect().y)
            $('.jcrop-holder').append('<div class="jcrop-btn"><button class="jcrop-close">取消</button><button class="jcrop-sub">确定</button></div>');
            var closeBtn = $('.jcrop-close')[0];
            var subBtn = $('.jcrop-sub')[0];
            var close = function() {
              $('.jcrop-btn').remove();
              jcrop_api.disable();
              jcrop_api.release();
              $('.btnBack').find('img').attr('src', './static/img/expression_icon2.png')
            };
            var sub = function() {
              $('.jcrop-btn').remove();
              imWeiSpace.screenShotInit();
            };
            closeBtn.addEventListener('click', close, false);
            subBtn.addEventListener('click', sub, false)

          }
        }, function() {
          jcrop_api = this;
        });
      }

    })

    //绑定屏幕高度
    function bindHeight() {
      var winWidth, winHeight;
      var p = { "width": "", "height": "" };
      // 获取窗口宽度
      if (window.innerWidth)
        winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
      // 获取窗口高度
      if (window.innerHeight)
        winHeight = window.innerHeight;
      else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
      // 通过深入 Document 内部对 body 进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      p.width = winWidth;
      p.height = winHeight;
      return p;
    }
  })()

  /**点击查看大图**/
  $('body').on('click', '.misim-chat-message-img', function() {
    var imgSrc = $(this).attr('src');
    $('.shade-md').show();
    $('.shade-md').html('<img src="' + imgSrc + '" / >');
    $('.shode-layer').show();
  })

  /***点击退出大图*/
  $('body').on('click', '.shode-layer', function() {
    var imgSrc = $(this).attr('src');
    $('.shade-md').hide();
    $('.shade-md').html('');
    $('.shode-layer').hide();
  })
})


/** 载入 store/mistext/message/mistop/other模块**/
import mistext from './text';
import message from './message';
import mistop from './mistop';
import other from './other';
import axios from 'axios';
import qs from 'qs';
import baseData from '../util/util';


export default {
  name: 'hello',
  /**
   * [mounted 数据过载完成后]
   */
   created(){
      /**
       * [动态加载js文件]
       */
      //  var path = 'http://j1.58cdn.com.cn/walle/static';
      // $('<script>').attr('src', ''+path+'/bootstrap.min.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/html2canvas.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/modal.js?').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/jquery.Jcrop.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/sha1.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/base64.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/jQuery.XDomainRequest.js').appendTo($('head'));
      // $('<script>').attr('src', ''+path+'/sdk.js').appendTo($('head'));
   },
  mounted() {
    this.$nextTick(() => {
      let _this = this;
      function loadJS(src, callback){
          var path = 'http://j1.58cdn.com.cn/walle/static';
          $('<script>').attr('src', ''+path+'/bootstrap.min.js').appendTo($('head'));
          $('<script>').attr('src', ''+path+'/html2canvas.js').appendTo($('head'));
          $('<script>').attr('src', ''+path+'/modal.js?').appendTo($('head'));
          $('<script>').attr('src', ''+path+'/jquery.Jcrop.js').appendTo($('head'));
          // $('<script>').attr('src', ''+path+'/sha1.js').appendTo($('head'));
          // $('<script>').attr('src', ''+path+'/base64.js').appendTo($('head'));
          $('<script>').attr('src', ''+path+'/jQuery.XDomainRequest.js').appendTo($('head'));
          // $('<script>').attr('src', ''+path+'/sdk.js').appendTo($('head'));
          for(var i = 0;i<src.length;i++){
              var script = document.createElement('script');
              var head = document.getElementsByTagName('head')[0];
              script.src = src[i];
              head.appendChild(script);
          } 
          
          　if(script.readyState){   //IE
    　　　　　　script.onreadystatechange=function(){
    　　　　　　　　if(script.readyState=='complete'||script.readyState=='loaded'){
    　　　　　　　　　　script.onreadystatechange=null;
    　　　　　　　　　　callback();
    　　　　　　　　}
    　　　　　　}
    　　　　}else{    //非IE
    　　　　　　script.onload=function(){callback();}
    　　　　}
    }
    loadJS(['http://j1.58cdn.com.cn/walle/static/sha1.js','http://j1.58cdn.com.cn/walle/static/sdk.js','http://j1.58cdn.com.cn/walle/static/base64.js'], function(){
      /**反转***/
      function IsReverse(text) {
        return text.split('').reverse().join('');
      }
      /*获取cookie*/
      function getCookie(c_name) {
        if (document.cookie.length > 0) {
          var c_start = document.cookie.indexOf(c_name + "=")
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
          }
        }
        return ""
      }

      /**
       * [获取主站ppu token userid]
       * @copyright 通过主站cookie获取用户信息并保存   如果用户登录获取  不登录不获取
       * @param  {object} [key] jsonp加密url
       * @param  {object} [item] 列表对象
       */
      var AppSecret = 'vWY28KQflfmRL';
      var Nonce = Math.random();
      var Timestamp = new Date().getTime();
      var Signature1 = AppSecret + Nonce + Timestamp;
      var Signature = hex_sha1(Signature1);
      var url = '/swap/im?callback=success_jsonpCallback&appId=10130-sjkf@jAO9wKr3Yj&source=13&clientType=pcweb_shjkf';
      var base = new Base64();
      var result = base.encode(url);

      var len = (result.split('=')).length - 1;
      if ((result.charAt(result.length - 1) == "=") == true) {
        result = result.substr(0, result.length - len);
        result = result + len;
      } else {
        result = result + '0';
      }
      var $data = IsReverse(result);

      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        jsonpCallback: "success_jsonpCallback",
        jsonp: "callback",
        cache: 'true',
        data: {
          //appId: '100238-wb@jJkmqGqSPg2',
          appId:'10130-sjkf@jAO9wKr3Yj',
          source: '13',
          clientType: 'pcweb_shjkf',
          key: $data

        },
        beforeSend: function(xhr) {

          xhr.setRequestHeader('PPU', getCookie("PPU"));


        },
        url: 'http://ppuswapapi.58.com/swap/im',
        success: function(data) {
          // console.log(data);
          /**
           * [获取主站信息后 初始化sdk通信]
           * @copyright 获取主站cookie成功后 初始化 
           */
           let initUser = {};
           var pronum = Math.floor(Math.random()*100000000000000);  //随机生成

           var test = ['17669340760369','99194977227553','47951154084142','1234567890123456'];//测试数据
           var random = Math.floor(Math.random()*test.length);
           var testran = test[random];
          if(data.token){
                sessionStorage.setItem('userId', data.userId);
                initUser = {
                  user_id:data.userId,
                  source: '13',
                  client_version: '1.0',
                  im_token: data.token,
                  appid: '10130-sjkf@jAO9wKr3Yj',
                  client_type: 'pcweb_shjkf', // 设备信息上报(需要引入拓展功能中的信质设备信息上报的js代码)
                  //  getNewToken:function(cb){                               // im-token非法需要重新换取 
                  //     cb()
                  // }

                };
                console.log(sessionStorage.getItem('userId'))
                

          }else{
                 sessionStorage.setItem('userId', testran);
                 initUser = {
                  user_id:testran,
                  source: '13',
                  device: testran,
                  client_version: '1.0',
                  im_token:'',
                  appid: '10130-sjkf@jAO9wKr3Yj',
                  client_type: 'pcweb_shjkf', // 设备信息上报(需要引入拓展功能中的信质设备信息上报的js代码)
                  //  getNewToken:function(cb){                               // im-token非法需要重新换取 
                  //     cb()
                  // }

                };
                 
          }
          
        // let client_type = 'pcweb_shjkf',
        //     appid = '10130-sjkf@jAO9wKr3Yj',
        //     version = '1.0',


          let options = $.extend({}, initUser);

          options.comet = 'http://integrateimget.58.com:443/v3/recvmsg';
          options.api = 'http://integrateim.58.com';

          // options.comet = 'https://imgets.58.com/v3/recvmsg';
          // options.api = 'https://im.58.com';
          options.uploadimg = 'http://upload.58cdn.com.cn/json';
           console.log(options);
          let webimbiz = new WebIMSDK(options);
          window.webimbiz = webimbiz;
          webimbiz.start();


          jQuery.imSdk = {
            webimbiz: webimbiz
          }
          /**
           * [login 通信登录]
           * @copyright sdk登录成功 
           */
          webimbiz.addEventListener('login', function() {
             console.log('登录成功');

          })

          /**
           * [logout 通信退出]
           * @copyright 退出成功 
           */
          webimbiz.addEventListener('logout', function() {

             console.log('退出成功');

          });

          //联系人在线状态发生改变
          webimbiz.addEventListener('contactOnlineStatusChanged', function(data) {
            console.log(data)
          });

          /**
           * [msgReceived 收到消息]
           * @copyright sdk收消息成功  当前的客服id跟收到的客服id一致时 更新会话列表
           */
          window.webimbiz.addEventListener('msgReceived', list => {
             console.log(list)
            if (list[0].msg_list[0].msg_type == 44) {
              ++_this.num;
              // _this.$emit("callJudge",{
              //   num:_this.num
              // });
              _this.judgecount = _this.num
            } else {
              // if (list[0].msg_list[0].content.msg) {
              if (list[0].sender_id == localStorage.getItem('customerId')) {
                ++_this.num;
                // _this.$emit("callCustomer",{
                //   num:_this.num,
                //   type:1
                // });
                _this.callcus = _this.num
                _this.session.push({
                  text: list[0].msg_list[0].content.msg,
                  sender_id: list[0].sender_id,
                  sender_source: list[0].sender_source,
                  cusmer: '客服人员',
                  date: new Date(),
                  self: false,
                  isCustomer: true,
                  img: list[0].msg_list[0].content.url,
                  extData: '',
                });
              }
              // }
            }
          });

          /**
           * [connectchange 连接发生变化]
           * @copyright 建立长连接 
           */
          webimbiz.addEventListener('connectchange', function(connected, reason) {
            // console.log(connected)
            if (connected) {
               console.log('长连接正常');
              $('.misim-top-right .artServer').css('visibility', 'visible');


            } else {
              // console.log('长连接断开。');

            }
          });
          

        }

      })

    })

     //判断浏览器 关闭窗口
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") > -1 || userAgent.indexOf("Chrome") > -1) {
        window.onbeforeunload = function() {
          let cs_id = localStorage.getItem('customerId');
          if (cs_id) {
            cs_id = localStorage.getItem('customerId')
          } else {
            cs_id = '201710101617465a60cc99'
          }
          let AppSecret = localStorage.getItem('AppSecret');
          let Nonce = Math.random();
          let Timestamp = new Date().getTime();
          let Signature1 = AppSecret + Nonce + Timestamp;
          let Signature = hex_sha1(Signature1);
          axios.defaults.headers.common['AppKey'] = localStorage.getItem('AppKey');
          axios.defaults.headers.common['Nonce'] = Nonce;
          axios.defaults.headers.common['Timestamp'] = Timestamp;
          axios.defaults.headers.common['Signature'] = Signature;

          axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
          axios.defaults.headers.common['ClientType'] = 'pc';
          axios.defaults.headers.common['SessionId'] = localStorage.getItem('SessionId');
          axios.defaults.headers.common['ReqToken'] = localStorage.getItem('im_token');

          let csdata = qs.stringify({
            csId: cs_id
          });
          axios.post('' + _this.urlAddress + '/csr/customers/action/closeSession', csdata)
            .then(response => {
              this.serverIfo = response.data.data;
              this.loadingshow = false;
              let log = localStorage.getItem('isSatisfied');
              if (log) {
                log = localStorage.getItem('isSatisfied');
              } else {
                log = 0;
              }
              let AppSecret = localStorage.getItem('AppSecret');
              let Nonce = Math.random();
              let Timestamp = new Date().getTime();
              let Signature1 = AppSecret + Nonce + Timestamp;
              let Signature = hex_sha1(Signature1);
              axios.defaults.headers.common['AppKey'] = localStorage.getItem('AppKey');
              axios.defaults.headers.common['Nonce'] = Nonce;
              axios.defaults.headers.common['Timestamp'] = Timestamp;
              axios.defaults.headers.common['Signature'] = Signature;

              axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
              axios.defaults.headers.common['ClientType'] = 'pc';
              axios.defaults.headers.common['SessionId'] = localStorage.getItem('SessionId');
              axios.defaults.headers.common['ReqToken'] = localStorage.getItem('im_token');

              let data = qs.stringify({
                isSatisfied: log,
                toId: cs_id
              });

              axios.post('' + _this.urlAddress + '/csr/customers/action/markReply', data)
                .then(response => {
                  localStorage.clear();
                  $('.misim-dialog').hide();
                  $('.misim-dialog-main').hide();
                  $('.misim-bigModel').hide();
                  $('#misim-app').hide();
                  $('.misim-chat-message ul').html('');
                })
                .catch(error => {
                  console.log(error);
                });


            })
            .catch(error => {
              console.log(error);
            });



        }

      }

      /**
       * [取消退出]
       */
      $('.misim-dialog-false').on('click', function() {
        $('.misim-dialog').hide();
        $('.misim-dialog-main').hide();
      })
      /**
       * [退出会话]
       */

      $('.misim-dialog-true').on('click', function() {
        let cs_id = localStorage.getItem('customerId');
        if (cs_id) {
          cs_id = localStorage.getItem('customerId')
        } else {
          cs_id = '201710101617465a60cc99'
        }
        let AppSecret = localStorage.getItem('AppSecret');
        let Nonce = Math.random();
        let Timestamp = new Date().getTime();
        let Signature1 = AppSecret + Nonce + Timestamp;
        let Signature = hex_sha1(Signature1);
        axios.defaults.headers.common['AppKey'] = localStorage.getItem('AppKey');
        axios.defaults.headers.common['Nonce'] = Nonce;
        axios.defaults.headers.common['Timestamp'] = Timestamp;
        axios.defaults.headers.common['Signature'] = Signature;

        axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
        axios.defaults.headers.common['ClientType'] = 'pc';
        axios.defaults.headers.common['SessionId'] = localStorage.getItem('SessionId');
        axios.defaults.headers.common['ReqToken'] = localStorage.getItem('im_token');

        let csdata = qs.stringify({
          csId: cs_id
        });
        axios.post('' + _this.urlAddress + '/csr/customers/action/closeSession', csdata)
          .then(response => {
            this.serverIfo = response.data.data;
            this.loadingshow = false;
            let log = localStorage.getItem('isSatisfied');
            if (log) {
              log = localStorage.getItem('isSatisfied');
            } else {
              log = 0;
            }
            let AppSecret = localStorage.getItem('AppSecret');
            let Nonce = Math.random();
            let Timestamp = new Date().getTime();
            let Signature1 = AppSecret + Nonce + Timestamp;
            let Signature = hex_sha1(Signature1);
            axios.defaults.headers.common['AppKey'] = localStorage.getItem('AppKey');
            axios.defaults.headers.common['Nonce'] = Nonce;
            axios.defaults.headers.common['Timestamp'] = Timestamp;
            axios.defaults.headers.common['Signature'] = Signature;

            axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
            axios.defaults.headers.common['ClientType'] = 'pc';
            axios.defaults.headers.common['SessionId'] = localStorage.getItem('SessionId');
            axios.defaults.headers.common['ReqToken'] = localStorage.getItem('im_token');
            let data = qs.stringify({
              isSatisfied: log,
              toId: cs_id
            });

            axios.post('' + _this.urlAddress + '/csr/customers/action/markReply', data)
              .then(response => {
                // localStorage.clear();
                $('.misim-dialog').hide();
                $('.misim-dialog-main').hide();
                $('.misim-bigModel').hide();
                $('#misim-app').hide();
                $('.misim-chat-message ul').html('');
                localStorage.removeItem('customerId')
              })
              .catch(error => {
                console.log(error);
              });


          })
          .catch(error => {
            console.log(error);
          });

      })
 });

  },
  /**
   * [data 数据模型]
   * @copyright vue's data function
   * @return {urlAddress[数据地址], sessionList[会话列表], search[搜索key], sessionIndex[选中的会话Index] cust[人工坐席忙监听], assas[满意 不满意监听], repeat[重复点击监听], callcus[转人工提示], thinmsg[敏感词监听], judgecount[满意度评价提示]}
   */
  data() {
    return {
      urlAddress: baseData.urlBase,
      sessionList: [],
      search: '',
      sessionIndex: 0,
      cust: 0,
      assas: 0,
      repeat: 0,
      callcus: 0,
      thinmsg: 0,
      judgecount: 0
    }
  },
  computed: {
    /**
     * [session ]
     * @copyright 返回会话消息
     * @return {object} {userId: 2, messages: []}
     */
    session() {
      return this.sessionList;
    }
  },
  watch: {
    /**每当sessionList改变时，输出**/
    sessionList: {
      deep: true,
      handler() {
         console.log(this.sessionList);
        setTimeout(function() {
          $('.mism-chat-customer').addClass('in');
        }, 500)

      }
    }
  },
  components: {
    /**依赖的子组件**/
    mistext,
    message,
    mistop,
    other
  },
  methods: {
    /**
     * [subShot 截图发送]
     * @copyright 将存储到localStorage的图片加入到会话列表
     */
    subShot() {
      $.imSdk.webimbiz.sendMsg({
        msg: {
          content: {
            url: localStorage.getItem('dataURL'),
            type: 'image',
            image_width: 762,
            image_height: 500
          },
          msg_type: 2,
          send_time: new Date(),
          show_type: 'image',
          to_id: localStorage.getItem('customerId'),
          to_source: '8'
        },
        onUploadImgBegin: function() {},
        onUploadImgSuccess: function(url) {},
        onUploadImgFail: function(err) {},
        onSendMsgBegin: function() {},
        onSendMsgSuccess: function(result) {

        },
        onSendMsgFail: function(err) {

        }
      })

      this.sessionList.push({
        date: new Date(),
        self: true,
        type: 3,
        img: localStorage.getItem('dataURL')
      })


    },
    /**
     * [judge 满意度评价提示 客服发起]
     */
    judge(data) {
      this.judgecount = data;
    },
    /**
     * [calls 转人工提示]
     */
    calls(data) {
      this.callcus = data;
    },
    /**
     * [customer 人工坐席忙监听]
     */
    customer(data) {
      this.cust = data;
    },
    /**
     * [assasTog 满意 不满意监听]
     */
    assasTog(data) {
      this.assas = data;
    },
    /**
     * [rep 重复点击监听]
     */
    rep(data) {
      this.repeat = data;
    },
    /**
     * [thin 敏感词监听]
     */
    thin(data) {
      this.thinmsg = data;
    },
    /**
     * [select 设置当前会话索引]
     * @copyright 设置当前索引，传入的值为会话列表正序数序
     * @return {}
     */
    select(index) {
      this.sessionIndex = index;
    }

  }
}

</script>
