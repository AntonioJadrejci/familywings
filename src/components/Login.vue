<template>
  <div class="about">
    <div class="square">
      <div class="image-container">
        <img
          src="@/assets/AboutPlane.png"
          alt="Left Image"
          class="left-image"
        />
        <div class="space"></div>
        <img
          src="@/assets/AboutPlane0.png"
          alt="Right Image"
          class="right-image"
        />
      </div>
      <div class="text-container">
        <h1 class="login-title">Login</h1>
        <form class="login-form">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100"
            @click.prevent="handleLogin"
          >
            Login
          </button>
        </form>
        <button class="back-button" @click="goToHomePage">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Dodan import

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      const auth = getAuth();
      const db = getFirestore();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Store user data locally
          localStorage.setItem("profileImage", userData.profileImage || "");
          localStorage.setItem(
            "username",
            userData.firstName || "Anonymous User"
          );
        }

        alert("Login successful!");
        this.$router.push("/profilepage");
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }
    },

    goToHomePage() {
      // Redirect to home page
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.about {
  background-image: url("@/assets/A321.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  color: #fff;
  padding: 50px;
  min-width: 1000px;
  min-height: 400px;
}

.square {
  background-color: rgba(0, 211, 224, 0.9); /* Transparent turquoise */
  padding: 100px;
  border-radius: 10px;
  text-align: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-image,
.right-image {
  width: 200px;
  height: auto;
}

.space {
  width: 10px;
}

.text-container {
  margin-top: 50px;
}

.login-title {
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.form-label {
  color: #fff; /* White text for labels */
}

.form-control {
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* Semi-transparent input fields */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  color: #000; /* Black text */
}

.btn-primary {
  background-color: #0088cc;
  border: none;
}

.btn-primary:hover {
  background-color: #005f99;
}

.back-button {
  background-color: #9400d3; /* Purple color */
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

.back-button:hover {
  background-color: #6d00a7;
}
</style>
