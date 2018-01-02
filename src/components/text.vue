<template>
  <div class="misim-chat-text">
    <div class="misim-chat-expression">
      <div class="misim-chat-top-item misim-top-left">
        <ul class="misim-chat-ex">
          <li :class="{'btnBack':item.id,'active':activeTab}" v-for="(item,index) in expressionList" @click="exActive(index)"></li>
          
        </ul>
        <div class="misim-chat-upload">
          <input type="file" name="" @change="fileSubmit">
        </div>

        <div class="im-emotion-content" v-if="isshow">
          <ul class="im-emotion-list">
            <li v-for="(item,index) in exlist" @click="addExp(index)">
              <a data-emotionid="0" href="javascript:void(0)">
                <div :class="item.value" :data="item.name"></div>
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div class="misim-chat-top-item misim-top-right">
        <ul>
          <li v-for="(item,index) in assessList" :class="{'active':index==assActive}" @click="assessActive(index)">
            <!-- <img :src="item.value" alt="assess" /> --><span class="assess_icon"></span><span>{{item.text}}</span></li>
        </ul>
      </div>
    </div>
    <textarea id="textarea" contenteditable="true" :placeholder="palce" v-model="text" @keydown="inputing" @focus="textFocus" @blur="textBlur"></textarea>
    <button class="misim-chat-closebtn" @click="closeChat">关闭</button>
    <button class="misim-chat-subbtn" @click="subMsg">发送</button>
  </div>
