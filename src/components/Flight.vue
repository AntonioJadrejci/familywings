<template>
  <div>
    <!-- Flight Square -->
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
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <!-- Prvi Button-->
          <div class="row">
            <div class="col">
              <div class="col-md-6 mb-3">
                <div class="dropdown">
                  <button
                    class="btn btn-info btn-lg dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Origin
                  </button>
                  <ul class="dropdown-menu">
                    <li v-for="(airport, index) in airports" :key="index">
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="selectOrigin(airport)"
                        >{{ airport.name }} ({{ airport.code }})</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <!-- Drugi Button -->
              <div class="dropdown">
                <a
                  class="btn btn-info btn-lg dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Destination
                </a>

                <ul class="dropdown-menu">
                  <li v-for="(airport, index) in filteredAirports" :key="index">
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="selectDestination(airport)"
                      >{{ airport.name }} ({{ airport.code }})</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <p>
                  Selected Origin:
                  {{ selectedOrigin ? selectedOrigin.name : "None" }}
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  Selected Destination:
                  {{ selectedDestination ? selectedDestination.name : "None" }}
                </p>
              </div>
            </div>

            <!-- Treci Button (Select Departure Date) -->
            <div v-show="ticketTypeSelected" class="col-md-6 mb-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="departureDate"
                  placeholder="Select Departure Date"
                  :id="departureInputId"
                  ref="departureInput"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  ref="departureButton"
                >
                  <i class="fa fa-calendar"></i>
                </button>
              </div>
            </div>
            <!-- Cetvrti Button-->
            <div class="col-md-6 mb-3">
              <div class="dropdown">
                <a
                  class="btn btn-info btn-lg dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ticket
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="selectTicket('one-way')"
                      >One Way</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="selectTicket('return')"
                      >Return</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <!-- Peti Button (Select Return Date) -->
            <div v-show="showReturnDate" class="col-md-6 mb-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="returnDate"
                  placeholder="Select Return Date"
                  :id="returnInputId"
                  ref="returnInput"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  ref="returnButton"
                >
                  <i class="fa fa-calendar"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Sesti Button-->
          <div class="col-md-6 mb-3">
            <div class="dropdown">
              <button
                class="btn btn-info btn-lg dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Passengers
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="selectNumberOfPassengers(1)"
                    >1</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="selectNumberOfPassengers(2)"
                    >2</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="selectNumberOfPassengers(3)"
                    >3</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Display the final calculated price and passenger count -->
        <div class="purple-squareB">
          <div class="half-text">Flight Price: {{ finalPrice }}€</div>
        </div>
        <div class="purple-squareB">
          <div class="half-text">
            Number of Passengers: {{ numberOfPassengers }}
          </div>
        </div>

        <div class="button-container">
          <button class="back-button" @click="hideFlightSquare">Close</button>
          <button class="next-button" @click="showFlightBComponent">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- FlightB Square -->
    <div class="flight-square" v-if="showFlightSquareB">
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
          <!-- Display Departure Date and Flight Details -->
          <div class="date-button" v-if="departureDate">
            <div class="half-text">{{ departureDate }}</div>
          </div>

          <div class="purple-squareB">
            <div class="half-text">
              {{ selectedOrigin ? selectedOrigin.name : "No Origin Selected" }}
              ({{ selectedOrigin ? selectedOrigin.code : "" }}) -
              {{
                selectedDestination
                  ? selectedDestination.name
                  : "No Destination Selected"
              }}
              ({{ selectedDestination ? selectedDestination.code : "" }})
            </div>
          </div>

          <!-- Additional Return Details for Return Tickets -->
          <template v-if="selectedTicketType === 'return'">
            <div class="date-button" v-if="returnDate">
              <div class="half-text">{{ returnDate }}</div>
            </div>
            <div class="purple-squareB">
              <div class="half-text">
                {{
                  selectedDestination
                    ? selectedDestination.name
                    : "No Destination Selected"
                }}
                ({{ selectedDestination ? selectedDestination.code : "" }}) -
                {{
                  selectedOrigin ? selectedOrigin.name : "No Origin Selected"
                }}
                ({{ selectedOrigin ? selectedOrigin.code : "" }})
              </div>
            </div>
          </template>

          <!-- Single Flight Price Purple Square -->
          <div class="purple-squareB">
            <div class="half-text">Flight Price: {{ finalPrice }}€</div>
          </div>
        </div>

        <div class="button-container">
          <button class="back-button" @click="goBack">Back</button>
          <button class="next-button" @click="showFlightCComponent">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- FlightC Square -->
    <div class="flight-square" v-if="showFlightSquareC">
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

      <!-- Prikaz trenutne cijene leta i reset dugme -->
      <div class="special-purple-square">
        <span>Flight Price: {{ totalPrice }}€</span>
        <button class="button secondary" @click="resetLuggage">
          Reset Luggage
        </button>
      </div>

      <!-- Prikaz opcija prtljage -->
      <div class="luggage-container">
        <div
          class="luggage-type"
          :class="{ hovered: hoveredLuggageType === 'carry-on' }"
          @mouseover="hoveredLuggageType = 'carry-on'"
          @mouseout="hoveredLuggageType = ''"
          @click="selectLuggage(luggageTypes[0])"
        >
          <img src="@/assets/Baggage.png" alt="Carry-On Bag" />
          <div class="luggage-details">
            <h3>Carry-On Bag x 1</h3>
            <p>MAX 10 KG</p>
            <p>40 x 30 x 20 cm</p>
            <p>FREE</p>
          </div>
        </div>

        <div
          class="luggage-type"
          :class="{ hovered: hoveredLuggageType === 'trolley' }"
          @mouseover="hoveredLuggageType = 'trolley'"
          @mouseout="hoveredLuggageType = ''"
          @click="selectLuggage(luggageTypes[1])"
        >
          <img src="@/assets/Baggage.png" alt="Trolley Bag" />
          <div class="luggage-details">
            <h3>Trolley Bag x 1</h3>
            <p>MAX 10 KG</p>
            <p>55 x 40 x 20 cm</p>
            <p>FREE</p>
          </div>
        </div>

        <div
          class="luggage-type"
          :class="{ hovered: hoveredLuggageType === 'checked1' }"
          @mouseover="hoveredLuggageType = 'checked1'"
          @mouseout="hoveredLuggageType = ''"
          @click="selectLuggage(luggageTypes[2])"
        >
          <img src="@/assets/Baggage.png" alt="Checked Bag" />
          <div class="luggage-details">
            <h3>Checked Bag x 2</h3>
            <p>MAX 20 KG</p>
            <p>99 x 119 x 171 cm</p>
            <p>25 €</p>
          </div>
        </div>

        <div
          class="luggage-type"
          :class="{ hovered: hoveredLuggageType === 'checked2' }"
          @mouseover="hoveredLuggageType = 'checked2'"
          @mouseout="hoveredLuggageType = ''"
          @click="selectLuggage(luggageTypes[3])"
        >
          <img src="@/assets/Baggage.png" alt="Checked Bag" />
          <div class="luggage-details">
            <h3>Checked Bag x 2</h3>
            <p>MAX 32 KG</p>
            <p>81 x 119 x 171 cm</p>
            <p>35 €</p>
          </div>
        </div>
      </div>

      <!-- Dugmad za povratak i nastavak -->
      <div class="button-container">
        <button class="back-button" @click="goBackB">Back</button>
        <button class="next-button" @click="showFlightDComponent">Next</button>
      </div>
    </div>

    <!-- FlightD Square -->
    <div class="flight-square" v-if="showFlightSquareD">
      <div class="text-container">
        <div class="text-content">
          <h1>Payment Information</h1>
          <div class="form-group">
            <label for="credit-card">Credit Card Number</label>
            <input type="text" id="credit-card" v-model="creditCardNumber" />
          </div>
          <div class="form-group">
            <label for="expiration-date">Expiration Date</label>
            <input type="text" id="expiration-date" v-model="expirationDate" />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="cvv" />
          </div>
        </div>
      </div>
      <div class="button-container">
        <button class="back-button" @click="goBackC">Back</button>
        <button class="next-button" @click="submitPayment">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { TempusDominus } from "@eonasdan/tempus-dominus";

