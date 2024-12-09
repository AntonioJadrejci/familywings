<template>
  <div class="home-background">
    <div class="squares-container">
      <!-- Flight Section -->
      <div
        class="square"
        @mouseover="scaleUp"
        @mouseout="scaleDown"
        @click="toggleFlightSquare"
      >
        <img src="@/assets/plane.webp" alt="Image 1" class="square-image" />
        <button class="square-button">Flight</button>
      </div>
      <Flight
        :showFlightSquare="showFlightSquareFlag"
        ref="flightComponent"
        @close="toggleFlightSquare"
      ></Flight>

      <!-- Rent a Car Section -->
      <div
        class="square"
        @mouseover="scaleUp"
        @mouseout="scaleDown"
        @click="toggleRentACarSquare"
      >
        <img src="@/assets/RentaCar.jpg" alt="Image 1" class="square-image" />
        <button class="square-button">Rent a Car</button>
      </div>
      <RentACar
        v-if="showRentACarSquareFlag"
        ref="rentACarComponent"
        @goBack="toggleRentACarSquare"
      ></RentACar>

      <!-- Shuttle Bus Section -->
      <div
        class="square"
        @mouseover="scaleUp"
        @mouseout="scaleDown"
        @click="toggleShuttleBusSquare"
      >
        <img src="@/assets/ShuttleBus.jpg" alt="Image 1" class="square-image" />
        <button class="square-button">Shuttle Bus</button>
      </div>
      <ShuttleBus
        v-if="showShuttleBusSquareFlag"
        ref="shuttleBusComponent"
        @goBack="toggleShuttleBusSquare"
      ></ShuttleBus>
    </div>
  </div>
</template>

<script>
import Flight from "@/components/Flight.vue";
import RentACar from "@/components/RentACar.vue";
import ShuttleBus from "@/components/ShuttleBus.vue";

export default {
  name: "HomeView",
  components: { Flight, RentACar, ShuttleBus },
  data() {
    return {
      showFlightSquareFlag: false,
      showRentACarSquareFlag: false,
      showShuttleBusSquareFlag: false,
    };
  },
  methods: {
    scaleUp(event) {
      event.currentTarget.classList.add("hovered");
    },
    scaleDown(event) {
      event.currentTarget.classList.remove("hovered");
    },
    toggleFlightSquare() {
      this.showFlightSquareFlag = !this.showFlightSquareFlag;
    },
    toggleRentACarSquare() {
      this.showRentACarSquareFlag = !this.showRentACarSquareFlag;
    },
    toggleShuttleBusSquare() {
      this.showShuttleBusSquareFlag = !this.showShuttleBusSquareFlag;
    },
  },
};
</script>

<style scoped>
.home-background {
  background-image: url("~@/assets/A321.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  border-radius: 0 !important;
}
.squares-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.square {
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  margin: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.square-image {
  width: 400px;
  height: 300px;
  margin-bottom: 100px;
  border-radius: 10px;
}

.square-button {
  width: 350px;
  height: 50px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #9400d3;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
}
.hovered {
  transform: scale(1.1);
}
</style>
