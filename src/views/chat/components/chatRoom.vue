<template>
  <div class="chat_wrap">
    <div class="wxchat-container" ref="wxchatContainer">
      <div v-for="item in msgList" :key="item" class="message">
        <p class="time" v-if="item.id % 2 === 0">
          <i></i>
          <span v-html="item.ctime"></span>
          <i></i>
        </p>
        <div :class="'main' + (item.location === 2 ? ' self' : '')">
          <img class="avatar" v-img :src="item.chatAccount.headUrl" />
          <div class="info">
            <div class="name">
              <p>{{ item.chatAccount.nickName }}</p>
              <span>{{ item.chatContent.sendTime }}</span>
            </div>
            <div
              class="text"
              v-if="item.chatContent.msgType === 1"
              v-text="item.chatContent.contents"
            ></div>
            <div class="text _img" v-else-if="item.chatContent.msgType === 2">
              <img :src="item.content" class="image" alt="聊天图片" v-img />
            </div>
            <div class="text _img" v-else-if="item.type === 3">
              <video :src="item.content" class="image" controls="controls">
                浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
        <!-- <div class="rate_wrap" v-if="index === wxChatData.length - 1">
          <h4>请对此次服务是否满意做出评价！</h4>
          <el-rate v-model="rate" show-text :texts="rateText"></el-rate>
          <el-button size="mini">提交评价</el-button>
        </div>
        <p class="time" v-if="index === wxChatData.length - 1">
          <i></i>
          <span>会话结束</span>
          <i></i>
        </p> -->
      </div>
    </div>
    <wcim-tab-bar @handleSendMessage="handleSendMessage" ref="wcimTabBar" />
  </div>
</template>

<script>
import { wsStart, sendMessage } from '@/utils/chat'
import { mapActions, mapGetters } from 'vuex'
import { getMsgList } from '@/api'
import wcimTabBar from './wcimTabBar.vue'