export default {
  props: {
    showFlightSquare: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      departureInputId: `departure-input-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      returnInputId: `return-input-${Math.random().toString(36).substr(2, 9)}`,
      showFlightSquareLocal: this.showFlightSquare,
      showFlightSquareB: false,
      showFlightSquareC: false,
      showFlightSquareD: false,
      departureDate: "",
      returnDate: "",
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
      selectedOrigin: null,
      selectedDestination: null,
      ticketTypeSelected: false,
      selectedTicketType: "one-way",
      numberOfPassengers: 1,
      basePriceOneWay: 30,
      creditCardNumber: "",
      expirationDate: "",
      cvv: "",
      hoveredLuggageType: "", // Dodajemo novu promenljivu
      luggageTypes: [
        {
          name: "Carry-On Bag",
          price: 0,
          maxCount: 1,
          selectedCount: 0,
          description: "MAX 10 KG, 40 x 30 x 20 cm",
        },
        {
          name: "Trolley Bag",
          price: 0,
          maxCount: 1,
          selectedCount: 0,
          description: "MAX 10 KG, 55 x 40 x 20 cm",
        },
        {
          name: "Checked Bag x 1",
          price: 25,
          maxCount: 2,
          selectedCount: 0,
          description: "MAX 20 KG, 99 x 119 x 171 cm",
        },
        {
          name: "Checked Bag x 2",
          price: 35,
          maxCount: 2,
          selectedCount: 0,
          description: "MAX 32 KG, 81 x 119 x 171 cm",
        },
      ],
    };
  },
  computed: {
    showReturnDate() {
      return this.selectedTicketType === "return";
    },
    filteredAirports() {
      return this.selectedOrigin
        ? this.airports.filter(
            (airport) => airport.code !== this.selectedOrigin.code
          )
        : this.airports;
    },
    totalPrice() {
      const luggagePrice = this.luggageTypes.reduce((acc, luggage) => {
        return acc + luggage.price * luggage.selectedCount;
      }, 0);
      return this.finalPrice + luggagePrice;
    },
    finalPrice() {
      let basePrice =
        this.selectedTicketType === "return"
          ? this.basePriceOneWay * 2
          : this.basePriceOneWay;
      return basePrice * this.numberOfPassengers;
    },
  },
  watch: {
    showFlightSquare(newVal) {
      this.showFlightSquareLocal = newVal;
    },
    showFlightSquareLocal(newVal) {
      if (newVal) {
        this.initDatePickers();
      }
    },
  },
  mounted() {
    this.initDatePickers();
  },
  methods: {
    hideFlightSquare() {
      this.$emit("close");
    },
    initDatePickers() {
      nextTick(() => {
        this.initializeDeparturePicker();
        this.initializeReturnPicker();
      });
    },
    selectLuggage(luggage) {
      if (luggage.selectedCount < luggage.maxCount) {
        luggage.selectedCount++;
      }
    },
    resetLuggage() {
      this.luggageTypes.forEach((luggage) => {
        luggage.selectedCount = 0;
      });
    },
    initializeDeparturePicker() {
      const input = document.getElementById(this.departureInputId);
      if (input) {
        const picker = new TempusDominus(input, {
          display: {
            components: {
              calendar: true,
              date: true,
              month: true,
              year: true,
              clock: false,
            },
          },
          localization: {
            format: "dd/MM/yyyy",
          },
          restrictions: {
            minDate: this.getTomorrow(),
          },
        });

        picker.dates.setValue(
          this.departureDate ? new Date(this.departureDate) : null
        );

        picker.subscribe("change", (e) => {
          const dateWithRandomTime = this.addRandomTime(e.date);
          const formattedDate = dateWithRandomTime.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          this.departureDate = formattedDate;
          input.value = formattedDate;
        });

        this.$refs.departureButton.addEventListener("click", () =>
          picker.show()
        );
      }
    },
    initializeReturnPicker() {
      const input = document.getElementById(this.returnInputId);
      if (input) {
        const picker = new TempusDominus(input, {
          display: {
            components: {
              calendar: true,
              date: true,
              month: true,
              year: true,
              clock: false,
            },
          },
          localization: {
            format: "dd/MM/yyyy",
          },
          restrictions: {
            minDate: this.departureDate
              ? new Date(this.departureDate)
              : this.getTomorrow(),
          },
        });

        picker.dates.setValue(
          this.returnDate ? new Date(this.returnDate) : null
        );

        picker.subscribe("change", (e) => {
          const dateWithRandomTime = this.addRandomTime(e.date);
          const formattedDate = dateWithRandomTime.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          this.returnDate = formattedDate;
          input.value = formattedDate;
        });

        this.$refs.returnButton.addEventListener("click", () => picker.show());
      }
    },
    getTomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    addRandomTime(date) {
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() / 2) * 30;
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
    toggleFlightSquare(show) {
      this.showFlightSquareLocal = show;
    },
    showFlightBComponent() {
      this.updateComponentVisibility(false, true, false, false);
    },
    showFlightCComponent() {
      this.updateComponentVisibility(false, false, true, false);
    },
    showFlightDComponent() {
      this.updateComponentVisibility(false, false, false, true);
    },
    goBack() {
      this.updateComponentVisibility(true, false, false, false);
      this.initDatePickers();
    },
    goBackB() {
      this.updateComponentVisibility(false, true, false, false);
    },
    goBackC() {
      this.updateComponentVisibility(false, false, true, false);
    },
    updateComponentVisibility(local, b, c, d) {
      this.showFlightSquareLocal = local;
      this.showFlightSquareB = b;
      this.showFlightSquareC = c;
      this.showFlightSquareD = d;
    },
    submitPayment() {
      // Payment submission logic here
    },
    selectOrigin(airport) {
      this.selectedOrigin = airport;
      this.selectedDestination = null;
    },
    selectDestination(airport) {
      this.selectedDestination = airport;
    },
    selectTicket(ticketType) {
      this.selectedTicketType = ticketType;
      this.ticketTypeSelected = true;
    },
    selectNumberOfPassengers(num) {
      this.numberOfPassengers = num;
    },
    setDepartureDate(date) {
      this.departureDate = date;
    },
    setReturnDate(date) {
      this.returnDate = date;
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
.flight-squareB {
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
  width: 900px;
  height: 70px;
  background-color: #9400d3;
  margin-bottom: 40px; /* Adjust spacing between squares */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.purple-squareB {
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

/* FlightC CSS */

.luggage-container {
  display: flex; /* This will align children (luggage-type divs) in a row */
  justify-content: space-around; /* This will space out the luggage-type divs equally */
  align-items: center; /* This will vertically center align the luggage-type divs */
  width: 100%; /* This will ensure the container takes full width */
}

.luggage-selection {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background: #ffffff; /* Assuming a white background */
}

.luggage-type {
  border: 2px solid #9400d3;
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  flex: 1;
}

.luggage-type.hovered {
  background-color: #00d3e0; /* Promenjena boja kada je miš iznad */
  color: white;
}
.luggage-type.hovered h3,
.luggage-type.hovered p {
  color: white; /* Boja teksta za bolju vidljivost */
}

.luggage-type img {
  max-width: 100px; /* Adjust as needed */
  height: auto;
  margin-bottom: 10px;
}

.luggage-details h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 5px;
}

.luggage-details p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

/* Special styling for the selected luggage type */
.luggage-type.selected {
  background: #9400d3; /* Purple background for selected */
  color: #ffffff; /* White text color for selected */
}

.luggage-type.selected h3,
.luggage-type.selected p {
  color: #ffffff;
}

/* Button and input styles */
.button,
.input {
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.input[type="number"] {
  max-width: 80px; /* Limit width of number input */
}

/* Special styles for buttons */
.button.primary {
  background-color: #00d3e0; /* Teal color for primary buttons */
  color: white;
}

.button.secondary {
  background-color: #9400d3; /* Purple color for secondary buttons */
  color: white;
}

/* Full price and luggage price styles */
.price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
}

.price-container .full-price {
  color: #00d3e0; /* Teal color for full price */
}

.price-container .luggage-price {
  color: #9400d3; /* Purple color for luggage price */
}

.special-purple-square {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  margin-top: 20px;
  background-color: #8a2be2;
  border-radius: 25px;
  color: white;
}

.special-purple-square span,
.special-purple-square input {
  margin: 0 5px;
  color: white;
}

.special-purple-square input {
  width: 60px;
  padding: 5px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  text-align: center;
}

/* Style arrows in number input if needed, for example: */
.special-purple-square input[type="number"]::-webkit-inner-spin-button,
.special-purple-square input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Removes default arrows from inputs */
}
/* FlightC CSS*/

/* FlightD CSS */
.squares-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.square {
  width: 400px;
  height: 340px;
  background-color: #ffffff;
  margin: 10px;
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
  width: 400px;
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
.services-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
}
/* FlightD CSS */
</style>
