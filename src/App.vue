<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="no-underline"
        ><img
          src="@/assets/Naslov4.png"
          alt="FamilyWings"
          class="router-link-image"
      /></router-link>

      <button class="menu-button" @click="toggleMenu">
        <font-awesome-icon icon="bars" class="menu-icon" />
      </button>
    </div>
    <Flight :imageSrc="'/assets/Flight.jpg'" />
  </nav>
  <router-view />
</template>

<script>
import Flight from "@/components/Flight.vue";
export default {
  components: {
    Flight,
  },
};
</script>

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
  height: 60px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px; /* Allow items to wrap to the next line if needed */
}

.no-underline {
  text-decoration: none;
}

.router-link-image {
  width: 250px;
  height: auto;
}

.menu-icon {
  font-size: 2rem;
  height: 2rem;
  width: 2rem;
  color: black;
  cursor: pointer;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 20px;
  font-size: 20px;
}

@media screen and (max-width: 240px) {
  .container {
    flex-direction: column; /* Stack items vertically for smaller screens */
    align-items: flex-start; /* Align items to the start for smaller screens */
  }

  .no-underline2 {
    margin-left: 0; /* Reset margin for smaller screens */
    margin-top: 10px; /* Add space between items for smaller screens */
  }

  .menu-button {
    margin-left: 0; /* Reset margin for smaller screens */
    margin-top: 10px; /* Add space between the button and other items */
  }
}
</style>