</template>
<style lang="less">
.misim-chat-text {
  height: 144px;
  border-top: solid 1px #ddd;
  .misim-chat-expression {
    padding: 0 15px;
    overflow-y: hidden;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin-left: -5px;

    div {
      ul li {
        float: left;
        margin: 0 5px;
        cursor: pointer;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      ul li:first-child:hover {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
    }

    div.misim-top-left {
      float: left;
      .misim-chat-ex{
         float: left;
      }
      .misim-chat-ex li {
        width: 16px;
        height: 16px;
        margin-top:12px;
    /*    background-size: 100%;*/
        vertical-align: middle
      }
      .misim-chat-ex li:first-child {
        background-image: url(../../static/img/expression_icon.png);
      }
      .misim-chat-ex li:first-child:hover {
        background-image: url(../../static/img/expression_in.png);
      }
      .misim-chat-ex li:last-child {
        background-image: url(../../static/img/expression_icon2.png);
      }
      .misim-chat-ex li:last-child:hover {
        background-image: url(../../static/img/expression_icon2_in.png);
      }
      ul li:first-child.active {
        background-image: url(../../static/img/expression_in.png);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%
      }
      ul li:first-child img {
        width: 16px;
        height: 16px;
        vertical-align: middle
      }
      ul li:last-child img {
        width: 14px;
        height: 16px;
        vertical-align: middle
      }
    }
    div.misim-top-right {
      float: right;
      font-size: 12px;
      text-align: right;
      ul li {
        width: 60px;
        height: 40px;
        background-size: 100%;
        span{
          box-sizing: border-box;
        }
        .assess_icon {
          width: 12px;
          height: 12px;
          display: inline-block;
          background-size: 100%;
          vertical-align: middle;
          margin-bottom: 2px;
        }
      }
      ul li:first-child {
        .assess_icon {
          background-image: url(../../static/img/yes_icon.png);
        }
      }
      ul li:first-child:hover,
      ul li:first-child.active {
        .assess_icon {
          background-image: url(../../static/img/yes_icon_in.png);
        }
      }
      ul li:last-child {
        .assess_icon {
          background-image: url(../../static/img/no_icon.png);
        }
      }
      ul li:last-child:hover,
      ul li:last-child.active {
        .assess_icon {
          background-image: url(../../static/img/no_icon_in.png);
        }
      }
      span {
        padding: 2px
      }
      li:last-child {
        margin: 0;
        span {
          color: #999
        }
      }
      img {
        width: 12px;
        height: 12px;
        vertical-align: middle;
      }
    }
  }
  .test_box {
    padding: 2px 10px 10px 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
    background: #fff;
    text-align: left;
  }
  textarea {
    padding: 0px 10px 10px 15px;
    height: 60px;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    font-family: '微软雅黑';
    resize: none;
    font-size: 12px;
    box-sizing: border-box;
  }
  button {
    position: absolute;
    padding: 4px 20px;
    font-size: 12px;
    bottom: 12px;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 5px;
  }
  button.misim-chat-closebtn {
    right: 100px;
    border: 1px solid #d9d9d9;
    font-weight: 700;
    color: #666;
    background: #fafafa
  }
  button.misim-chat-subbtn {
    right: 15px;
    background: #ff552e;
    color: #fff;
    border: 1px solid #ff552e
  }
  button.misim-chat-closebtn:hover,
  button.misim-chat-closebtn.active {
    background: #fff
  }
  button.misim-chat-subbtn:hover,
  button.misim-chat-subbtn.active {
    background: #fb6f4f;
    border: 1px solid #fb6f4f
  }
}
.misim-chat-upload{
  width: 16px;
  height: 40px;
  display: inline-block;
  background-image: url(../../static/img/icon-upload.png);
  background-repeat: no-repeat;
  float: left;
  margin: 0 6px;
  background-position: center;
  position: relative;
  background-size:100%;
  overflow: hidden;
  input{
    width: 16px;
    height: 16px;
    position: absolute;
    top: 12px;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
}
.misim-chat-upload:hover{
  background-image: url(../../static/img/icon-upload_in.png);
}
</style>
<script charset="utf-8">
import axios from 'axios';
import qs from 'qs';
import expressionIcon from '../../static/img/expression_icon.png';
import expressionIcon2 from '../../static/img/expression_icon2.png';
import yesIcon from '../../static/img/yes_icon.png';
import noIcon from '../../static/img/no_icon.png';
import yesIconIn from '../../static/img/yes_icon_in.png';
import noIconIn from '../../static/img/no_icon_in.png';
import baseData from '../util/util';

export default {
  props: ['session'],
  mounted() {
    this.$nextTick(() => {
      $('.misim-box-btn').on('click', () => {
        ++this.num;
        this.$emit("callCustomer", {
          num:this.num,
          type:0
        });

      });
    })

  },
  data() {
    /**
     * [data 数据模型]
     * @copyright text
     * @return {urlAddress[数据地址],text [文本框内容], activeTab[表情 active],sessionNum[指针变化，实时监听],
      palce[输入框placeholder],expressionList[表情 截图], assessList[满意 不满意], exlist[表情列表], isshow[表情列表状态],num[num改变，实时监听],clicktag[禁止用户连续操作],assActive[满意 不满意active],stripscript[过滤特殊字符]}
     */
    return {
      urlAddress: baseData.urlBase,
      text: '',
      activeTab: false,
      sessionNum: 0,
      palce: '请描述您的问题，如「怎样进行广告推广」',
      expressionList: [{
          value: expressionIcon,
        },
        {
          value: expressionIcon2,
          id: 'btnBack',
        }
      ],
      assessList: [{
          value: yesIcon,
          text: '满意'
        },
        {
          value: noIcon,
          text: '不满意'
        }
      ],
      exlist: baseData.faceBase,
      isshow: false,
      num: 0,
      clicktag: 0,
      assActive: -1,
      stripscript:function(s){
         var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\.<>/~！@#￥&*（）——|{}【】‘；：”“']") 
          var rs = ""; 
          for (var i = 0; i < s.length; i++) { 
          rs = rs+s.substr(i, 1).replace(pattern, ''); 
          } 
          return rs; 
      }
    };

  },
  watch: {
    /**每当session改变时，输出**/
    sessionNum: {
      deep: true,
      handler() {
        ++this.num;
        this.$emit("callCustomer",{
          num:this.num,
          type:0
        });
      }
    }
  },
  methods: {
     /**
     * [fileSubmit 上传本地图片]
     * @copyright 上传
     * @param  {}
     * @return {}
     */
    fileSubmit(e) {
        var _this = this;
        var evt = e ||window.event;
        var src = evt.srcElement || evt.target; 
        if (!/image\/\w+/.test(src.files[0].type)) {
            alert("只能选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(src.files[0]);
        reader.onload = function (e) { 
          ++this.num;
          var fileimg = this.result;
              _this.session.push({
                date: new Date(),
                self: true,
                type: 3,
                img: fileimg
              })
             $.imSdk.webimbiz.sendMsg({
              msg: {
                content: {
                  url: fileimg,
                  type: 'image',
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
                _this.$emit("callCustomer",{
                  num:_this.num,
                  type:1
                });
              },
              onSendMsgFail: function(err) {

              }
            })
            
        }
     
    },
    /**
     * [textFocus 输入框 focus 关闭表情列表]
     * @copyright 关闭列表
     * @param  {}
     * @return {}
     */
    textFocus(e) {
      var e = e || window.event;
      var target = e.srcElement || e.target;
      target.placeholder = '';
      this.isshow = false;
      this.activeTab = false;
    },
    /**
     * [textFocus 输入框 blur]
     */
    textBlur(e) {
      var e = e || window.event;
      var target = e.srcElement || e.target;
      target.placeholder = "请描述您的问题，如「怎样进行广告推广」";
    },
    /**
     * [ddExp 添加表情聊天]
     * @copyright 点击表情列表
     * @param  {string} 表情索引
     * @return {}
     */
    addExp(index) {
      $('#textarea').focus();
      this.activeTab = false;
      this.text += this.exlist[index].name;
      this.isshow = false;
      this.expressionList[1].value = expressionIcon2;
      this.expressionList[0].value = expressionIcon;

    },
    /**
     * [inputing enter 提交消息]
     * @copyright 消息发送 加入会话列表
     * @param  {object} 事件对象
     * @return {}
     */
    inputing(e) { 

      //过滤特殊字符
      let _this = this;
      if (e.keyCode === 13 || e.which === 13) {
        e.cancelBubble=true;
        e.preventDefault();
        e.stopPropagation();
        this.text =  this.stripscript(this.text);
        if (this.text.replace(/\s+/g,"")!="" && this.text.length > 0) { 
            
           ++this.num;
           ++this.sessionNum;
          if (localStorage.getItem('isCustomer') == 'false') {
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
            axios.get('' + this.urlAddress + '/csr/customers/action/findAnswerByQuestion', {
                params: {
                  question: _this.text,
                  bizLine: 'huangye',
                  expect: '1',
                  isGreeting: '0'
                }
              })
              .then(response => {
                if(response.data.code==403){
                    this.$emit("thinMsg", this.num);
                }else{
                  this.session.push({
                    // loading:true,
                    text: this.text,
                    date: new Date(),
                    name: '我',
                    self: true,
                    isCustomer: false
                  });
                   this.$emit("callCustomer",{
                     num:this.num,
                     type:0
                   });
                    setTimeout(() => {
                      this.session.push({
                        text: response.data.data[0].content,
                        date: new Date(),
                        type: 1,
                        name: '58机器人小八',
                        self: false,
                        isCustomer: false,
                        extData:response.data.extData
                      });

                    }, 500);
                  
                }
                this.text = '';
                return false;

              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.session.push({
                    text: this.text,
                    date: new Date(),
                    name: '我',
                    self: true,
                    isCustomer: false
            });
            $.imSdk.webimbiz.sendMsg({
              msg: {
                content: {
                  msg: _this.text,
                  type: 'text'
                },
                msg_type: 2,
                send_time: new Date(),
                show_type: 'text',
                to_id: localStorage.getItem('customerId'),
                to_source: '8',
                // show_in_app:['10082','100238','100239']
              },
              onUploadImgBegin: function() {},
              onUploadImgSuccess: function(url) {},
              onUploadImgFail: function(err) {},
              onSendMsgBegin: function() {
              },
              onSendMsgSuccess: function(result) {
                console.log(result)
                
                _this.$emit("callCustomer",{
                  num:_this.num,
                  type:1
                });
                  

              },
              onSendMsgFail: function(err
              ) {
               console.log(err)
              }
            });
            _this.text = '';
            return false;
          }
        }
       
        return false;

      }

    },
    /**
     * [exActive 表情 截图]
     * @copyright 用户点击表情 截图
     * @param  {string} 索引
     * @return {}
     */
    exActive(index) {
      var _this = this;
      if (index == 0) {

        if (this.isshow == false) {
          _this.activeTab = true;
        } else {
          _this.activeTab = false;

        }
        this.expressionList[1].value = expressionIcon2;
        this.isshow = !this.isshow;
      } else {
        this.isshow = false;
        this.expressionList[0].value = expressionIcon;
      }
    },
    /**
     * [assessActive 满意 不满意]
     * @copyright 用户点击满意 不满意 客服回复
     * @param  {string} 索引
     * @return {}
     */
    assessActive(index) { /****满意 不满意*****/
      if (this.clicktag == 0) {
        this.clicktag = 1;
        setTimeout(() => {
          this.clicktag = 0
        }, 3000);
        let tog = 0;
        let cs_id = localStorage.getItem('customerId');
        if(cs_id){
            cs_id = localStorage.getItem('customerId')
        }else{
            cs_id = '201710101617465a60cc99'
        } 
        ++this.num;
        if (index == 0) {
          tog = 3;
          this.assessList[0].value = yesIconIn;
          this.assessList[1].value = noIcon;

        } else {
          tog = 1;
          this.assessList[1].value = noIconIn;
          this.assessList[0].value = yesIcon;
        };

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
          isSatisfied: tog,
          toId:cs_id
        });

        axios.post('' + this.urlAddress + '/csr/customers/action/markReply', data)
          .then(response => {
            this.$emit("assasToggle", this.num);
            this.serverIfo = response.data.data;
            this.assActive = index;
          })
          .catch(error => {
            console.log(error);
          });

      } else {
        this.$emit("repeatTip", this.num);
      }


    },
    /**
     * [subMsg 消息发送]
     * @copyright 发送消息添加到会话列表
     * @return {}
     */
    subMsg() {
      this.text =  this.stripscript(this.text);
      if (this.text.replace(/\s+/g,"")!="" && this.text != '') {
        let _this = this;
         ++this.num;
         ++this.sessionNum;
        if (localStorage.getItem('isCustomer') == 'false') {
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
          axios.defaults.headers.common['SessionId'] = localStorage.getItem('SessionId');;
          axios.defaults.headers.common['ReqToken'] = localStorage.getItem('im_token');
          axios.get('' + this.urlAddress + '/csr/customers/action/findAnswerByQuestion', {
              params: {
                question: _this.text,
                bizLine: 'huangye',
                expect: '1',
                isGreeting: '0'
              }
            })
            .then(response => {
                if(response.data.code==403){
                    this.$emit("thinMsg", this.num);
                }else{
                  this.session.push({
                      text: this.text,
                      name: '我',
                      date: new Date(),
                      self: true,
                      isCustomer: false
                    });
                   
                    this.$emit("callCustomer",{
                        num:this.num,
                        type:0
                    });
                    let extId = response.data.data[0].templateId,
                          extStatus = 0;
                      if(extId==-1){
                          extStatus = 0;
                      }else{
                          extStatus = 1;
                      }
                    this.session.push({
                      text: response.data.data[0].content,
                      date: new Date(),
                      type: 1,
                      name: '58机器人小八',
                      self: false,
                      isCustomer: false,
                      extData:response.data.extData
                    });
                }
                this.text = '';
                return false;
              
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.session.push({
                    text: this.text,
                    date: new Date(),
                    name: '我',
                    self: true,
                    isCustomer: false
            });
          $.imSdk.webimbiz.sendMsg({
            msg: {
              content: {
                msg: _this.text,
                type: 'text'
              },
              msg_type: 2,
              send_time: new Date(),
              show_type: 'text',
              to_id: localStorage.getItem('customerId'),
              to_source: '8',
              // show_in_app:['10082','100238','100239']
            },
            onUploadImgBegin: function() {},
            onUploadImgSuccess: function(url) {},
            onUploadImgFail: function(err) {},
            onSendMsgBegin: function() {},
            onSendMsgSuccess: function(result) {

               _this.$emit("callCustomer",{
                  num:_this.num,
                  type:1
                });
                 

            },
            onSendMsgFail: function(err) {

            }
          });
           _this.text = '';
           return false;
        }
        
        
      }


    },

    /**
     * [closeChat 清楚session]
     * @copyright 清楚当前会话在缓存中的消息体
     * @return {}
     */
    closeChat() {
        $('.misim-dialog').show();
        $('.misim-dialog-main').show();

    }
  }
}

</script>
