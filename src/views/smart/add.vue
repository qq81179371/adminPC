<template>
  <el-dialog v-model="addShow" width="800px" :show-close="false">
    <template #title>
      <div class="dialog_header">
        <span>新增</span>
        <i class="el-icon-close" @click="addShow = false"></i>
      </div>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input type="text" class="w_200" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="问题编号" prop="code">
        <el-input
          type="text"
          class="w_200"
          v-model="ruleForm.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="显示内容方式" prop="showType">
        <el-radio-group v-model="ruleForm.showType">
          <el-radio :label="1">下级问题</el-radio>
          <el-radio :label="2">问题答案</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="问题答案" prop="imgUrl">
        <Tinymce :height="150" v-model="ruleForm.contents" />
      </el-form-item>
      <el-form-item label="所属上级问题" prop="parentId">
        <el-select
          v-model="ruleForm.parentId"
          class="w_200"
          placeholder="请选择上级"
        >
          <el-option label="说明书" :value="0"></el-option>
          <el-option label="说明书" :value="1"></el-option>
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
import Tinymce from '@/components/Tinymce/index.vue'
import { addAi, updateAi } from '@/api'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      props: {
        label: ''
      },
      isEdit: false,
      autoData: [],
      addShow: false,
      ruleForm: {
        title: '',
        code: '',
        showType: 1,
        contents: '',
        parentId: null
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入编号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    show(data) {
      if (data) {
        this.isEdit = true
        this.ruleForm = data
      } else {
        this.isEdit = false
        this.ruleForm = {
          title: '',
          linkUrl: '',
          showLocation: 1,
          imgUrl: ''
        }
      }
      this.addShow = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          const request = this.isEdit ? updateAi : addAi
          await request(this.ruleForm)
          this.$notify({
            title: '提示',
            message: this.isEdit ? '编辑成功' : '添加成功',
            type: 'success'
          })
          this.addShow = false
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
