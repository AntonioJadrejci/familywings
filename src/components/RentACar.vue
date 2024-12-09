<template>
  <div>
    <!-- Rent-A-Car Square -->
    <div v-if="showRentACarSquare" class="flight-square">
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

      <h2>Rent a Car</h2>

      <!-- Select Airport -->
      <div class="mb-3">
        <label for="selectAirportC3" class="form-label">Select Airport</label>
        <select
          id="selectAirportC3"
          class="form-select"
          v-model="selectedAirportC3"
        >
          <option
            v-for="airport in airports"
            :key="airport.code"
            :value="airport.code"
          >
            {{ airport.name }} ({{ airport.code }})
          </option>
        </select>
      </div>

      <!-- Pickup and Return Dates -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="pickupDateC3" class="form-label">Pickup Date</label>
          <input
            id="pickupDateC3"
            type="date"
            class="form-control"
            v-model="pickupDateC3"
            :min="getDynamicMinDate()"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="returnDateC3" class="form-label">Return Date</label>
          <input
            id="returnDateC3"
            type="date"
            class="form-control"
            v-model="returnDateC3"
            :min="pickupDateC3 || getDynamicMinDate()"
          />
        </div>
      </div>

      <!-- Cars Selection -->
      <h3 class="mt-4">Choose a Car</h3>
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-6" v-for="car in cars" :key="car.name">
          <div class="card text-center">
            <img :src="car.image" class="card-img-top" :alt="car.name" />
            <div class="card-body">
              <h5 class="card-title">{{ car.name }}</h5>
              <p class="card-text">
                Seats: {{ car.seats }} <br />
                Gear: {{ car.gear }} <br />
                Price: {{ car.price }}€ / day
              </p>
              <button
                class="btn"
                :class="selectedCar === car ? 'btn-success' : 'btn-primary'"
                @click="selectCar(car)"
              >
                {{ selectedCar === car ? "Selected" : "Select" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Price Display -->
      <div class="special-purple-square" v-if="totalCarRentalPrice !== null">
        <span>Total Price: {{ totalCarRentalPrice }}€</span>
      </div>

      <!-- Buttons -->
      <div class="button-container mt-4">
        <button class="back-button" @click="goBackToMain">Close</button>
        <button
          class="next-button"
          :class="{ disabled: !canConfirm }"
          :disabled="!canConfirm"
          @click="confirmRentACar"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRentACarSquare: true,
      selectedAirportC3: null,
      pickupDateC3: "",
      returnDateC3: "",
      selectedCar: null,
      totalCarRentalPrice: null,
      cars: [
        {
          name: "Opel Zafira",
          seats: 7,
          gear: "Automatic",
          price: 50,
          image: require("@/assets/Zafira.jpg"),
        },
        {
          name: "VW Polo",
          seats: 5,
          gear: "Manual",
          price: 35,
          image: require("@/assets/Polo.jpg"),
        },
        {
          name: "Seat Arona",
          seats: 5,
          gear: "Automatic",
          price: 40,
          image: require("@/assets/Arona.jpg"),
        },
      ],
      airports: [
        { name: "Zagreb", code: "ZAG" },
        { name: "Paris", code: "CDG" },
        { name: "London", code: "LHR" },
        { name: "Manchester", code: "MAN" },
        { name: "Madrid", code: "MAD" },
        { name: "Barcelona", code: "BCN" },
        { name: "Frankfurt", code: "FRA" },
        { name: "Munich", code: "MUC" },
        { name: "Istanbul", code: "IST" },
        { name: "Reykjavik", code: "KEF" },
        { name: "Copenhagen", code: "CPH" },
        { name: "Stockholm", code: "ARN" },
        { name: "Oslo", code: "OSL" },
        { name: "Zurich", code: "ZRH" },
        { name: "Amsterdam", code: "AMS" },
      ],
    };
  },
  computed: {
    canConfirm() {
      return (
        this.selectedAirportC3 &&
        this.pickupDateC3 &&
        this.returnDateC3 &&
        this.selectedCar
      );
    },
  },
  methods: {
    getDynamicMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      return today.toISOString().split("T")[0];
    },
    selectCar(car) {
      this.selectedCar = car;
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      if (this.pickupDateC3 && this.returnDateC3 && this.selectedCar) {
        const pickup = new Date(this.pickupDateC3);
        const returnD = new Date(this.returnDateC3);
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24)) + 1;
        this.totalCarRentalPrice = days * this.selectedCar.price;
      } else {
        this.totalCarRentalPrice = null;
      }
    },
    confirmRentACar() {
      alert("Rent-a-Car confirmed!");
      // Add navigation logic or further actions here
    },
    goBackToMain() {
      this.$emit("goBack");
    },
  },
};
</script>

<style scoped>
/* Copy all CSS relevant to the Rent-A-Car section */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
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
  width: 800px;
}
.special-purple-square {
  background-color: #8a2be2;
  padding: 10px;
  color: white;
  font-size: 18px;
  text-align: center;
  border-radius: 10px;
  margin-top: 20px;
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

.next-button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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

.card {
  max-width: 600px; /* Smanjena širina kartice */
  margin: 10px; /* Razmak između kartica */
  border: 1px solid #ddd; /* Dodani rub za izgled */
  border-radius: 10px; /* Zaobljeni rubovi */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Lagana sjena za bolji efekt */
}

.card-img-top {
  max-height: 120px; /* Smanjena visina slike */
  object-fit: contain; /* Slika se prilagođava zadanom prostoru */
}

.card-title {
  font-size: 1rem; /* Smanjen font naslova */
  margin-bottom: 10px;
}

.card-text {
  font-size: 0.85rem; /* Smanjen font opisa */
  line-height: 1.4; /* Prostor između redova */
}

.card-body {
  padding: 10px; /* Manji padding unutar kartice */
}
</style>
