<template>
  <div id='login' class='login-contain'>
      <app-header></app-header>

      <el-card class="box-card center">
        <div slot="header" class="box-card-title"><span class='icons my-icon-net'></span>{{title}}</div>
        <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
            <el-form-item class='form-item' prop="name">
              <el-input type="text" placeholder="请输入账户" prefix-icon='icons my-icon-yonghu'  v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item class='form-item' prop="password">
              <el-input type="password" placeholder="请输入密码" prefix-icon='icons my-icon-mima' v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item class='form-item' prop="code">
              <el-input type="text" placeholder="请输入验证码" prefix-icon='icons my-icon-yanzhengma' class='input-code' v-model="ruleForm.code" @keyup.enter.native ="submitForm('ruleForm')"></el-input>
              <code-set v-on:codeChanged='updateCode($event)'></code-set>
            </el-form-item>

            <div class='form-item'>
              <el-button type="primary"  @click="pageInit()">立即登陆</el-button>
            </div>
          </el-form>
      </el-card>

      <el-button type="primary" class="license-button" @click="openLicenseWin()" ref="license" v-if="showBtn">导入授权文件</el-button>

      <app-footer></app-footer>
  </div>
</template>

<script>
import LoginHeader from './LoginHeader'
import Footer from './Footer'
import CodeSet from './plugin/CodeSet'

export default {
    name: 'login',
    data() {
      var checkCode = (rule, value, callback) => {
        if(value.toUpperCase() !== this.identifyCode){
          callback(new Error('验证码错误'));
        }else {
          callback();
        }
      };

      return {
        licenseFlag:false,
        pass: '',
        showBtn:false,
        checkPass: '',
        title:"网络空间态势感知",
        loginBg:require('../assets/images/login-bg.jpg'),
        identifyCode:'',
        ruleForm: {
          name: '',
          password:'',
          code:''
        },
        rules: {
          name: [
            { required: true, message: '请输入账户', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      updateCode(code){
        this.identifyCode = code
      },
      openTip(msg,flag) {
        let h = this.$createElement;
        let typeNotify = 'success';
        let colorNotify = '#67C23A';
        let titleNotify = '成功';
        if(!flag){
          typeNotify = 'error';
          colorNotify = '#F56C6C';
          titleNotify = '失败';
        }

        this.$notify({
          title: titleNotify,
          message: h('i', { style: 'color: '+ colorNotify}, msg),
          type: typeNotify
        });
      },
      pageInit(){
        console.log("test");
        var c = false;
        var b = "../services/BMPLicenseService?wsdl";
        var a = new jetsennet.Service(b);
        console.log(a)
        a.async = true;
        a.displayLoading = false;
        a.oncallback = function(d) {
              //var e = jetsennet.xml.toObject(d.resultVal).Record;
          alert(d.resultVal);
        }
        ;
        a.onerror = function(d) {
            alert("onerror");
        }
        ;
        a.call("bmpCheckIsGetLicense", []);
        // return c
      },
      // 打开授权导入页面
      openLicenseWin() {
          var pathName = window.document.location.pathname;
          var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
          var href = projectName + "/jbmp/jbmpsystemweb/impower.htm";
          window.open(href, 'newwindow', 'height=720,width=964,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
      },
      // 授权验证
      license() {
          var thisI = this;
          var BMP_LICENSE_SERVICE = jetsennet.appPath + "../services/BMPLicenseService?wsdl";
          var ws = new jetsennet.Service(BMP_LICENSE_SERVICE);
          ws.async = false;
          ws.oncallback = function (ret) {
              var o = jetsennet.xml.toObject(ret.resultVal).Record;
              if (o.license == "false") {
                if(thisI.licenseFlag){
                  thisI.openTip(o.msg,false);
                }else{
                  thisI.licenseFlag = true
                }
                  thisI.showBtn = true;
              } else {
                thisI.openTip(o.msg,true);
                thisI.showBtn = true;
              }
          }
          ws.onerror = function (ex) {
              $("#errorInfo").html(ex).show();
          };
          ws.call("bmpCheckIsGetLicense", []);
      }
    },
    components: {
      'app-header':LoginHeader,
      'app-footer':Footer,
      'code-set':CodeSet
    },
    created:function(){
      var userInfo = {
          AreaId: "",
          CheckinType: "",
          ColumnId: "",
          HomePath: "",
          LoginId: "20161212",
          LoginTime: "2016-12-12",
          PageInfo: "",
          PageTheme: "jsnet",
          PersonId: "",
          RightLevel: "0",
          UserGroups: "0,12",
          UserId: "0",
          UserName: "20161212",
          UserPath: "",
          UserRoles: "1",
          UserToken: "20161212",
          UserType: "0"
      }
      jetsennet.setUserInfo(userInfo);
    },
    mounted:function(){
      this.license()
  },
  }
</script>

<style scoped>
  .box-card {
    width: 300px;
    height: 350px;
    border-color:#0A162B;
    background-color: #0A162B;
  }

  .box-card-title{
    text-align: center; 
    font-size: 24px;
    color: #3161A2;
  }

  .box-card-title span{
    font-size: 20px;
    margin-right: 5px;
  }

  .input-code{
    width: 140px;
    display: inline-block
  }
  
</style>