<template>
  <div class="flight-squareC" v-if="showFlightCComponent">
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
      <div class="purple-squares-container">
        <div class="date-button">
          <div class="half-text">3.3.2024.</div>
        </div>

        <div class="date-button">
          <div class="half-text">10.3.2024.</div>
        </div>
        <div class="purple-square">
          <div class="half-text">Pula (PUY) - London Gatwick (LGW)</div>
          <div class="half-text">Flight Price: 105$</div>
        </div>
      </div>
      <div class="button-container">
        <button class="back-button" @click="goBack">Back</button>
        <button class="next-button">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFlightCComponent: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.flight-squareC {
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

.purple-squares-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.purple-square {
  position: relative;
  width: 1200px;
  height: 70px;
  background-color: #9400d3;
  margin-bottom: 40px; /* Adjust spacing between squares */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.half-text {
  width: calc(50% - 10px); /* Adjust text width */
  text-align: center;
  color: white; /* Change font color to white */
  font-size: 18px; /* Set font size */
  height: 100;
}

.date-button {
  background-color: #00d3e0;
  color: white;
  border: none;
  height: 50px;
  padding: 20px 50px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.next-button {
  background-color: #00d3e0;
  color: white;
  border: none;
  padding: 20px 50px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button {
  background-color: #9400d3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
