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
          <label for="shuttlePickupDate" class="form-label">Pickup Date:</label>
          <input
            id="shuttlePickupDate"
            type="date"
            class="form-control"
            v-model="shuttlePickupDate"
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
                  v-model="expirationDateInput"
                  @input="onExpirationDateInput"
                  placeholder="MM/YY"
                  maxlength="5"
                  autocomplete="off"
                />
                <p v-if="expirationDateError" class="text-danger">
                  {{ expirationDateError }}
                </p>
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

          <!-- Shuttle Bus Price -->
          <div class="special-purple-square">
            <span>Bus Price: {{ shuttleBusPrice }}€</span>
          </div>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="button-container mt-4">
        <button class="back-button" @click="goBackToShuttleBus">Back</button>
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
    <!-- FlightD2 Square --><!-- FlightD2 Square -->
    <div class="flight-square" v-if="showFlightSquareD2">
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
        <h1>Your Tickets Are Ready</h1>
        <!-- Smiley Image -->
        <img src="@/assets/Smiley.png" alt="Smiley" class="smiley-image" />
        <!-- Flight Ticket Download Button -->
        <div class="d-grid gap-3 mt-4">
          <button
            class="btn btn-success"
            v-if="shuttleBusPrice > 0"
            @click="generateShuttleBusPDF"
          >
            Download Shuttle Bus Ticket
          </button>
        </div>
      </div>
      <div class="button-container mt-4">
        <button class="back-button" @click="closeShuttleBus">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
import { nextTick } from "vue";
import { TempusDominus } from "@eonasdan/tempus-dominus";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
export default {
  data() {
    return {
      showShuttleBusSquare: true,
      showFlightSquareD: false,
      showFlightSquareD2: false,
      selectedAirportC4: null,
      pickupDate: "",
      ticketCount: 0,
      shuttleBusPrice: 0,
      shuttlePickupDate: "",
      ticketPrice: 5,
      firstName: "", // Added
      lastName: "", // Added
      dateOfBirth: "", // Added
      email: "", // Added
      phoneNumber: "", // Added
      formattedCardNumber: "", // Added
      formattedExpirationDate: "", // Added
      expirationDateInput: "", // Vrijednost unosa (raw)
      expirationDateError: "", // Poruka greške
      cvv: "", // Added
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
      return (
        this.selectedAirportC4 && this.shuttlePickupDate && this.ticketCount > 0
      );
    },
    canSubmit() {
      const isValidCardNumber =
        this.formattedCardNumber.replace(/\s/g, "").length === 16;
      const isValidExpirationDate =
        this.expirationDateInput.length === 5 && !this.expirationDateError;
      const isValidCVV = this.cvv.length === 3;

      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.phoneNumber &&
        isValidCardNumber &&
        isValidExpirationDate &&
        isValidCVV
      );
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
    goBackToShuttleBus() {
      this.showFlightSquareD = false;
      this.showShuttleBusSquare = true;
      this.showFlightSquareD2 = false;
    },
    confirmAndShowFlightD() {
      this.showRentACarSquare = false;
      this.showFlightSquareD = true;
    },
    showFlightD2Component() {
      this.showRentACarSquare = false;
      this.showFlightSquareD = false;
      this.showFlightSquareD2 = true;
    },
    closeShuttleBus() {
      this.$emit("goBack");
      this.showRentACarSquare = false;
      this.showFlightSquareD = false;
      this.showFlightSquareD2 = false;
    },
    formatCardNumber(event) {
      const input = event.target.value.replace(/\D/g, "");
      this.formattedCardNumber = input.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    },
    validateAndFormatExpirationDate(event) {
      let input = event.target.value.replace(/[^0-9]/g, ""); // Dozvoljava samo brojeve

      // Maksimalna dužina unosa
      if (input.length > 4) {
        input = input.slice(0, 4);
      }

      let formatted = "";

      // Validacija mjeseca
      if (input.length >= 2) {
        const month = input.slice(0, 2);
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
          return; // Ne dozvoljava neispravne mjesece
        }
        formatted = month + "/";
      }

      // Validacija godine
      if (input.length >= 3) {
        const year = input.slice(2, 4);
        const validYears = ["24", "25", "26", "27", "28"];
        if (!validYears.includes(year)) {
          return; // Ne dozvoljava neispravne godine
        }
        formatted += year;
      }

      this.formattedExpirationDate = formatted; // Ažuriraj vrijednost
    },
    onExpirationDateInput(event) {
      const input = event.target.value.replace(/[^0-9/]/g, ""); // Dozvoljava samo brojeve i "/"
      this.expirationDateError = ""; // Reset greške

      // Ako nema "/", unesite ga nakon mjeseca
      if (input.length === 2 && !input.includes("/")) {
        this.expirationDateInput = input + "/";
        return;
      }

      // Ako ima više od 5 znakova, ograničite na prvih 5
      if (input.length > 5) {
        this.expirationDateInput = input.slice(0, 5);
        return;
      }

      // Provjerite validnost mjeseca i godine
      if (input.length >= 2 && !input.includes("/")) {
        const month = input.slice(0, 2);
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
          this.expirationDateError =
            "Invalid month. Enter a value between 01 and 12.";
          return;
        }
      }

      if (input.length === 5) {
        const year = input.slice(3);
        const validYears = ["24", "25", "26", "27", "28"];
        if (!validYears.includes(year)) {
          this.expirationDateError =
            "Invalid year. Enter a value between 24 and 28.";
          return;
        }
      }

      // Postavite validirani unos
      this.expirationDateInput = input;
    },
    // Shuttle Bus PDF Generation
    generateShuttleBusPDF() {
      const doc = new jsPDF();
      const logoImage = new Image();
      logoImage.src = require("@/assets/Naslov4.png");

      // Pričekaj da se logo učita
      logoImage.onload = () => {
        for (let i = 0; i < this.ticketCount; i++) {
          if (i > 0) doc.addPage();

          doc.addImage(logoImage, "PNG", 80, 10, 50, 20);
          doc.setFontSize(12);
          doc.text(`Shuttle Bus Ticket`, 20, 50);
          doc.text(`Airport: ${this.selectedAirportC4 || "N/A"}`, 20, 70);
          doc.text(`Pickup Date: ${this.shuttlePickupDate || "N/A"}`, 20, 80);
          doc.text(`Ticket Number: ${i + 1}`, 20, 90);
          doc.text(`Price: ${this.ticketPrice}€`, 20, 100);

          const barcodeImage = this.generateBarcode(`SHUTTLE-TICKET-${i + 1}`);
          doc.addImage(barcodeImage, "PNG", 20, 130, 160, 40);

          doc.text(
            "Thank you for choosing FamilyWings Shuttle Bus Service!",
            105,
            280,
            {
              align: "center",
            }
          );
        }

        doc.save("shuttle_bus_ticket.pdf");
      };
    },
    confirmShuttleBus() {
      this.shuttleBusConfirmed = true;
      this.rentACarConfirmed = false;
      this.showFlightD2Component(); // Idi na FlightD2 Square
    },
    generateBarcode(text) {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, text, { format: "CODE128", displayValue: false });
      return canvas.toDataURL("image/png");
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
.centered-date-input {
  margin: 0 auto; /* Centriranje unosa */
  text-align: center; /* Centriraj tekst unutar unosa */
  width: 100%; /* Popuni prostor */
  max-width: 300px; /* Maksimalna širina */
}
.generate-button {
  background-color: #9400d3;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.generate-button:hover {
  background-color: #8000b3;
}

.smiley-image {
  width: 300px;
  height: auto;
  margin-bottom: 20px;
}
</style>
