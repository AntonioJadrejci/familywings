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
                  id="departure-input"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-departure"
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
                  id="return-input"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-return"
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
                <li><a class="dropdown-item" href="#">1</a></li>
                <li><a class="dropdown-item" href="#">2</a></li>
                <li><a class="dropdown-item" href="#">3</a></li>
              </ul>
            </div>
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
          <div class="date-button">
            <div class="half-text">3.3.2024.</div>
          </div>
          <div class="purple-squareB">
            <div class="half-text">London Gatwick (LGW) - Pula (PUY)</div>
            <div class="half-text">Flight Price: 105$</div>
          </div>
          <div class="date-button">
            <div class="half-text">10.3.2024.</div>
          </div>
          <div class="purple-squareB">
            <div class="half-text">Pula (PUY) - London Gatwick (LGW)</div>
            <div class="half-text">Flight Price: 105$</div>
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
      <div class="luggage-container">
        <div class="luggage-type">
          <img src="@/assets/Bag.png" alt="Carry-On Bag" />
          <div class="luggage-details">
            <h3>Carry-On Bag x 1</h3>
            <p>MAX 10 KG</p>
            <p>40 x 30 x 20 cm</p>
            <p>FREE</p>
          </div>
        </div>
        <div class="luggage-type">
          <img src="@/assets/Baggage.png" alt="Trolley Bag" />
          <div class="luggage-details">
            <h3>Trolley Bag x 1</h3>
            <p>MAX 10 KG</p>
            <p>55 x 40 x 20 cm</p>
            <p>FREE</p>
          </div>
        </div>
        <div class="luggage-type">
          <img src="@/assets/Baggage.png" alt="Checked Bag" />
          <div class="luggage-details">
            <h3>Checked Bag x 1</h3>
            <p>MAX 20 KG</p>
            <p>99 x 119 x 171 cm</p>
            <p>25 $</p>
          </div>
        </div>
        <div class="luggage-type">
          <img src="@/assets/Baggage.png" alt="Checked Bag" />
          <div class="luggage-details">
            <h3>Checked Bag x 2</h3>
            <p>MAX 32 KG</p>
            <p>81 x 119 x 171 cm</p>
            <p>35 $</p>
          </div>
        </div>
      </div>
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
export default {
  data() {
    return {
      showFlightSquare: true,
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
        { name: "Munchen", code: "MUC" },
        { name: "Istanbul", code: "IST" },
        { name: "Reykjavik", code: "KEF" },
        { name: "Copenhagen", code: "CPH" },
        { name: "Stockholm", code: "ARN" },
        { name: "Oslo", code: "OSL" },
        { name: "Zurich", code: "ZHR" },
        { name: "Amsterdam", code: "AMS" },
      ],
      selectedOrigin: null,
      selectedDestination: null,
      ticketTypeSelected: false,
      selectedTicketType: "",
      creditCardNumber: "",
      expirationDate: "",
      cvv: "",
    };
  },
  computed: {
    showReturnDate() {
      return this.selectedTicketType === "return";
    },
    filteredAirports() {
      if (this.selectedOrigin) {
        const filtered = this.airports.filter(
          (airport) => airport.code !== this.selectedOrigin.code
        );
        console.log("Filtered Airports:", filtered); // Provjera filtriranih aerodroma
        return filtered;
      }
      return this.airports;
    },
  },
  mounted() {
    this.initDatePickers();
  },

  methods: {
    initDatePickers() {
      // Inicijalizacija departure datepickera
      const departureInput = document.getElementById("departure-input");
      const departurePicker = new tempusDominus.TempusDominus(departureInput, {
        display: {
          components: {
            calendar: true,
            date: true,
            month: true,
            year: true,
            clock: false,
          },
        },
      });

      document
        .getElementById("button-departure")
        .addEventListener("click", () => {
          departurePicker.show();
        });
      // Inicijalizacija return datepickera
      const returnInput = document.getElementById("return-input");
      const returnPicker = new tempusDominus.TempusDominus(returnInput, {
        display: {
          components: {
            calendar: true,
            date: true,
            month: true,
            year: true,
            clock: false,
          },
        },
      });

      document.getElementById("button-return").addEventListener("click", () => {
        returnPicker.show();
      });
    },
    hideFlightSquare() {
      this.showFlightSquare = false;
    },
    showFlightBComponent() {
      this.showFlightSquare = false;
      this.showFlightSquareB = true;
    },
    showFlightCComponent() {
      this.showFlightSquareB = false;
      this.showFlightSquareC = true;
    },
    showFlightDComponent() {
      this.showFlightSquareC = false;
      this.showFlightSquareD = true;
    },
    goBack() {
      this.showFlightSquareB = false;
      this.showFlightSquare = true;
    },
    goBackB() {
      this.showFlightSquareC = false;
      this.showFlightSquareB = true;
    },
    goBackC() {
      this.showFlightSquareD = false;
      this.showFlightSquareC = true;
    },
    submitPayment() {
      // Logika za podnošenje plaćanja
    },
    selectOrigin(airport) {
      this.selectedOrigin = airport;
      this.selectedDestination = null; // Reset destination if origin changes
    },
    selectDestination(airport) {
      this.selectedDestination = airport;
    },
    selectTicket(ticketType) {
      this.selectedTicketType = ticketType;
      this.ticketTypeSelected = true;
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
  border: 2px solid #9400d3; /* Purple border color */
  border-radius: 10px;
  padding: 10px;
  width: 30%; /* Adjust as per your layout */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add some shadow for depth */
  margin: 10px;
  flex: 1;
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
