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
          @click="confirmAndShowFlightD"
        >
          Confirm
        </button>
      </div>
    </div>
    <!-- FlightD Square -->
    <div class="flight-square" v-if="showFlightSquareD">
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
        <div class="text-content">
          <h1>Personal and Payment Information</h1>

          <!-- Personal Information Section -->
          <div class="mt-4">
            <h3 class="mb-3">Personal Information</h3>
            <div class="row g-3">
              <!-- First Name -->
              <div class="col-md-6">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  v-model="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <!-- Date of Birth -->
              <div class="col-md-6">
                <label for="dob" class="form-label">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  class="form-control"
                  v-model="dateOfBirth"
                  :max="getDynamicMinDate()"
                  required
                />
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <!-- Phone Number -->
              <div class="col-md-12">
                <label for="phone" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  class="form-control"
                  v-model="phoneNumber"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Payment Information Section -->
          <div class="mt-5">
            <h3 class="mb-3">Payment Information</h3>

            <!-- Credit Card Number -->
            <div class="form-group mb-3">
              <label for="credit-card" class="form-label"
                >Credit Card Number</label
              >
              <input
                type="text"
                id="credit-card"
                class="form-control"
                v-model="formattedCardNumber"
                @input="formatCardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                maxlength="19"
              />
            </div>

            <!-- Expiration Date -->
            <div class="row g-3">
              <div class="col-md-6">
                <label for="expiration-date" class="form-label"
                  >Expiration Date</label
                >
                <input
                  type="text"
                  id="expiration-date"
                  class="form-control"
                  v-model="formattedExpirationDate"
                  @input="validateAndFormatExpirationDate"
                  placeholder="MM/YY"
                  maxlength="5"
                />
              </div>

              <!-- CVV -->
              <div class="col-md-6">
                <label for="cvv" class="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  class="form-control"
                  v-model="cvv"
                  @input="validateCVV"
                  placeholder="XXX"
                  maxlength="3"
                />
              </div>
            </div>
          </div>

          <!--  Car Price  -->
          <div
            class="special-purple-square"
            v-if="totalCarRentalPrice !== null"
          >
            <span>Car Price: {{ totalCarRentalPrice }}€</span>
          </div>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="button-container mt-4">
        <button class="back-button" @click="goBackToRentACar">Back</button>
        <button
          class="next-button"
          :class="{ disabled: !canSubmit }"
          :disabled="!canSubmit"
          @click="showFlightD2Component"
        >
          Submit
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
      showFlightSquareD: false,
      selectedAirportC3: null,
      pickupDateC3: "",
      returnDateC3: "",
      selectedCar: null,
      totalCarRentalPrice: null,
      firstName: "", // Added
      lastName: "", // Added
      dateOfBirth: "", // Added
      email: "", // Added
      phoneNumber: "", // Added
      formattedCardNumber: "", // Added
      formattedExpirationDate: "", // Added
      cvv: "", // Added
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
    canSubmit() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.formattedCardNumber.replace(/\s/g, "").length === 16 &&
        this.formattedExpirationDate.length === 5 &&
        this.cvv.length === 3
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
    confirmAndShowFlightD() {
      this.showRentACarSquare = false;
      this.showFlightSquareD = true;
    },
    goBackToRentACar() {
      this.showFlightSquareD = false;
      this.showRentACarSquare = true;
    },
    goBackToMain() {
      this.$emit("goBack");
    },
  },
  formatCardNumber(event) {
    const input = event.target.value.replace(/\D/g, "").slice(0, 16);
    this.formattedCardNumber = input.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  },
  validateAndFormatExpirationDate(event) {
    let input = event.target.value.replace(/[^0-9]/g, ""); // Ukloni sve osim brojeva

    if (input.length > 4) {
      input = input.slice(0, 4); // Ograniči na maksimalno 4 cifre (MMYY)
    }

    // Odvojite mesec i godinu
    const month = input.slice(0, 2);
    const year = input.slice(2, 4);

    // Proverite validnost meseca (01-12)
    if (month && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
      return; // Ignoriši nevalidan unos
    }

    // Formatirajte rezultat u obliku MM/YY
    const formatted = month.length === 2 ? `${month}/${year}` : month;

    // Ažurirajte vrednost u `v-model`
    this.formattedExpirationDate = formatted;
  },

  validateCVV(event) {
    this.cvv = event.target.value.replace(/\D/g, "").slice(0, 3);
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
