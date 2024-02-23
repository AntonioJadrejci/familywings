<template>
  <div class="home-background">
    <div class="squares-container">
      <div
        class="square"
        @mouseover="scaleUp"
        @mouseout="scaleDown"
        @click="showFlightSquare"
      >
        <img src="@/assets/plane.webp" alt="Image 1" class="square-image" />
        <button class="square-button">Flight</button>
      </div>
      <div class="square" @mouseover="scaleUp" @mouseout="scaleDown">
        <img src="@/assets/RentaCar.jpg" alt="Image 1" class="square-image" />
        <button class="square-button">Rent a Car</button>
      </div>
      <div class="square" @mouseover="scaleUp" @mouseout="scaleDown">
        <img src="@/assets/ShuttleBus.jpg" alt="Image 1" class="square-image" />
        <button class="square-button">Shuttle Bus</button>
      </div>
    </div>
    <Flight ref="flightComponent" />
  </div>
</template>

<script>
import Flight from "@/components/Flight.vue";
export default {
  name: "HomeView",
  components: { Flight },
  methods: {
    scaleUp(event) {
      event.currentTarget.classList.add("hovered");
    },
    scaleDown(event) {
      event.currentTarget.classList.remove("hovered");
    },
    showFlightSquare() {
      // Set showFlightSquare to true to display the Flight component
      if (this.$refs.flightComponent) {
        this.$refs.flightComponent.showFlightSquare = true;
      }
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
