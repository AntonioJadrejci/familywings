<template>
  <div class="about">
    <div class="square">
      <div class="image-container">
        <img
          src="@/assets/AboutPlane0.png"
          alt="Left Image"
          class="left-image"
        />
        <div class="space"></div>
        <img
          src="@/assets/AboutPlane.png"
          alt="Right Image"
          class="right-image"
        />
      </div>
      <div class="text-container">
        <h1>
          Welcome to FamilyWings, where every place in Europe is not to far. We
          are a commercial flight company from Croatia. Our fleet consists
          mostly of Airbus A321 Neo and Airbus A350 types of planes. Our
          destinations branch south to Spain all the way to Iceland on the
          north. Thank you for flying with us :)
        </h1>
        <button class="back-button" @click="goToHomePage">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
  border-radius: 0 !important;
  color: #fff;
  padding: 50px;
  min-width: 1000px;
  min-height: 400px;
}

.square {
  background-color: #00d3e0;
  padding: 160px;
  border-radius: 10px;
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
  margin-top: 120px;
}

.square h1 {
  color: white;
}
.back-button {
  background-color: #9400d3; /* Purple color */
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  margin-top: 50px; /* Adjust margin-top as needed */
}
</style>