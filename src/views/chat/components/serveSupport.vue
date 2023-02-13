<template>
  <div class="serve_wrap">
    <h3 class="title">历史问题列表</h3>
    <div class="item_cpntents">
      <div class="item" v-for="item in 5" :key="item">
        <p class="time">2021-01-01 16:30 反馈</p>
        <p class="name">接待人: <span>(未处理)</span></p>
      </div>
    </div>
    <div class="footer_detail">
      <div class="text_box">
        <p>出厂日期：2020-01-01</p>
        <p>机型：EZ pad i7</p>
        <p>CPU:N3450</p>
        <p>屏规格：14寸/欧灵/YN屏</p>
        <p>内存规格：8G</p>
        <p>硬盘规格：128G EMMC</p>
      </div>
      <div class="text_box">
        <p>客户名称：XXXX</p>
        <p>设备号：G3N0CV07W147107</p>
        <p>联系方式：12345678978</p>
      </div>
      <div class="btn_list">
        <el-button type="primary">会话转接</el-button>
        <el-button type="danger" @click="handleChatOver" plain>结束会话</el-button>
      </div>
    </div>
  </div>
  <Driver />
  <Manual />
</template>

<script>
import { sendMessage } from '@/utils/chat'
import Driver from './Driver.vue'
import Manual from './Manual.vue'

export default {
  components: {
    Manual,
    Driver
  },
  methods: {
    handleChatOver() {
      sendMessage(params, () => {
        this.wxChatData.push({
          direction: 2,
          id: 1,
          type: params.MessageBody.MsgType,
          sendTime: new Date().toLocaleString(),
          nickName: this.userInfo.nickName,
          headUrl: this.userInfo.headUrl,
          content: params.MessageBody.Contents
        })
        localStorage.getItem(
          this.currentChat.accountId,
          JSON.stringify(this.wxChatData)
        )
        this.$nextTick(() => {
          this.$refs.wxchatContainer.scrollTop =
            this.$refs.wxchatContainer.scrollHeight
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.serve_wrap {
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  .title {
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
  }
  .item_cpntents {
    flex: 1;
  }
  .item {
    height: 60px;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    padding: 0 20px;
    font-size: 16px;
    color: #2d2d2d;
    cursor: pointer;
    p.time {
      margin: 5px 0;
    }
    &:hover {
      p,
      i {
        color: #0071c4;
      }
    }
  }
  .footer_detail {
    .text_box {
      padding: 25px;
      border-top: 1px solid #ccc;
    }
  }
  .btn_list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 25px 0;
  }
}
</style>
