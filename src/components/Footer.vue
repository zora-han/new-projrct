<template>
    <p id='footer' class='footer'>Copyright {{company}} 版权所有&copy; {{time}}</p>
</template>

<script>


export default {
  name: 'footer',
  data(){
      return {
          company:'中新网络信息安全股份有限公司',
          time:'2002-2017'
      }
  }
}
</script>

<style scoped>
    .footer{
        color:#909399;
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        text-align: center;
        background-color: rgba(204,204,204,.1);
        margin: 0;
        padding:5px 0;
    }
</style>