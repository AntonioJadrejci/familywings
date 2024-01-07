<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="no-underline"
        ><img
          src="@/assets/Naslov4.png"
          alt="FamilyWings"
          class="router-link-image"
      /></router-link>

      <router-link to="/about" class="no-underline2">About</router-link>
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
  margin-right: 700px;
}

.no-underline2 {
  text-decoration: none;
  margin-left: 700px;
}

.router-link-image {
  width: 250px;
  height: auto;
  /* Add other necessary styles for the image */
}
</style>
