<!-- Flight.vue -->

<template>
  <div class="flight-square" v-if="showFlightSquare">
    <div class="image-container">
      <img
        src="@/assets/AboutPlane.png"
        alt="Flight Image"
        class="flight-image"
      />
    </div>
    <div class="text-container">
      <h1>Welcome to Flight Services</h1>
      <p>
        We provide excellent flight services to various destinations worldwide.
      </p>
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
  background-color: #00d3e0;
  padding: 30px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.flight-image {
  width: 200px;
  height: auto;
}

.text-container {
  text-align: center;
}

.back-button {
  background-color: #9400d3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>