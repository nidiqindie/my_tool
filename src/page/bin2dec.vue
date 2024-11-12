<script setup lang="ts">
import { ref, watch } from 'vue';
const binary = ref('');
const decmal = ref("");
watch(binary, () => {
  const regex = /^[01]+$/;
  if (!regex.test(binary.value) && binary.value !== '') {
    alert('请输入二进制数字');
    binary.value = '';
  }
}, { immediate: false });

</script>

<template>
  <div class="title">
    <h1>Hello!请输入一串二进制数字</h1>
    <input class="input" v-model="binary" type="string">
    <button @click="decmal = parseInt(binary, 2).toString()">转换</button>
    <div class="result">
      <span class="resulttitle">转换结果:</span>
      <span>{{ decmal }}</span>
    </div>
  </div>
</template>

<style scoped>
.title {
  width: 100vw;
  background-color: rgb(81, 175, 175);

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    background: linear-gradient(90deg, #782222, #935a2b, #ffeb00, #156832, #135c70);
    /* 渐变色彩 */
    background-clip: text;
    /* 使背景只在文字部分显示 */
    -webkit-background-clip: text;
    /* 兼容 Safari */
    color: transparent;
    /* 文字颜色设置为透明 */
    animation: gradient-animation 3s ease infinite;
    /* 渐变动画 */
  }

  button {
    margin: 10px;
    width: 20vw;
    background-color: rgb(52, 150, 150);
  }

  .input {
    width: 400px;
  }

  .result {
    .resulttitle {
      font-weight: bold;
    }
  }
}
</style>
