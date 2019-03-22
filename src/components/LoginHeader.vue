<template>
        <el-header id='loginHeader'>
            <el-row :gutter="10">
                <el-col :span="6"><img :src=logoImage :alt="logoName"></el-col>
                <el-col :span="6" :offset="12">
                    <ul class='login_header'>
                        <li>帮助中心</li>
                        <li>|</li>
                        <li>公司官网</li>
                    </ul>
                </el-col>
            </el-row>
        </el-header>
</template>

<script>


export default {
  name: 'loginHeader',
  data(){
      return {
          logoImage:require('../assets/images/logo.png'),
          logoName:'中新网安'
      }
  }
}
</script>

<style scoped>
    .el-header{
        color:#909399;
        padding-top: 7px;
    }
</style>