<template>
    <div class="code" @click="refreshCode">
    <s-identify :identifyCode="identifyCode"></s-identify>
  </div>
</template>

<script>
import SIdentify from './Identify.vue'

export default {
  name: "codeset",
  data() {
    return {
      identifyCodes: "1234567890ABCDEFGHJKLMNOOPQRSTUVWXYZ",
      identifyCode: ""
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      this.$emit('codeChanged',this.identifyCode)
    }
  },
  components:{
      's-identify':SIdentify
  }
};
</script>

<style>
.code {
  margin: 0;
  width: 114px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
}
</style>