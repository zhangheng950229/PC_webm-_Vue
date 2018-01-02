<template>
  <div class="misim-other-wrap clearfix">
    <div class="misim-other-search">
      <span><img src="../../static/img/search_icon.png" alt="search"></span>
      <input v-model="searchmsg" @keyup="searchResult" type="text" name="misim-other-search" placeholder="搜一搜">
    </div>
    <div class="misim-other-info">
      <div class="misim-other-tab">
        <ul>
          <li v-for="(item,index) in qList" @click="activeTabLine(index,item.qid)" :class="{active:index==activeTabIndex}">{{item.question}}</li>
        </ul>
      </div>
      <div class="misim-other-content">
        <ul>
          <li v-html="item.question" v-for="(item,index) in serverIfo" @click="activeConLine(index,item)" :class="{active:index==activeContentIndex}">{{item.question}}</li>
        </ul>
      </div>
    </div>
    <div class="loading-img" v-if="loadingshow"><img src="../../static/img/loading.gif" /></div>
  </div>
</template>
<style lang="less">
.clearfix:after {
  content: '';
  height: 0;
  display: block;
  overflow: hidden;
  clear: both
}

.clearfix {
  zoom: 1
}

.misim-other-wrap {
  .misim-other-search {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    position: relative;
    span {
      position: absolute;
      left: 25px;
      top: 18px;
      z-index: 99;
      img {
        width: 13px;
        height: 13px
      }
    }
  }
  input[type=text] {
    width: 97%;
    outline: none;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    -webkit-border-radius: 20px;
    border: none;
    background: #edf0f2;
    padding: 0 30px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .misim-other-tab {
    padding: 16px 10px;
    ul li {
      float: left;
      width: 25%;
      text-align: center;
      cursor: pointer;
      position: relative;
      color: #666;
    }
    ul li.active {
      color: #333
    }
    ul li.active:after {
      content: '';
      height: 2px;
      width: 30%;
      background-color: red;
      position: absolute;
      bottom: -8px;
      left: 35%;
      border-radius: 2px;
    }
  }
  .misim-other-content {
    padding: 8px 15px;
    ul li {
      text-align: left;
      /*height: 20px;*/
      line-height: 20px;
      position: relative;
      padding: 0 10px;
      margin: 10px 0;
      cursor: pointer
    }
    ul li:before {
      content: '.';
      display: inline-block;
      vertical-align: middle;
      font-size: 34px;
      color: #333;
      position: absolute;
      top: -10px;
      left: 0
    }
    ul li:hover:before,
    ul li.active:before {
      color: #ff552d
    }
  }
  .loading-img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -10px
    }
  }
}

.keyword {
  color: red;
  font-weight: bold
}

