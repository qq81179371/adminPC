<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
    <template #title>
      <div class="dialog_header">
        <span>客服信息</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      size="small"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="客服昵称" prop="nickName">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.nickName"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headUrl">
        <el-upload
          class="avatar-uploader"
          action
          :limit="1"
          :show-file-list="false"
          :on-remove="handleRemove"
          :http-request="handleUpload"
        >
          <img v-if="ruleForm.headUrl" :src="ruleForm.headUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="说明书名称" prop="state">
        <el-radio-group v-model="ruleForm.state">
          <el-radio :label="1">在线</el-radio>
          <el-radio :label="0">离线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="说明书名称" prop="accessState">
        <el-radio-group v-model="ruleForm.accessState">
          <el-radio :label="1">允许接入</el-radio>
          <el-radio :label="0">停止接入</el-radio>
        </el-radio-group>
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
import { updateUserInfo } from '@/api'
import { uploadImg } from '@/api/comment'

export default {
  data() {
    return {
      options: [],
      isEdit: false,
      fileList: [],
      addShow: false,
      ruleForm: {
        accountId: 0,
        nickName: '',
        headUrl: '',
        state: 0,
        accessState: 0
      },
      rules: {
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        headUrl: [
          {
            required: true,
            message: '请上传头像',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async handleUpload(fileObj) {
      const formData = new FormData()
      formData.set('file', fileObj.file)
      const msg = this.$message({
        customClass: 'load_message',
        iconClass: 'el-icon-loading',
        duration: 0,
        center: true,
        message: '上传中...'
      })
      try {
        const res = await uploadImg(formData)
        this.ruleForm.headUrl = res.data.fileUrl
        msg.close()
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (err) {
        msg.close()
        throw err
      }
    },
    async show(data) {
      this.ruleForm = { ...data }
      this.addShow = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const res = await updateUserInfo(this.ruleForm)
          this.$notify({
            title: '提示',
            message: '更新成功',
            type: 'success'
          })
          localStorage.setItem('token', res.data)
          this.addShow = false
          this.$emit('init')
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
  width: 130px;
  height: 130px;
  object-fit: cover;
  display: block;
}
</style>
