<template>
  <div class="background-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.background-container {
  background-image: url("~@/assets/A321.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  border-radius: 0 !important;
}
</style>