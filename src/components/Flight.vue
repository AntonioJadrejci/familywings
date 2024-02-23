<!-- Flight.vue -->

<template>
  <div class="flight-square" v-if="showFlightSquare">
    <div class="image-container">
      <img
        src="@/assets/AboutPlane.png"
        alt="Flight Image Left"
        class="left-image"
      />
      <div class="space"></div>
      <img
        src="@/assets/AboutPlane0.png"
        alt="Flight Image Right"
        class="right-image"
      />
    </div>
    <div class="text-container">
      <h1>Welcome to Flight Services</h1>
      <p>
        We provide excellent flight services to various destinations worldwide.
      </p>
      <div class="purple-squares-container">
        <div class="purple-square"></div>
        <div class="purple-square"></div>
        <div class="purple-square"></div>
      </div>
      <button class="back-button" @click="hideFlightSquare">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlightSquare: false,
    };
  },
  methods: {
    hideFlightSquare() {
      this.showFlightSquare = false;
    },
  },
};
</script>

<style scoped>
.flight-square {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  min-width: 1600px;
  min-height: 700px;
  height: 700px; /* Set a fixed height */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.left-image,
.right-image {
  width: 200px;
  height: auto;
}

.space {
  width: 800px; /* Adjust space between images */
}

.text-container {
  text-align: center;
  position: relative;
}

.back-button {
  background-color: #9400d3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: absolute; /* Position the button absolutely */
  bottom: -450px; /* Adjust bottom spacing as needed */
  left: 50%; /* Center the button horizontally */
  transform: translateX(-50%); /* Center the button horizontally */
}
.purple-squares-container {
  position: absolute;
  top: calc(50% + 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.purple-square {
  width: 500px;
  height: 50px;
  background-color: #9400d3;
  margin-bottom: 50px; /* Adjust spacing between squares */
}
</style>