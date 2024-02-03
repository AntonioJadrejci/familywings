<template>
  <div class="home-background"></div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home-background {
  background-image: url("../assets/A321.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  border-radius: 0 !important;
}
</style>
