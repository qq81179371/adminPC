<template>
  <div class="wrap" v-if="false">
    <h4>
      <span>注册</span>
      <p>本机序列号为：XXXXXXXXXXXXX</p>
    </h4>
    <el-form ref="form" :model="form">
      <el-form-item props="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入您的手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item props="code" class="display_flex">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        <el-button type="primary" @click="handleGetCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item props="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请创建密码"
        ></el-input>
      </el-form-item>
      <el-form-item props="userAgreement" class="display_flex">
        <el-checkbox v-model="form.userAgreement" />
        <p>确定阅读并同意<span>《用户协议》</span> 吗？</p>
      </el-form-item>
      <el-form-item props="code">
        <el-button class="btn" type="primary" @click="handleGetCode">
          提交
        </el-button>
        <p class="btn_flex">
          已有账号？
          <el-button type="text" @click="handleJumpLogin">前往登录</el-button>
        </p>
      </el-form-item>
    </el-form>
  </div>
  <div class="success" v-else>
    <i class="el-icon-success"></i>
    <p>恭喜注册成功</p>
    <el-button class="btn" type="primary" @click="handleJumpLogin">
      前往登录
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
        code: '',
        userAgreement: false
      }
    }
  },
  methods: {
    handleGetCode() {},
    handleJumpLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 40px;
  h4 {
    margin-bottom: 14px;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #2d2d2d;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #2d2d2d;
    }
  }
  .el-form {
    .el-form-item {
      margin-bottom: 20px;
      .btn {
        width: 100%;
      }
      .btn_flex {
        font-size: 14px;
        font-weight: 400;
        color: #2d2d2d;
        text-align: center;
        .el-button {
          color: #0065b3;
        }
      }
    }
    .display_flex {
      :deep .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: 1;
        .el-button,
        p {
          margin-left: 10px;
        }
        p {
          font-size: 12px;
          font-weight: 400 !important;
          color: #000000;
          span {
            cursor: pointer;
            color: #0071c4;
          }
        }
      }
    }
  }
}
.success {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    font-size: 60px;
    color: #11a032;
    margin-bottom: 20px;
  }
  p {
    font-size: 40px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #2d2d2d;
  }
  .btn {
    width: 100%;
    margin-top: 130px;
  }
}
</style>
