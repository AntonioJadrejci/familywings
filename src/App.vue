<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="no-underline">FamilyWings</router-link> |
      <router-link to="/" class="no-underline">About</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style scoped>
.navbar {
  background-color: #9400d3;
  padding: 30px 0;
}

.container {
  display: flex;
  justify-content: space-around;
  color: white;
}

.no-underline {
  text-decoration: none;
}
</style>
