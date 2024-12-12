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
        <h1 class="register-title">Register</h1>
        <form class="register-form">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="firstName"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
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
          <div class="mb-3">
            <label for="confirmPassword" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100"
            @click.prevent="handleRegister"
          >
            Register
          </button>
        </form>
        <button class="back-button" @click="goToHomePage">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleRegister() {
      if (
        this.firstName &&
        this.email &&
        this.password &&
        this.confirmPassword
      ) {
        if (this.password === this.confirmPassword) {
          alert(`Registration successful for ${this.firstName}!`);
          // Implement registration logic here
        } else {
          alert("Passwords do not match.");
        }
      } else {
        alert("Please fill in all fields.");
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

.register-title {
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.register-form {
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
