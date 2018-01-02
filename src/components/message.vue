<template>
  <div class="misim-chat-message" v-scroll-bottom="session">
    <ul>
      <li v-for="(item,index) in session" :class="{'mism-chat-customer':!item.self}" class="misim-chat-message-item">
        <p class="misim-chat-time" :class="{'misim-chat-p-self': item.self}">
          <span>{{ item | cusmer}}</span><span>{{item.date | time}}</span></p>
        <div class="misim-chat-message-main" :class="{'misim-chat-message-self': item.self}">
          <img v-if="item.loading" src="../../static/img/loading.gif" width="15" height="15" />
          <img class="misim-chat-message-avatar" :src="item | avatar" width="40" height="33" />
          <div v-if="item.img?false:true" class="misim-chat-message-text">
            <pre v-html="isexp(item.text)">{{item.text}}</pre></div>
          <div class="misim-chat-message-est" :qid="item.qid" v-if="item.isass"><span class="misim-chat-est-item" data-status="0" data-ap="0"><span></span>有用</span><span class="misim-chat-est-item" data-status="0" data-ap="0"><span></span>没用</span>
          </div>
          <div class="misim-chat-message-about" v-if="!item.self &&item.extData!=''">
            <div class="misim-chat-message-about-title">相关问题</div>
            <ul>
              <li v-for="(v,index) in item.extData" :class="{'active':index == nowindex}">
                <a @click="showExt(index)">{{v.question}}</a>
                <div class="extanswer" v-if="index == nowindex">{{v.answer}}</div>
              </li>
            </ul>
          </div>
          <img v-if="item.img?true:false" class="misim-chat-message-img" :src="item | photo" style="margin-top:10px;width: 150px" />
        </div>
      </li>
    </ul>
    <div class="misim-chat-tips" v-show="ishow">
      <span v-html="tipsTxt">{{tipsTxt}}</span>
    </div>
  </div>
</template>
<style lang="less">
pre {
  margin: 0;
  white-space: pre-wrap;
  /*css-3*/
  white-space: -moz-pre-wrap;
  /*Mozilla,since1999*/
  white-space: -pre-wrap;
  /*Opera4-6*/
  white-space: -o-pre-wrap;
  /*Opera7*/
  word-wrap: break-word;
  /*InternetExplorer5.5+*/
  font: 12px/1.4em 'Microsoft Yahei', Helvetica, 'Helvetica Neue', Arial, sans-serif;
}