export default {
  components: {
    wcimTabBar
  },
  props: {
    list: Array,
    currenId: Number
  },
  data() {
    return {
      connectedList: [],
      rate: 3,
      state: {
        loading: false,
        finished: false,
        refreshing: false
      },
      msgList: [],
      rateText: ['非常差', '差', '一般', '满意', '非常满意'],
      listQuery: {
        source: 1,
        kw: '',
        page: 1,
        pageSize: 20
      }
      // userInfo: JSON.parse(localStorage.getItem('token'))
      // {
      //   direction: 2,
      //   id: 1,
      //   type: 1,
      //   content: '你好!![呲牙]',
      //   ctime: new Date().toLocaleString()
      // },
    }
  },
  computed: {
    ...mapGetters(['chatData', 'userInfo']),
    wxChatData() {
      return this.chatData[this.currenId] ?
        this.chatData[this.currenId].list :
        []
    }
  },
  // mounted() {
  //   console.log(this.currenId)
  //   this.fetchMsgList(true)
  // },
  methods: {
    ...mapActions({
      handleSetChat: 'chat/setChatData',
      handleAddChat: 'chat/addChatData'
    }),
    init() {
      const params = {
        ReceiveAccountId: this.userInfo.accountId,
        MessageType: 1,
        SendAccount: {
          AccountId: this.userInfo.accountId,
          AccountName: this.userInfo.accountName,
          NickName: this.userInfo.nickName,
          HeadUrl: this.userInfo.headUrl,
          AccountType: 1,
          State: 0,
          AccessState: this.userInfo.accessState,
          ServiceClassifys: this.userInfo.serviceClassifys
        },
        MessageBody: {
          MsgId: null,
          MsgType: 0,
          Contents: 0
        }
      }
      wsStart(params, (msg) => {
        const newMsg = JSON.parse(msg)
        console.log(newMsg)
        if (newMsg.MessageType === 0) {
          this.msgList.push({
            location: 1,
            chatAccount: {
              nickName: newMsg.SendAccount.NickName,
              headUrl: newMsg.SendAccount.HeadUrl,
              accountType: newMsg.SendAccount.AccountType
            },
            chatContent: {
              contents: newMsg.MessageBody.Contents,
              sendTime: newMsg.MessageBody.SendTime,
              msgType: newMsg.MessageBody.MsgType
            }
          })
        }
        if (newMsg.MessageType === 7) {
          // const newUser = newMsg.SendAccount
          // this.$emit('update:list', list)
          // const { list } = this
          // console.log('list', list, newUser)
          // if (list.some((v) => v.AccountId === newUser.AccountId)) {
          //   list.splice(list.findIndex((v) => v.AccountId === newUser.AccountId), 1, newUser)
          // } else {
          //   list.push(newUser)
          // }
          // this.$emit('update:list', list)
        }
        // this.$parent.handleUpdateList()
        this.$nextTick(() => {
          this.$refs.wxchatContainer.scrollTop =
              this.$refs.wxchatContainer.scrollHeight
        })
      })
    },
    fetchMsgList(refresh) {
      try {
        this.$nextTick(async() => {
          const msg = await getMsgList({
            ...this.listQuery
          }, this.currenId)
          this.msgList = msg.data
          if (refresh) {
            this.$nextTick(() => {
              this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
            })
          }
        })
      } catch (err) {
        // err
      }
    },
    // handleChangeChat(data) {
    //   if (
    //     !this.connectedList.some((v) => v === this.currenId)
    //   ) {
    //     const params = {
    //       ReceiveAccountId: data.accountId,
    //       MessageType: 8,
    //       SendAccount: {
    //         AccountId: this.userInfo.accountId,
    //         AccountName: this.userInfo.accountName,
    //         NickName: this.userInfo.nickName,
    //         HeadUrl: this.userInfo.headUrl,
    //         AccountType: 2,
    //         State: 0,
    //         AccessState: null
    //       },
    //       MessageBody: {
    //         MsgId: this.guid(),
    //         MsgType: 0,
    //         Contents: '',
    //         SendTime: new Date().toLocaleString()
    //       }
    //     }
    //     sendMessage(params, () => {
    //       this.connectedList.push(data.AccountId)
    //     })
    //   }
    // },
    sendMessage(params) {
      sendMessage(params, () => {
        this.msgList.push({
          location: 2,
          chatAccount: {
            nickName: params.SendAccount.NickName,
            headUrl: params.SendAccount.HeadUrl,
            accountType: params.SendAccount.AccountType
          },
          chatContent: {
            contents: params.MessageBody.Contents,
            sendTime: params.MessageBody.SendTime,
            msgType: params.MessageBody.MsgType
          }
        })
        this.$nextTick(() => {
          this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
        })
      })
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    getNowTime() {
      let dateTime = null
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ?
        `0${new Date().getMinutes()}` :
        new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ?
        `0${new Date().getSeconds()}` :
        new Date().getSeconds()
      dateTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`
      return dateTime
    },
    handleSendMessage(message, type) {
      const params = {
        ReceiveAccountId: this.currenId,
        MessageType: 0,
        SendAccount: {
          AccountId: this.userInfo.accountId,
          AccountName: this.userInfo.accountName,
          NickName: this.userInfo.nickName,
          HeadUrl: this.userInfo.headUrl,
          AccountType: 1,
          State: 0,
          AccessState: null
        },
        MessageBody: {
          MsgId: this.guid(),
          MsgType: type,
          Contents: message,
          SendTime: this.getNowTime()
        }
      }
      this.sendMessage(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat_wrap {
  border: 1px solid #f2f2f2;
  flex: 1;
  height: 100%;
  .wxchat-container {
    height: calc(100% - 200px);
    overflow: auto;
    background: rgba(0, 101, 179, 0.04);
  }
  .message {
    margin-bottom: 20px;
    left: 0;
    position: relative;
    display: block;
    .main {
      padding: 20px;
      display: flex;
      align-items: flex-start;
    }
    .time {
      margin: 20px 0;
      text-align: center;
      color: #2d2d2d;
      font-size: 12px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        margin: 0 5px;
      }
      i {
        flex: 1;
        border-bottom: 1px dashed #ccc;
      }
    }
    .info {
      .name {
        display: flex;
        margin-bottom: 10px;
        p {
          font-size: 14px;
          font-weight: 700;
          color: #2d2d2d;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: #7d7d7d;
          margin: 0 16px;
        }
      }
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 7px 10px;
      max-width: 700px;
      min-height: 36px;
      line-height: 20px;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background: rgba(0, 101, 179, 0.04);
      color: #2d2d2d;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      &::before {
        content: " ";
        position: absolute;
        top: 10px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: rgba(0, 101, 179, 0.04);
      }
      &._img {
        padding: 6px 5px;
        border-radius: 10px;
      }
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 0 20px 0 0;
      background: #fff;
    }
    .self {
      flex-direction: row-reverse;
      .avatar {
        margin: 0 0 0 20px;
      }
      .text {
        background-color: #89f275;
        &::before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #89f275;
        }
      }
      .info {
        text-align: right;
        .name {
          flex-direction: row-reverse;
        }
      }
    }
    .image {
      display: block;
      max-width: 200px;
    }
    .rate_wrap {
      width: calc(100% - 20px);
      margin: 0 10px;
      background: #fff;
      padding: 15px 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-rate {
        position: relative;
        margin: 15px 0;
        :deep .el-rate__text {
          position: absolute;
          left: 110%;
          white-space: nowrap;
        }
      }
    }
  }
}
.an-move-left {
  left: 0;
  animation: moveLeft 0.7s ease;
  -webkit-animation: moveLeft 0.7s ease;
}
.an-move-right {
  left: 0;
  animation: moveRight 0.7s ease;
  -webkit-animation: moveRight 0.7s ease;
}
.bgnone {
  background: none;
}
@keyframes moveRight {
  0% {
    left: -20px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}

@-webkit-keyframes moveRight {
  0% {
    left: -20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@keyframes moveLeft {
  0% {
    left: 20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}

@-webkit-keyframes moveLeft {
  0% {
    left: 20px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}

@media (max-width: 367px) {
  .fzDInfo {
    width: 82%;
  }
}
</style>
