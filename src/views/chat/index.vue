<template>
  <div class="home_wrap">
    <userList :list="list" :currenId="currenId"/>
    <chatRoom ref="chatRoom" :currenId="currenId" v-model:list="list"/>
    <serveSupport />
  </div>
</template>

<script>
import { getSessionList } from '@/api'
import { mapGetters } from 'vuex'
import userList from './components/userList.vue'
import chatRoom from './components/chatRoom.vue'
import serveSupport from './components/serveSupport.vue'

export default {
  components: {
    chatRoom,
    userList,
    serveSupport
  },
  data() {
    return {
      currenId: 0,
      list: [],
      currentChat: {}
    }
  },
  watch: {
    currenId(val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  async created() {
    this.init()
    try {
      const { accountId } = this.userInfo
      const res = await getSessionList(accountId)
      this.list = res.data
      this.currenId = res.data[0].chatSession.accountId
      console.log(this.currenId)
      this.$refs.chatRoom.fetchMsgList(true)
    } catch (err) {
      // err
    }
    // this.handleUpdateList()
  },
  methods: {
    async init() {
      this.$nextTick(() => {
        this.$refs.chatRoom.init()
      })
    },
    async handleUpdateList() {
      try {
        const { accountId } = JSON.parse(localStorage.getItem('token'))
        const res = await getSessionList(accountId)
        this.list = res.data
      } catch (err) {
        // err
      }
    },
    handleSessionAccess(data) {
      this.currenId = data.chatSession.accountId
      // this.$refs.chatRoom.handleChangeChat(data.chatSession)
    }
  }
}
</script>

<style lang="scss" scoped>
.home_wrap {
  height: calc(100vh - 160px);
  background: #f2f2f2;
  display: flex;
}
</style>
