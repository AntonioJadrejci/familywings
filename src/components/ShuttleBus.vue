<template>
  <div>
    <!-- Shuttle Bus Square -->
    <div v-if="showShuttleBusSquare" class="flight-square">
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

      <h2>Shuttle Bus Service</h2>

      <!-- Form Container -->
      <div class="form-container">
        <!-- Select Airport -->
        <div class="form-group">
          <label for="selectAirportC4" class="form-label"
            >Select Airport:</label
          >
          <select
            id="selectAirportC4"
            class="form-select"
            v-model="selectedAirportC4"
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

        <!-- Pickup Date -->
        <div class="form-group">
          <label for="pickupDate" class="form-label">Pickup Date:</label>
          <input
            id="pickupDate"
            type="date"
            class="form-control"
            v-model="pickupDate"
            :min="getDynamicMinDate()"
          />
        </div>

        <!-- Number of Tickets -->
        <div class="form-group">
          <label for="ticketCount" class="form-label">Number of Tickets:</label>
          <select
            id="ticketCount"
            class="form-select"
            v-model.number="ticketCount"
          >
            <option value="0">0 Tickets</option>
            <option value="1">1 Ticket</option>
            <option value="2">2 Tickets</option>
            <option value="3">3 Tickets</option>
          </select>
        </div>
      </div>

      <!-- Price Display -->
      <div class="special-purple-square">
        <span>Total Price: {{ shuttleBusPrice }}€</span>
      </div>

      <!-- Buttons -->
      <div class="button-container">
        <button class="back-button" @click="goBackToMain">Back</button>
        <button
          class="next-button"
          :disabled="!isFormValid"
          :class="{ disabled: !isFormValid }"
          @click="confirmShuttleBus"
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

          <!-- Display Price -->
          <div class="purple-squareB mt-4">
            <div class="half-text">Flight Price: {{ finalPrice }}€</div>
          </div>
          <!--  Car Price  -->
          <div
            class="special-purple-square"
            v-if="totalCarRentalPrice !== null"
          >
            <span>Car Price: {{ totalCarRentalPrice }}€</span>
          </div>
          <!-- Shuttle Bus Price -->
          <div class="special-purple-square">
            <span>Bus Price: {{ shuttleBusPrice }}€</span>
          </div>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="button-container mt-4">
        <button class="back-button" @click="goBackC">Back</button>
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
      showShuttleBusSquare: true,
      selectedAirportC4: null,
      pickupDate: "",
      ticketCount: 0,
      shuttleBusPrice: 0,
      ticketPrice: 5,
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
    isFormValid() {
      return this.selectedAirportC4 && this.pickupDate && this.ticketCount > 0;
    },
  },
  watch: {
    ticketCount(newCount) {
      this.shuttleBusPrice = newCount * this.ticketPrice;
    },
  },
  methods: {
    getDynamicMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      return today.toISOString().split("T")[0];
    },
    confirmShuttleBus() {
      alert("Shuttle Bus confirmed!");
    },
    goBackToMain() {
      this.$emit("goBack");
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

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
}

select,
input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

.button-container {
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-top: 20px;
}

.next-button,
.back-button {
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.next-button {
  background-color: #00d3e0;
  color: white;
}

.back-button {
  background-color: #9400d3;
  color: white;
}

.next-button.disabled {
  background-color: #cccccc; /* Siva boja za disabled dugme */
  cursor: not-allowed;
}
</style>
