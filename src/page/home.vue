<template>
  <div class="background">
    <div class="nav">
      <ul style="list-style-type: none;">
        <li class="slide"></li>
        <li class="item" v-for="item in ['bin2dec', '计算器喵']" :key="item" @mouseenter="change" @click="route">{{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get_current_item_coordinates } from '@/ts/api/ts_api';
import type { coordinatesType } from '@/ts/type/index';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const count = ref(0);

const route = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // 获取要跳转的路由路径
  const targetName = target.textContent?.trim();
  if (targetName === 'bin2dec') {
    router.push('/bin2dec'); // 根据需要替换为实际路径
  } else if (targetName === '计算器喵') {
    router.push('/calculator'); // 根据需要替换为实际路径
  }

}
const change = (event: MouseEvent) => {


  const coordinates: coordinatesType = get_current_item_coordinates(event.target as HTMLElement);

  const slide = document.querySelector('.slide') as HTMLElement;
  const slw = slide.clientWidth / 2;
  const slh = slide.clientHeight / 2;
  if (count.value === 0) {
    count.value = 1; // Hide the slide after first hover
    slide.style.left = `${coordinates.x - slw}px`;
    slide.style.top = `${coordinates.y - slh}px`;
    slide.style.opacity = '1'; // 初始化后显示
  } else {
    slide.style.left = `${coordinates.x - slw}px`;
    slide.style.top = `${coordinates.y - slh}px`;
  }


}
</script>

<style scoped lang="scss">
.background {
  caret-color: transparent;
  width: 100vw;
  height: 100vh;
  // background-color: antiquewhite;
  transition: background-color 1s ease-in-out;
  animation: background_change 5s infinite;

  .nav {
    margin: 0 auto;
    width: 50%;
    height: 5%;



    ul {
      border-radius: 20px;
      display: flex;
      padding: 0; // 去除内边距
      margin: 0; // 去除外边距
      justify-content: center;
      align-items: center;
      gap: 5%;
      width: 100%;
      height: 100%;
      background-color: aliceblue;

      .slide {
        position: absolute;
        display: inline-block;
        z-index: 3;
        width: 11%;
        height: 5%;
        background-color: rgb(44, 158, 189);
        transition: all 1s ease-in-out;
        border-radius: 20px;
        opacity: 0;
      }

      .item {
        cursor: pointer;
        z-index: 4;
        background-color: aquamarine;
        width: 20%;
        height: 70%;
        text-align: center;
        border-radius: 20px;

      }

    }
  }
}

@keyframes background_change {
  0% {
    background-color: rgb(44, 158, 189);
  }

  20% {
    background-color: rgb(81, 175, 175);
  }

  40% {
    background-color: rgb(37, 124, 124);
  }

  60% {
    background-color: rgb(113, 169, 169);
  }

  80% {
    background-color: rgb(100, 148, 148);
  }

  100% {
    background-color: rgb(44, 158, 189);
  }
}
</style>
