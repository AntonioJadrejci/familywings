<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="no-underline">
        <img
          src="@/assets/Naslov4.png"
          alt="FamilyWings"
          class="router-link-image"
          @click="handleLinkClick"
        />
      </router-link>

      <button class="menu-button" @click="toggleMenu">
        <font-awesome-icon icon="bars" class="menu-icon" />
      </button>
      <div
        class="menu-overlay"
        :class="{ 'menu-open': isMenuOpen }"
        @click="closeMenu"
      ></div>

      <div class="menu" :class="{ 'menu-open': isMenuOpen }">
        <router-link to="/about" class="menu-link" @click="closeMenu">
          About us
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="menu-link"
          @click="closeMenu"
        >
          Login
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="menu-link"
          @click="closeMenu"
        >
          Registration
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/profilepage"
          class="menu-link"
          @click="closeMenu"
        >
          Profile
        </router-link>
        <a
          v-if="isLoggedIn"
          href="#"
          class="menu-link"
          @click.prevent="handleLogout"
        >
          Logout
        </a>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, storage } from "@/firebase"; // Ensure Firebase is configured
import { ref, getDownloadURL } from "firebase/storage";

import BackgroundContainer from "@/components/BackgroundContainer.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import ProfilePage from "@/components/ProfilePage.vue";

export default {
  components: {
    BackgroundContainer,
    Login,
    Register,
    ProfilePage,
  },
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false,
      profileImage: null,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? "hidden" : "auto";
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = "auto";
    },
    handleLogout() {
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false;
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    },

    handleLinkClick() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      } else {
        window.location.reload();
      }
    },
    fetchProfileImage() {
      const user = auth.currentUser;
      if (user) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        getDownloadURL(storageRef)
          .then((url) => {
            this.profileImage = url;
          })
          .catch(() => {
            this.profileImage = null; // Use default image
          });
      }
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
    });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
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
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black background */
  display: none;
  z-index: 99; /* Place it above other content */
  transition: opacity 0.3s ease;

  &.menu-open {
    display: block; /* Show the overlay when the menu is open */
    opacity: 1;
  }
}

.menu {
  position: fixed;
  top: 0px;
  right: -100%; /* Initially hide the menu off-screen */
  width: 20%;
  height: 120vh;
  background-color: #00d3e0;
  transition: right 0.3s ease;
  z-index: 100; /* Place it above the overlay */

  &.menu-open {
    right: 0; /* Slide the menu into view when it's open */
  }

  .menu-link {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    font-size: 30px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333; // Add a different background color on hover
    }
  }
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar {
  background-color: #9400d3;
  padding: 5px 0;
  height: 80px;
  overflow: hidden;
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
  color: #00d3e0;
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
    flex-direction: column;
    align-items: flex-start;
  }

  .no-underline2 {
    margin-left: 0;
    margin-top: 10px;
  }

  .menu-button {
    margin-left: 0;
    margin-top: 10px;
  }
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}
</style>
