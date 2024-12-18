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
          @click="confirmAndShowFlightD2"
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
        <h1>Your Ticket is Ready</h1>
        <!-- Smiley Image -->
        <img src="@/assets/Smiley.png" alt="Smiley" class="smiley-image" />
        <!-- Flight Ticket Download Button -->
        <div class="d-grid gap-3 mt-4">
          <button
            class="btn btn-success"
            v-if="totalCarRentalPrice > 0"
            @click="generateRentACarPDF"
          >
            Download Rent a Car Ticket
          </button>
        </div>
      </div>
      <div class="button-container mt-4">
        <button class="back-button" @click="closeRentACar">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { TempusDominus } from "@eonasdan/tempus-dominus";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { storage } from "@/firebase.js";

export default {
  data() {
    return {
      showRentACarSquare: true,
      showFlightSquareD: false,
      showFlightSquareD2: false,
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
      expirationDateInput: "", // Vrijednost unosa (raw)
      expirationDateError: "", // Poruka greške
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
  methods: {
    async savePdfToFirebase(category, fileName, pdfBlob) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const storageReference = storageRef(
        storage,
        `pdfs/${user.uid}/${category}/${fileName}`
      );

      try {
        // Upload PDF
        await uploadBytes(storageReference, pdfBlob);

        // Get the download URL
        const pdfUrl = await getDownloadURL(storageReference);

        // Update Firestore with the PDF URL
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        await updateDoc(userDocRef, {
          [category.toLowerCase()]: arrayUnion({ name: fileName, url: pdfUrl }),
        });

        console.log(
          `PDF successfully saved to Firebase under category: ${category}`
        );
      } catch (error) {
        console.error("Error saving PDF to Firebase:", error);
      }
    },

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
    confirmAndShowFlightD2() {
      this.showRentACarSquare = false;
      this.showFlightSquareD = false;
      this.showFlightSquareD2 = true;
    },
    goBackToRentACar() {
      this.showFlightSquareD = false;
      this.showRentACarSquare = true;
      this.showFlightSquareD2 = false;
    },
    goBackToMain() {
      this.$emit("goBack");
    },
    closeRentACar() {
      this.showFlightSquareD = false;
      this.showRentACarSquare = false;
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
    // Rent-a-Car PDF Generation
    generateRentACarPDF() {
      const doc = new jsPDF();
      const logoImage = new Image();
      logoImage.src = require("@/assets/Naslov4.png");

      // Koristi arrow funkciju za pristup `this` kontekstu
      logoImage.onload = () => {
        doc.addImage(logoImage, "PNG", 80, 10, 50, 20);

        doc.setFontSize(12);
        doc.text(`Rent-a-Car Ticket`, 20, 50);
        doc.text(`Airport: ${this.selectedAirportC3 || "N/A"}`, 20, 70);
        doc.text(`Pickup Date: ${this.pickupDateC3 || "N/A"}`, 20, 80);
        doc.text(`Return Date: ${this.returnDateC3 || "N/A"}`, 20, 90);
        doc.text(`Car Type: ${this.selectedCar?.name || "N/A"}`, 20, 100);
        doc.text(`Total Price: ${this.totalCarRentalPrice || "N/A"}€`, 20, 110);

        const barcodeImage = this.generateBarcode("RENTACAR-TICKET");
        doc.addImage(barcodeImage, "PNG", 20, 130, 160, 40);

        doc.text("Thank you for choosing FamilyWings Rent-a-Car!", 105, 280, {
          align: "center",
        });

        // Generiraj PDF Blob
        const pdfBlob = doc.output("blob");
        doc.save("rent_a_car_ticket.pdf");

        // Pozovi `savePdfToFirebase`
        this.savePdfToFirebase("Rents", "rent_a_car_ticket.pdf", pdfBlob);
      };
    },
    // Tracking Rent-a-Car and Shuttle Bus Confirmation
    confirmRentACar() {
      this.rentACarConfirmed = true;
      this.shuttleBusConfirmed = false;
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

.next-button.disabled {
  background-color: #cccccc;
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
