<template>
  <div class="qa_lsit">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in list" :key="index">
        <div class="item">
          <h3>
            {{ item.title }}
          </h3>
          <h4>{{ item.nickName }}</h4>
          <p>
            <span>{{ item.endTime }}</span>
            <span>{{ item.endTime }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getQaListOfId } from '@/api/qa'

export default {
  data() {
    return {
      list: [
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        },
        {
          title: '问题列表',
          starttTime: '2020-01-02 14:20',
          endTime: '2020-01-02 14:20',
          nickName: '设备号 145454164578反馈'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { accountId } = JSON.parse(localStorage.getItem('token'))
        const res = await getQaListOfId(accountId)
        this.list = res.data
      } catch (err) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qa_lsit {
  .item {
    display: flex;
    background: #fff;
    display: flex;
    margin-bottom: 20px;
    height: 300px;
    box-shadow: 0px 2px 10px rgba($color: #666, $alpha: .4);
    padding: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all .3s;
    border-radius: 5px;
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 16px;
      color: 6666;
      margin: 10px 0;
    }
    p {
      display: flex;
      line-height: 26px;
      flex-direction: column;
    }
    &:hover {
      transform: translateY(-5px);
    }
  }
}
</style>
