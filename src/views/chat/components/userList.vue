<template>
  <div class="usre_list">
    <div class="item_self">
      <img class="avatar" :src="userInfo.headUrl" v-img alt="" />
      <div class="lf">
        <div class="name">
          <p>
            {{ userInfo.nickName }}
            <span :class="{ online: userInfo.state }"
              >({{ userInfo.state ? "在线" : "离线" }})</span
            >
          </p>
          <i class="icon" @click="handleEdit">
            <tools />
          </i>
        </div>
        <p class="state">
          【{{ userInfo.accessState ? "允许接入" : "停止接入" }}】
        </p>
      </div>
    </div>
    <!-- <el-tabs v-model="activeName" class="tabs" @tab-click="handleUpdateList">
      <el-tab-pane label="会话" name="session"> -->
    <div
      class="item"
      v-for="item in list"
      :key="item"
      @click="handleSessionAccess(item)"
      :class="{ active: item.chatSession.accountId === currenId }"
    >
      <div class="lf">
        <img class="avatar" :src="item.chatSession.headUrl" v-img alt="" />
        <div class="name">
          <p>{{ item.chatSession.nickName }}</p>
          <span :class="{ online: item.chatSession.state }"
            >({{
              item.chatSession.chatSession === 1 ? "服务中" : "已结束"
            }})</span
          >
        </div>
      </div>
      <div class="rg">
        <div class="icon" :class="{ msg: item % 2 === 0 }">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <el-empty v-if="!list.length" description="暂无会话"></el-empty>
    <!-- </el-tab-pane>
      <el-tab-pane label="接入" name="wait">
        <div
          class="item"
          v-for="item in waitList"
          :key="item"
          @click="handleSessionAccess(item)"
          :class="{ active: item.chatSession.accountId === currenId }"
        >
          <div class="lf">
            <img class="avatar" :src="item.chatSession.headUrl" v-img alt="" />
            <div class="name">
              <p>{{ item.chatSession.nickName }}</p>
              <span :class="{ online: item.chatSession.state }"
                >({{
                  item.chatSession.chatSession === 1
                    ? "服务中"
                    : item.chatSession.chatSession === 10
                    ? "已结束"
                    : "待接入"
                }})</span
              >
            </div>
          </div>
          <div class="rg">
            <div class="icon" :class="{ msg: item % 2 === 0 }">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <el-empty v-if="!waitList.length" description="暂无待接入会话"></el-empty
      ></el-tab-pane>
    </el-tabs> -->
  </div>
  <addForm ref="addForm" @init="init" />
</template>

<script>
// import { getSessionList, getSessionWaitList } from '@/api'
import { Tools } from '@element-plus/icons'
import addForm from './add.vue'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    currenId: Number
  },
  components: {
    Tools,
    addForm
  },
  data() {
    return {
      activeName: 'session',
      userInfo: {},
      finshList: [],
      waitList: []
      // list: []
    }
  },
  // mounted() {
  //   this.init()
  // },
  methods: {
    handleEdit() {
      this.$refs.addForm.show(this.userInfo)
    },
    handleSessionAccess(data) {
      this.$parent.handleSessionAccess(data)
    }
    // async handleUpdateList() {
    //   try {
    //     const res = await getSessionList(this.userInfo.accountId)
    //     this.finshList = res.data
    //   } catch (err) {
    //     // err
    //   }
    // },
    // async init() {
    //   try {
    //     this.userInfo = JSON.parse(localStorage.getItem('token'))
    //     this.handleUpdateList()
    //   } catch (err) {
    //     // err
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.usre_list {
  width: 300px;
  .item_self {
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    cursor: pointer;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      margin-right: 10px;
    }
    .lf {
      flex: 1;
    }
    .name {
      justify-content: space-between;
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      p {
        font-size: 16px;
        font-weight: 700;
        color: #2d2d2d;
      }
      span {
        font-size: 16px;
        font-weight: 400;
        color: #7d7d7d;
        &.online {
          color: #009a24;
        }
      }
      .icon {
        cursor: pointer;
        display: block;
        width: 20px;
        color: #0071c4;
        height: 20px;
        font-size: 20px;
      }
    }
    .state {
      color: #0071c4;
    }
  }
  .tabs {
    background: #fff;
    :deep .el-tabs__nav {
      width: 100%;
      .el-tabs__item {
        width: 50%;
        text-align: center;
        font-size: 22px;
      }
    }
  }
  .item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    cursor: pointer;
    justify-content: space-between;
    .lf {
      display: flex;
      align-items: center;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .name {
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 16px;
          font-weight: 700;
          color: #2d2d2d;
        }
        span {
          font-size: 16px;
          font-weight: 400;
          color: #7d7d7d;
          &.online {
            color: #009a24;
          }
        }
      }
    }
    .rg {
      padding: 0 10px 0;
      .icon {
        i {
          font-size: 20px;
          color: #2d2d2d;
        }
        &.msg {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 12px;
            background: #ff0000;
            border-radius: 50%;
            top: 50%;
            margin-top: -6px;
            left: -15px;
          }
        }
      }
    }
    &:hover,
    &.active {
      background: rgba(0, 101, 179, 0.1);
    }
  }
}
</style>
