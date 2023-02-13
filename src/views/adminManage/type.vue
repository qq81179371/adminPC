<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
    <template #title>
      <div class="dialog_header">
        <span>设置客服类型</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      size="small"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="客服类型" prop="classifyIds">
        <el-select v-model="ruleForm.classifyIds" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.classifyName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog_footer">
        <el-button @click="addShow = false" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { setServiceClassify, getServiceClassify, getServiceClassifyOfId } from '@/api/admin'
// import { getRoleList } from '@/api/role'

export default {
  data() {
    return {
      options: [],
      // isEdit: false,
      fileList: [],
      addShow: false,
      ruleForm: {
        accountId: 0,
        classifyIds: []
      }
    }
  },
  methods: {
    async show(data) {
      console.log(data)
      this.ruleForm.accountId = data.adminId
      const arr = await getServiceClassifyOfId(data.adminId)
      this.ruleForm.classifyIds = arr.data.map((v) => v.id)
      this.addShow = true
      const res = await getServiceClassify()
      this.options = res.data
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          // const request = this.isEdit ?
          //   updateManagerAccount :
          //   addManagerAccount
          await setServiceClassify(this.ruleForm)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '设置成功',
            type: 'success'
          })
          this.addShow = false
          this.$emit('handleRefresh')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.w_200 {
  width: 400px;
}
</style>

<style lang="scss">
.el-overlay {
  .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  max-width: 130px;
  max-height: 130px;
  display: block;
}
</style>
