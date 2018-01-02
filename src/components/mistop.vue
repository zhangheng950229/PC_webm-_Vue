<template>
  <div class="misim-chat-top misim-drag">
    <div id="drag" class="misim-chat-top-item misim-top-left" style="width: 600px">
      <ul>
        <li><img src="../../static/img/logo-o.png" alt="logo"></li>
        <li><span>只为您<em>服务</em></span></li>
      </ul>
    </div>
    <div class="misim-chat-top-item misim-top-right">
      <ul>
        <li @click="artServer" class="artServer"><img src="../../static/img/server_icon.png" alt="server" /><span>人工客服</span></li>
        <li @click="clearSession"><img src="../../static/img/close_icon.png" alt="close" /></li>
      </ul>
    </div>
  </div>
</template>
<style lang="less">
.misim-top-left {
  float: left;
}

.misim-top-right {
  float: right;
}

.misim-chat-top {
  padding: 0 15px;
  overflow-y: hidden;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden;
  div {
    ul li {
      float: left;
      margin: 0 3px;
      font-size: 0;
      span {
        font-size: 14px
      }
      em {
        font-style: normal;
        color: #ff552e;
        font-weight: 700
      }
    }
  }
  div.misim-top-left {
    ul li:last-child {
      padding-top: 4px
    }
    span {
      padding: 0 4px;
      margin-top: 2px
    }
    span:before {
      height: 10px;
      width: 1px;
      background: #e6e6e6;
      content: '';
      display: inline-block;
      margin-right: 8px
    }
    img {
      width: 73px;
      height: 24px;
      vertical-align: middle;
    }
  }
  div.misim-top-right {
    .artServer {
      visibility: hidden;
      /*display:none!important;*/
    }
    span {
      padding: 6px;
      font-size: 12px;
      color: #166bec
    }
    li {
      cursor: pointer;
    }
    li:first-child {
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-top: -10px
      }
    }
    li:last-child {
      margin-left: 25px;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }
  }
}

</style>
<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import baseData from '../util/util';

export default {
  props: ['session'],
  mounted() {
    /*****拖拽********/
    var left, top, $this;
    $(document).delegate('#drag', 'mousedown', function(e) {
      left = e.clientX, top = e.clientY, $this = $(this).css('cursor', 'move');
      this.setCapture ? (
        this.setCapture(),
        this.onmousemove = function(ev) { mouseMove(ev || event); },
        this.onmouseup = mouseUp
      ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
    });

    function mouseMove(e) {
      var target = $this.parents('#misim-app');
      var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
      var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
      l = Math.min(l, $(window).width() - target.width() - target.position().left);
      t = Math.min(t, $(window).height() - target.height() - target.position().top);
      left = e.clientX;
      top = e.clientY;
      localStorage.setItem('l', l);
      localStorage.setItem('t', t);
      target.css({ 'margin-left': l, 'margin-top': t });

    }

    function mouseUp(e) {
      var el = $this.css('cursor', 'default').get(0);
      el.releaseCapture ?
        (
          el.releaseCapture(),
          el.onmousemove = el.onmouseup = null
        ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
    }
  },
  /**
   * [data 数据模型]
   * @copyright 
   * @return {urlAddress[数据地址],num [监听变化指针]}
   */
  data() {
    return {
      urlAddress: baseData.urlBase,
      num: 1
    }
  },
  methods: {
    /****
      @clearSession 清除数据 
    **/
    select(index) {
      this.sessionIndex = index;
    },
    /****
      @artServer 切换人工客服 
    **/
    artServer() {
      var nowTime = new Date().getHours();
      if (nowTime >= 9 && nowTime <= 18) {
        $('.misim-drag .misim-top-right ul').find('li:first-child').hide();
        if (localStorage.getItem('customerStatus') == 0) {
          ++this.num;
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
          axios.get('' + this.urlAddress + '/csr/customers/action/findTokenByUserId', {})
            .then(response => {
              if (response.data.code == -1) {
                this.$emit("customersToggle", this.num + 1);
              } else {
                this.session.push({
                  text: '人工客服为您服务~',
                  date: new Date(),
                  type: 1,
                  name: '客服',
                  self: false,
                  isCustomer: true,
                  extData: ''
                });
                ++this.num;
                this.$emit("callCustomer", {
                  num: this.num,
                  type: 1
                });
                $('.misim-chat-expression').find('.misim-top-right').hide();
                $('.btnBack').show();
                $('.misim-chat-upload').show();
                $('.misim-chat-tips').hide();
                localStorage.setItem('customerStatus', 1);
                localStorage.setItem('customerId', response.data.extData.csId);
                localStorage.setItem('isCustomer', true);
              }

            })
            .catch(error => {
              console.log(error);
            });
          return false;
        }
      } else {
        alert('我们的工作时间是：9:00-18:00,当前无人工客服在线，非常抱歉，给您带来不便。您可以留言给我们，我们将尽快给您解决问题。')
      }

    },
    clearSession() {
      $('.misim-dialog').show();
      $('.misim-dialog-main').show();
    },
    greet() {

    }
  }
};

</script>
