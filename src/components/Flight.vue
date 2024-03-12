“<!-- Flight.vue -->

<template>
  <div>
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
          We provide excellent flight services to various destinations
          worldwide.
        </p>
        <div class="purple-squares-container">
          <div class="purple-square">
            <div class="half-text">Origin</div>
            <div class="half-text">Destination</div>
          </div>
          <div class="purple-square">
            <div class="half-text">Departure</div>
            <div class="half-text">Return</div>
          </div>
          <div class="purple-square">
            <div class="half-text">Passengers</div>
          </div>
        </div>
        <div class="button-container">
          <button class="back-button" @click="hideFlightSquare">Close</button>
          <button class="next-button" @click="showFlightSquareComponent">
            Next
          </button>
        </div>
      </div>
    </div>

    <FlightB ref="flightBComponent" @back="handleFlightBBack"></FlightB>
  </div>
</template>

<script>
import FlightB from "@/components/FlightB.vue";
export default {
  components: { FlightB },
  data() {
    return {
      showFlightSquare: false,
    };
  },
  methods: {
    hideFlightSquare() {
      this.showFlightSquare = false;
    },
    showFlightSquareComponent() {
      // Hide current Flight component
      this.showFlightSquare = false;

      // Show FlightB component
      if (this.$refs.flightBComponent) {
        this.$refs.flightBComponent.showFlightSquareB = true;
      }
    },
    handleFlightBBack() {
      // Hide FlightB component and show Flight component
      this.showFlightSquare = true;
      this.$refs.flightBComponent.showFlightSquareB = false;
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

.purple-squares-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.purple-square {
  position: relative;
  width: 900px;
  height: 70px;
  background-color: #9400d3;
  margin-bottom: 40px; /* Adjust spacing between squares */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.purple-square:first-child {
  width: 900px; /* Width of the first two squares */
}

.purple-square:last-child {
  width: 400px; /* Width of the third square */
}

.purple-square:not(:last-child)::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.half-text {
  width: calc(50% - 10px); /* Adjust text width */
  text-align: center;
  color: white; /* Change font color to white */
  font-size: 18px; /* Set font size */
  height: 100;
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
