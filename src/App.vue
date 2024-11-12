<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
  </div>

</template>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease-in-out;
}

.fade-enter,
.fade-leave-to
  {
  opacity: 0;
}
</style>