.misim-chat-message {
  padding: 5px 15px 0px 15px;
  overflow-y: scroll;
  text-align: left;
  background-color: #fafafa;
  ul {
    li.misim-chat-message-item {
      margin-bottom: 15px;
      overflow: hidden;
      transition: all 0.5s ease-out;
      -webkit-transition: all 0.5s ease-out;
    }
    /*padding-bottom: 13px*/
  }
  .getCustomer {
    color: #166bec;
    cursor: pointer;
  }
  .mism-chat-customer {
    opacity: 0;
  }
  .mism-chat-customer.in {
    opacity: 1;
  }
  .misim-chat-use-tips {
    display: none;
  }
  .disnone {
    display: block;
  }
  .misim-chat-tips,
  .misim-chat-use-tips {
    margin: 4px auto;
    text-align: center;
    /*position: absolute;*/
    /*bottom: 150px;*/
    width: 100%;
    text-align: center;
    /*left: 0;*/
    em {
      font-style: normal;
      color: #166bec;
    }
    span {
      padding: 3px 10px;
      border-radius: 10px;
      background: #edf0f2;
      display: inline-block;
      max-width: 400px;
    }
  }
  .misim-chat-time {
    margin: 7px 0 -7px 0;
    text-align: left;
    padding: 0 40px;

    >span {
      display: inline-block;
      font-size: 12px;
      color: #999;
      border-radius: 2px;
      padding: 0 4px
    }
  }
  .misim-chat-time.misim-chat-p-self {
    text-align: right
  }
  .misim-chat-message-avatar {
    float: left;
    margin: 0 20px 0 0;
    border-radius: 3px;
    display: block;
    /*border: 1px solid red;*/
  }
  .misim-chat-message-est {
    margin-top: 0;
    position: relative;
    padding: 5px 10px;
    max-width: ~'calc(100% - 60px)';
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    /*max-width: 70%;*/
    text-align: right;
    .misim-chat-est-item {
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;
      height: 16px;
      line-height: 16px;
      color: #b2d1ff;
      span {
        display: inline-block;
        width: 14px;
        height: 14px;
        background-size: 100%;
        background-repeat: no-repeat;
        vertical-align: top;
        margin: 0 5px;
      }
    }
    span.misim-chat-est-item:first-child {
      span {
        background-image: url(../../static/img/sest.png);
      }
    }
    span.misim-chat-est-item:last-child {
      span {
        background-image: url(../../static/img/kest.png);
      }
    }
    span.misim-chat-est-item:first-child:hover,
    span.misim-chat-est-item:first-child.active {
      color: #166bec;
      span {
        background-image: url(../../static/img/sest_in.png);
      }
    }
    span.misim-chat-est-item:last-child:hover,
    span.misim-chat-est-item:last-child.active {
      color: #166bec;
      span {
        background-image: url(../../static/img/kest_in.png);
      }
    }
  }
  .misim-chat-message-text {
    margin-top: 10px;
    display: inline-block;
    position: relative;
    padding: 5px 10px;
    line-height: 1.5;
    /*max-width: ~'calc(100% - 40px)';*/
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    border-top-left-radius: 0px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid #e6e6e6;
    max-width: 70%;

    &:before {
      content: " ";
      position: absolute;
      top: -1px;
      right: 100%;
      background-image: url(../../static/img/bugle_s.png);
      background-repeat: no-repeat;
      width: 18px;
      height: 12px;
      background-size: 100%
    }
  }
  .misim-chat-message-about {
    margin-left: 60px;
    margin-top: 10px;
    position: relative;
    padding: 6px 10px;
    line-height: 1.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    max-width: ~'calc(80% - 60px)';
    .misim-chat-message-about-title {
      color: #999;
    }
    ul {
      background-color: #fff;
      padding: 6px 10px;
      border-radius: 6px;
      li.active {
        color: #166bec;
        &:after {
          content: '';
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #166BEC;


          border-bottom: none;
          position: absolute;
          right: 0;
          top: 10px;
        }
      }
      li {
        border-bottom: 1px solid #e1e4e6;
        padding: 5px 0;
        color: #999999;
        /*cursor: pointer;*/
        position: relative;
        div {
          color: #666;
        }
        &:after {

          content: '';
          width: 0;
          height: 0;

          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 5px solid #166BEC;
          position: absolute;
          right: 0;
          top: 10px;
        }
        a {
          text-decoration: none;
          color: #166BEC;
          display: block;
          width: 100%;
          cursor: pointer;
        }
        a:hover {
          color: #166bec;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }

  .misim-chat-message-self {
    text-align: right;
    .misim-chat-message-text {
      border-top-left-radius: 6px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      &:before {
        background-image: url(../../static/img/bugle_k.png);
      }
    }

    .misim-chat-message-avatar {
      float: right;
      margin: 0 0 0 20px;
    }
    .misim-chat-message-text {
      background-color: #ffe0cc;
      border: 1px solid #fcc7a4;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #ffe0cc;
      }
    }
    .misim-chat-message-avatar {
      width: 40px;
      height: 40px
    }
  }
  .im-emotion-unit {
    margin-bottom: -3px;
    margin-left: 5px;
    display: inline-block;
  }
}

.assas_item {
  cursor: pointer;
  color: #166BEC
}

</style>
<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import headImg from '../../static/img/robot.png';
import customerImg from '../../static/img/customer.png';
import userImg from '../../static/img/userImg.png';
import baseData from '../util/util';
export default {
  props: ['session', 'user', 'userList', 'customer', 'assasTog', 'repTip', 'callCus', 'thinMs', 'callJud'],
  mounted() {

    this.$nextTick(() => {
      var _this = this;
      //满意度
      $('body').on('click', '.misim-chat-tips .assas_item', function() {
        let tog = 0,
          cs_id = localStorage.getItem('customerId');
        if (cs_id) {
          cs_id = localStorage.getItem('customerId')
        } else {
          cs_id = '201710101617465a60cc99'
        }
        switch ($(this).text()) {
          case '满意':
            tog = 3
            break;
          case '一般':
            tog = 2
            break;
          case '不满意':
            tog = 1
            break
        }
        localStorage.setItem('isSatisfied', tog);
        let timer = null;
        clearTimeout(_this.timer);
        _this.tipsTxt = '谢谢您的评价';
        _this.ishow = true;
        _this.timer = setTimeout(() => {
          _this.ishow = false;
        }, 3000);



      })
    })

    /**
     * [识别链接]
     * @copyright 过滤链接地址
     */
    String.prototype.httpHtml = function() {
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      return this.replace(reg, '<a href="$1$2" target="_blank">$1$2</a>');
    };
    /**
     * [有用 没用]
     * @copyright 点击答案列表有用、没用
     */
    let that = this;
    $('body').on('click', '.misim-chat-est-item', function() {
      let _this = this;
      let qid = $(this).parent().attr('qid');
      let usetype = 1;
      if ($(this).text() == '有用') {
        usetype = 1;
        $(this).next().attr('data-ap', 1)
      } else {
        usetype = 2;
        $(this).prev().attr('data-ap', 1)
      };
      if ($(this).attr('data-ap') == 0) {
        $(this).addClass('active');
        if ($(this).attr('data-status') == 0) {
          let AppSecret = localStorage.getItem('AppSecret');
          let Nonce = Math.random();
          let Timestamp = new Date().getTime();
          let Signature1 = AppSecret + Nonce + Timestamp;
          let Signature = hex_sha1(Signature1);
          $.ajax({
            type: 'post',
            dataType: 'json',
            data: {
              questionId: qid,
              useType: usetype
            },
            beforeSend: function(xhr) {

              xhr.setRequestHeader("AppKey", localStorage.getItem('AppKey'));
              xhr.setRequestHeader('Nonce', Nonce);
              xhr.setRequestHeader('Timestamp', Timestamp);
              xhr.setRequestHeader('Signature', Signature);

              xhr.setRequestHeader('UserId', sessionStorage.getItem('userId'));
              xhr.setRequestHeader('ClientType', 'pc');
              xhr.setRequestHeader('SessionId', localStorage.getItem('SessionId'));
              xhr.setRequestHeader('ReqToken', localStorage.getItem('im_token'));

            },
            url: '' + that.urlAddress + '/csr/customers/action/clickQuestionEven',
            success: function(data) {
              let el = $('.misim-chat-message')[0];
              $('.misim-chat-use-tips').addClass('disnone');
              el.scrollTop = el.scrollHeight - el.clientHeight;
              let timer = null;
              clearTimeout(timer);
              timer = setTimeout(() => {
                $('.misim-chat-use-tips').removeClass('disnone');
              }, 3000);

            }

          });
          $(_this).attr('data-status', 1)
        };
      };

    });

    /* 点击人工客服 触发**/
    $('body').on('click', '.getCustomer', function() {
      var nowTime = new Date().getHours();
      if (nowTime >= 9 && nowTime <= 18) {
        if (!localStorage.getItem('customerId')) {
          $('.artServer').trigger('click');
          $('.misim-chat-tips').hide();
          if ($(this).attr('data-type')) {
            //$(this).parent().remove()
          } else {
            //$('.misim-chat-tips').hide();
          }
        };
      } else {
        alert('我们的工作时间是：9:00-18:00,当前无人工客服在线，非常抱歉，给您带来不便。您可以留言给我们，我们将尽快给您解决问题。')
      }

    })

  },
  /**
   * [data 数据模型]
   * @copyright 
   * @return {urlAddress[数据地址],ishow [提示], tipsTxt [提示信息] , timer[定时器指针],face[表情列表],nowindex[点击关联问题展开当前索引],tipsdata[转人工随机提示]}
   */
  data() {
    return {
      urlAddress: baseData.urlBase,
      ishow: false,
      tipsTxt: 'tips',
      timer: null,
      face: baseData.faceShow,
      nowindex: -1,
      activeState: false,
      tipsdata: baseData.tipsData
    }
  },
  computed: {
    sessionUser() {
      let users = this.userList.filter(item => item.id === this.session.userId);
      return users[0];
    }

  },
  watch: {
    //重置相关问题
    session() {

      this.nowindex = -1
      this.activeState = false

    },
    /**
     * [callJud 满意度]
     * @copyright mistop监听人工客服 main获取 传到message实时监听
     */
    callJud(data) {
      let timer = null;
      clearTimeout(this.timer);
      //this.tipsTxt = '现在人工客服较忙，还是小八来服务您吧？或您稍后再来咨询 ';
      this.tipsTxt = '请您对我的服务进行评价：<span class="assas_item">满意</span><span class="assas_item">一般</span><span class="assas_item">不满意</span>';
      this.ishow = true;
    },
    /**
     * [callcus 联系人工提示]
     * @copyright mistop监听人工客服 main获取 传到message实时监听
     */
    callCus(data) {
      let timer = null;
      clearTimeout(this.timer);
      if (data.type == 0) {
        this.tipsTxt = '如果还没有解决您的问题，可以联系<em class="getCustomer" data-type="1">人工客服</em>';
        this.ishow = false;
        this.timer = setTimeout(() => {
          this.ishow = true;
        }, 30000)
      } else {
        this.tipsTxt = '已经很久没有收到您的消息了，请问您还在电脑前吗？<br />如果没有其他的问题，该对话将于2分钟后会被关闭';
        this.ishow = false;
        this.timer = setTimeout(() => {
          this.ishow = true;
        }, 30000)
      }


    },
    /**
     * [customer 人工忙提示]
     * @copyright mistop监听人工客服 main获取 传到message实时监听
     */
    customer() {
      let timer = null;
      clearTimeout(this.timer);
      //this.tipsTxt = '现在人工客服较忙，还是小八来服务您吧？或您稍后再来咨询 ';
      this.tipsTxt = '正在排队中,请稍后……';
      this.ishow = true;
      this.timer = setTimeout(() => {
        this.ishow = false;
        $('.misim-drag .misim-top-right ul').find('li:first-child').show();
      }, 8000);

    },
    /**
     * [assasTog 满意度反馈]
     * @copyright mistop监听人工客服 main获取 传到message实时监听
     */
    assasTog() {
      let timer = null;
      clearTimeout(this.timer);
      this.tipsTxt = '谢谢您的评价';
      this.ishow = true;
      this.timer = setTimeout(() => {
        this.ishow = false;
      }, 3000);
    },
    /**
     * [repTip 重复操作tips]
     * @copyright mistop监听人工客服 main获取 传到message实时监听
     */
    repTip() {
      let timer = null;
      clearTimeout(this.timer);
      this.tipsTxt = '请勿重复操作';
      this.ishow = true;
      this.timer = setTimeout(() => {
        this.ishow = false;
      }, 3000);
    },
    /**
     * [thinMsg 敏感词提示]
     * @copyright
     */
    thinMs() {
      $('.misim-chat-tips').show();
      let timer = null;
      clearTimeout(this.timer);
      this.tipsTxt = '评论内容包含敏感词！';
      this.ishow = true;
      this.timer = setTimeout(() => {
        this.ishow = false;
      }, 3000);
    }
  },

  filters: {
    /**
     * [hrefspec 筛选帮助地址]
     * @param  
     * @return {string} 
     */
    hrefspec(item) {
      return 'http://about.58.com/customerservice.html?subcate=' + item
    },
    /**
     * [avatar 筛选用户头像]
     * @copyright 如果是自己发的消息显示登录用户的头像
     * @param  {object} [item] 用户对象
     * @return {string} 用户头像地址
     */
    photo(item) {
      return item.img
    },
    avatar(item) {

      if (!item.self) {
        if (item.isCustomer == false) {
          return headImg;
        } else {
          return customerImg;
        }

      } else {
        return userImg;
      }

    },
    /**
     * [cusmer 过滤用户名]
     * @copyright 机器人 客服 商家
     * @param  {object} [item] 用户对象
     * @return {string} 用户名
     */
    cusmer(item) {
      if (!item.self) {
        if (item.isCustomer == false) {
          return '58机器人小八';
        } else {
          return '客服';
        }
      } else {
        return '我';
      }

    },

    /**
     * [time 日期过滤]
     * @copyright 将日期过滤为 hour:minutes
     * @param  {object} [date] 日期对象
     * @return {object} 日期对象
     */
    time(date) {
      if (date) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        let hours = date.getHours(),
          minutes = date.getMinutes();
        return (hours < 10 ? '0' + date.getHours() : hours) + ':' + (minutes < 10 ? '0' + date.getMinutes() : minutes);
      }


    },

  },
  methods: {
    /**
     * [showExt 点击关联问题展开]
     */
    showExt(index) {

      if (!this.activeState) {
        this.nowindex = index
        this.activeState = true
      } else {
        this.nowindex = -1
        this.activeState = false
      }


    },
    /**
     * [isexp 表情 消息 过滤]
     * @copyright 将字符表情转换成img
     * @param  {object} 回话列表
     * @return {object} 过滤后的列表
     */
    isexp(item) {
      //var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      var index = Math.floor(Math.random() * this.tipsdata.length);
      if (reg.test(item) == true) {
        return item.httpHtml()
      } else if (item.substr(-4, item.indexOf('人工客服')) == '人工客服') {
        return '如果还没有解决您的问题，可以联系 <span class="getCustomer">人工客服</span>';
        //return this.tipsdata[index]
      } else {
        //return item.httpHtml();
        let _this = this;
        let reg = /\[.+?\]/g;
        return item.replace(reg, function(value) {
          return '<div class="' + _this.face[value] + '"></div>';

        });
      }


    }

  },
  directives: {
    /**
     * [scroll-bottom 消息监听]
     * @copyright 发送消息后滚动到底部
     * @param  {object} [el] dom对象
     * @return {string} 用户头像地址
     */
    'scroll-bottom' (el) {
      Vue.nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    }
  }
}

</script>