</style>
<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import baseData from '../util/util';
export default {
  props: ['session'],
  mounted() {

    this.$nextTick(() => {

      var _this = this;
      //状态初始化
      //localStorage.clear();
      $('.misim-bigModel').hide();
      $('#misim-app').hide();
      $('.misim-chat-message ul').html('');
      $('.misim-chat-message .mism-chat-customer').addClass('in');

      /**
       * [click 入口]
       * @copyright 点击入口 初始化
       */
      $('.misim-box-btn').on('click', function() {
        /**
         * [token 获取用户token]
         * @copyright 获取主站信息后 初始化用户token 
         */

        //if (!sessionStorage.getItem('userId') || sessionStorage.getItem('userId') === 'undefined') {
          // alert('请先登录');
          // window.location.href = 'http://passport.58.com';

        // } else {


          let AppSecret = 'vWY28KQflfmRL';
          let Nonce = Math.random();
          let Timestamp = new Date().getTime();
          let Signature1 = AppSecret + Nonce + Timestamp;
          let Signature = hex_sha1(Signature1);
          let SessionId = Math.random().toString(36).substr(2);

          localStorage.setItem('AppSecret', 'vWY28KQflfmRL');
          localStorage.setItem('AppKey', 'mgb7ka1nmf1mg');
          localStorage.setItem('Nonce', Nonce);
          localStorage.setItem('Timestamp', Timestamp);
          localStorage.setItem('Signature', Signature);
          localStorage.setItem('SessionId', SessionId);

          let turl = '' + _this.urlAddress + '/csr/users/token';



          axios.defaults.headers.common['AppKey'] = 'mgb7ka1nmf1mg';
          axios.defaults.headers.common['Nonce'] = Nonce;
          axios.defaults.headers.common['Timestamp'] = Timestamp;
          axios.defaults.headers.common['Signature'] = Signature;

          axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
          axios.defaults.headers.common['ClientType'] = 'pc';
          axios.defaults.headers.common['SessionId'] = SessionId;
          axios.get(turl)
            .then(responset => {

              /*签名 加密*/
              localStorage.setItem('im_token', responset.data.data);
              localStorage.setItem('isCustomer', false);
              let AppSecret = localStorage.getItem('AppSecret');
              let Nonce = Math.random();
              let Timestamp = new Date().getTime();
              let Signature1 = AppSecret + Nonce + Timestamp;
              let Signature = hex_sha1(Signature1);
              axios.defaults.headers.common['AppKey'] = 'mgb7ka1nmf1mg';
              axios.defaults.headers.common['Nonce'] = Nonce;
              axios.defaults.headers.common['Timestamp'] = Timestamp;
              axios.defaults.headers.common['Signature'] = Signature;

              axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
              axios.defaults.headers.common['ClientType'] = 'pc';
              axios.defaults.headers.common['SessionId'] = SessionId;
              axios.defaults.headers.common['ReqToken'] = responset.data.data;

              /**
               * [session 初始化会话列表]
               * @copyright 获取用户token后 初始化 会话列表
               */
              axios.get('' + _this.urlAddress + '/csr/customers/action/findAnswerByQuestion', {
                  params: {
                    question: 'hello',
                    bizLine: 'huangye',
                    expect: '1',
                    isGreeting: '1'
                  }
                })
                .then(response => {
                  _this.session.push({
                    text: response.data.data[0].content,
                    date: new Date(),
                    type: 1,
                    name: '58机器人小八',
                    isCustomer: false,
                    self: false,
                    extData: ''
                  });
                  /*****获取token后初始化问题列表*******/
                  /**
                   * [Question 初始化会问题列表  每次请求都带签名和通用header校验]
                   * @copyright 获取用户token后 初始化 问题列表
                   */
                  let AppSecret = localStorage.getItem('AppSecret');
                  let Nonce = Math.random();
                  let Timestamp = new Date().getTime();
                  let Signature1 = AppSecret + Nonce + Timestamp;
                  let Signature = hex_sha1(Signature1);
                  let url = '' + _this.urlAddress + '/csr/customers/action/findCommonQuestions';
                  axios.defaults.headers.common['AppKey'] = 'mgb7ka1nmf1mg';
                  axios.defaults.headers.common['Nonce'] = Nonce;
                  axios.defaults.headers.common['Timestamp'] = Timestamp;
                  axios.defaults.headers.common['Signature'] = Signature;

                  axios.defaults.headers.common['UserId'] = sessionStorage.getItem('userId');
                  axios.defaults.headers.common['ClientType'] = 'pc';
                  axios.defaults.headers.common['SessionId'] = SessionId;
                  axios.defaults.headers.common['ReqToken'] = responset.data.data;

                  axios.get(url, {
                      params: {
                        pid: '-1',
                        bizLine: 'huangye',
                        pageNum: '1',
                        pageSize: '10'
                      }
                    })
                    .then(response => {
                      _this.activeTabLine(0, response.data.data[0].qid);
                      _this.serverInit = response.data.data[0].qid;
                      _this.loadingshow = false;
                      _this.qList = response.data.data;
                      $('.mism-chat-customer').addClass('in');
                    })
                    .catch(function(error) {
                      console.log(error);
                    });

                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });

          localStorage.setItem('customerStatus', 0);
          $('#misim-app').css({ 'margin-left': '-381px', 'margin-top': '-250px' });
          $('.misim-drag .misim-top-right ul').find('li:first-child').show();
          $('#misim-app').show();
          $('.misim-bigModel').show();
          $('.btnBack').hide();
          $('.misim-chat-upload').hide();
          $('.misim-chat-expression').find('.misim-top-right').show()
        // }





      })

    })
  },
  /**
   * [data 数据模型]
   * @copyright other function
   * @return {qList [问题标题], serverInit[初始化问题列表id], serverIfo[问题列表], activeTabIndex[当前默认tab索引],activeContentIndex[当前默认列表选中索引],loadingshow[加载loading],timer[时间指针],clicktag[延时用户操作指针],num[], toggle[长连接开关], cacheList[常见问题缓存]}
   */
  data() {
    return {
      urlAddress: baseData.urlBase,
      qList: [],
      serverInit: '',
      searchmsg: '',
      serverIfo: [],
      activeTabIndex: 0,
      activeContentIndex: -1,
      loadingshow: true,
      timer: false,
      clicktag: 0,
      num: 0,
      toggle: true,
      cacheList: []

    }

  },
  methods: {
    /**
     * [searchResult 搜索]
     * @copyright 输入搜索内容 返回搜索结果
     */
    searchResult(e) {
      this.activeContentIndex = -1;
      let j = 10;
      let i = 0;
      let _this = this;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(function() {
        ++i;
        if (i == j) {
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
          if (_this.searchmsg.length > 0) {
            _this.loadingshow = true;
            axios.get('' + _this.urlAddress + '/csr/customers/action/searchQuestions', {
                params: {
                  searchKey: _this.searchmsg,
                  bizLine: 'huangye'
                }
              })
              .then(response => {
                for (var i = 0; i < response.data.data.length; i++) {
                  response.data.data[i].question = response.data.data[i].question.replace(eval("/(" + _this.searchmsg + ")/g"), '<span class=keyword>' + _this.searchmsg + '</span>')
                }
                _this.serverIfo = response.data.data;
                _this.loadingshow = false;
                _this.activeTabIndex = -1;
              })
              .catch(error => {
                _this.loadingshow = false;
                console.log(error);
              });
          } else {
            _this.activeTabLine(0, _this.serverInit);
          }
          clearInterval(this.timer);
        }
      }, 100)

    },
    /**
     * [activeTabLine 点击标题tab方法]
     * @copyright 点击问题标题 获取对应列表
     * @param  {string} [index] 标题索引
     */
    activeTabLine(index, pid) {
      this.serverIfo = this.catchList
      this.activeTabIndex = index;
      this.activeContentIndex = -1;
      this.loadingshow = true;
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

      axios.get('' + this.urlAddress + '/csr/customers/action/findCommonQuestions', {
          params: {
            pid: pid,
            bizLine: 'huangye',
            pageNum: '1',
            pageSize: '10'
          }
        })
        .then(response => {
          this.serverIfo = response.data.data;
          this.catchList = response.data.data;
          this.answerIfo = response.data.data;
          this.loadingshow = false;
          response.data.data.sort(function(a, b) {
            return a.question.length - b.question.length
          })
        })
        .catch(error => {
          console.log(error);
        });

      if (this.catchList != '') {
        this.serverIfo = this.catchList
      }

    },
    /**
     * [activeConLine 点击问题列表方法]
     * @copyright 点击问题列表 客服返回答案
     * @param  {string} [index] 列表索引
     * @param  {object} [item] 列表对象
     */
    activeConLine(index, item) {
      let _this = this;
      if (this.clicktag == 0) {
        this.clicktag = 1;
        setTimeout(() => {
          this.clicktag = 0
        }, 1000);
        this.activeContentIndex = index;
        let customer = false;
        ++this.num;
        if (localStorage.getItem('isCustomer') == 'false') {
          customer = false;
          this.$emit("callCustomer", {
            num: this.num,
            type: 0
          });
        } else {
          customer = true;
          this.$emit("callCustomer", {
            num: this.num,
            type: 1
          });
        }

        this.session.push({
          text: '<span style="font-weight:800">' + item.question + '</span>' + '<br>' + '答：' + this.serverIfo[index].answer,
          date: new Date(),
          self: false,
          type: 2,
          isass: 1,
          isCustomer: customer,
          qid: item.qid,
          extData: ''
        });


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
          questionId: item.qid,
          useType: 1
        });

        axios.post('' + this.urlAddress + '/csr/customers/action/clickQuestionEven', data)
          .then(response => {})
          .catch(error => {
            console.log(error);
          });
      }


    },


  }

};

</script>
