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
        <h1>Flight Services</h1>

        <div class="purple-squares-container">
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <!-- Prvi Button -->
          <div class="mb-3">
            <label for="originAirport" class="form-label">Origin</label>
            <select
              id="originAirport"
              class="form-select"
              v-model="selectedOrigin"
            >
              <option
                v-for="airport in airports"
                :key="airport.code"
                :value="airport"
              >
                {{ airport.name }} ({{ airport.code }})
              </option>
            </select>
          </div>
          <!-- Drugi Button -->
          <div class="mb-3">
            <label for="destinationAirport" class="form-label"
              >Destination</label
            >
            <select
              id="destinationAirport"
              class="form-select"
              v-model="selectedDestination"
            >
              <option
                v-for="airport in filteredAirports"
                :key="airport.code"
                :value="airport"
              >
                {{ airport.name }} ({{ airport.code }})
              </option>
            </select>
          </div>

          <!-- Treci Button -->
          <div class="mb-3">
            <label for="ticketType" class="form-label">Ticket Type</label>
            <select
              id="ticketType"
              class="form-select"
              v-model="selectedTicketType"
            >
              <option value="one-way">One Way</option>
              <option value="return">Return</option>
            </select>
          </div>

          <!-- Cetvrti Button (Select Departure Date) -->
          <div
            class="row justify-content-center"
            v-if="selectedTicketType === 'one-way'"
          >
            <div class="col-md-6 mb-3 text-center">
              <label for="departureDateFlight" class="form-label"
                >Departure Date</label
              >
              <input
                id="departureDateFlight"
                type="date"
                class="form-control centered-date-input"
                v-model="departureDateFlight"
                :min="getDynamicMinDate()"
              />
            </div>
          </div>

          <!-- Peti Button (Select Return Date) -->
          <div class="row" v-if="selectedTicketType === 'return'">
            <div class="col-md-6 mb-3">
              <label for="departureDateFlight" class="form-label"
                >Departure Date</label
              >
              <input
                id="departureDateFlight"
                type="date"
                class="form-control"
                v-model="departureDateFlight"
                :min="getDynamicMinDate()"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="returnDateFlight" class="form-label"
                >Return Date</label
              >
              <input
                id="returnDateFlight"
                type="date"
                class="form-control"
                v-model="returnDateFlight"
                :min="departureDateFlight || getDynamicMinDate()"
              />
            </div>
          </div>

          <!-- Sesti Button -->
          <div class="mb-3">
            <label for="numberOfPassengers" class="form-label"
              >Passengers</label
            >
            <select
              id="numberOfPassengers"
              class="form-select"
              v-model="numberOfPassengers"
            >
              <option v-for="num in [1, 2, 3]" :key="num" :value="num">
                {{ num }} Passenger{{ num > 1 ? "s" : "" }}
              </option>
            </select>
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
          <button
            class="next-button"
            :class="{ disabled: !canProceed }"
            :disabled="!canProceed"
            @click="showFlightBComponent"
          >
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
        <span>Flight Price: {{ finalPrice }}€</span>
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
        <button class="next-button" @click="showFlightC2Component">Next</button>
      </div>
    </div>

    <!-- FlightC2 Square -->
    <div class="flight-square" v-if="showFlightSquareC2">
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
        <!-- New section for additional services -->
        <div class="services-header">
          <h2>Other services?</h2>
        </div>
        <div class="services-container">
          <!-- Rent a Car -->
          <div class="service-option" @click="selectService('rent-a-car')">
            <img src="@/assets/RentaCar.jpg" alt="Rent a Car" />
            <button class="service-button" @click="showFlightC3Component">
              Rent a Car
            </button>
          </div>

          <!-- Shuttle Bus -->
          <div class="service-option" @click="selectService('shuttle-bus')">
            <img src="@/assets/ShuttleBus.jpg" alt="Shuttle Bus" />
            <button class="service-button" @click="showFlightC4Component">
              Shuttle Bus
            </button>
          </div>
        </div>
        <div class="purple-squares-container">
          <!-- Additional Return Details for Return Tickets -->

          <!-- Single Flight Price Purple Square -->
          <div class="purple-squareB">
            <div class="half-text">Flight Price: {{ finalPrice }}€</div>
          </div>
        </div>

        <div class="button-container">
          <button class="back-button" @click="goBackC">Back</button>
          <button class="next-button" @click="showFlightDComponent">
            Skip this step
          </button>
        </div>
      </div>
    </div>

    <!-- FlightC3 Square -->
    <div v-if="showFlightSquareC3" class="flight-square">
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
        <button class="back-button" @click="goBackC21">Back</button>
        <button
          class="next-button"
          :class="{ disabled: !canConfirm }"
          :disabled="!canConfirm"
          @click="showFlightDComponent"
        >
          Confirm
        </button>
      </div>
    </div>

    <!-- Deo za FlightC4 Square -->
    <div class="flight-square" v-if="showFlightSquareC4">
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

      <!-- Select Airport -->
      <div class="mb-4 d-flex justify-content-center">
        <label for="selectAirportC4" class="form-label me-3"
          >Select Airport:</label
        >
        <select
          id="selectAirportC4"
          class="form-select w-50"
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
      <div class="mb-4 d-flex justify-content-center">
        <label for="shuttlePickupDate" class="form-label me-3"
          >Pickup Date:</label
        >
        <input
          id="shuttlePickupDate"
          type="date"
          class="form-control"
          v-model="shuttlePickupDate"
          :min="getDynamicMinDate()"
          placeholder="dd/mm/yyyy"
        />
      </div>

      <!-- Number of Tickets -->
      <div class="mb-4 d-flex justify-content-center">
        <label for="ticketCount" class="form-label me-3"
          >Number of Tickets:</label
        >
        <select
          id="ticketCount"
          class="form-select w-50"
          v-model.number="ticketCount"
        >
          <option value="0">0 Ticket(s)</option>
          <option value="1">1 Ticket</option>
          <option value="2">2 Tickets</option>
          <option value="3">3 Tickets</option>
        </select>
      </div>

      <!-- Price Display -->
      <div class="special-purple-square">
        <span>Total Price: {{ shuttleBusPrice }}€</span>
      </div>

      <!-- Buttons -->
      <div class="button-container mt-4">
        <button class="back-button" @click="goBackC2">Back</button>
        <button
          class="next-button"
          :class="{ disabled: !canConfirmShuttle }"
          :disabled="!canConfirmShuttle"
          @click="showFlightDComponent"
        >
          Confirm
        </button>
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
          <!-- Single Flight Price Purple Square -->
          <div class="purple-squareB">
            <div class="half-text">Flight Price: {{ finalPrice }}€</div>
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
      showFlightSquareC2: false,
      showFlightSquareC3: false,
      showFlightSquareC4: false,
      showFlightSquareD: false,
      departureDate: "",
      returnDate: "",
      selectedOrigin: null, // Za prvi button (Origin)
      selectedDestination: null, // Za drugi button (Destination)
      selectedAirportC3: null, // Za FlightC3
      selectedAirportC4: null, // Za FlightC4
      // Dodani podaci
      departureDateFlight: "", // Za "Departure Date"
      returnDateFlight: "", // Za "Return Date"
      shuttlePickupDate: "",
      pickupDateC3: "", // Dodano za 'Pickup Date' u FlightC3
      returnDateC3: "", // Dodano za 'Return Date' u FlightC3
      selectedTicketType: "one-way", // Podrazumevano, samo jedan smer
      ticketPrice: 5,
      ticketCount: 0,

      additionalCosts: 0, // Dodatni troškovi za prtljag, shuttle itd.

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
      selectedAirport: null,
      pickupDate: "",
      returnDate: "",
      selectedCar: null,
      totalCarRentalPrice: null,
      cars: [
        {
          name: "Opel Zafira",
          seats: 7,
          suitcases: 4,
          gear: "Automatic",
          price: 50,
          image: require("@/assets/Zafira.jpg"),
        },
        {
          name: "VW Polo",
          seats: 5,
          suitcases: 2,
          gear: "Manual",
          price: 35,
          image: require("@/assets/Polo.jpg"),
        },
        {
          name: "Seat Arona",
          seats: 5,
          suitcases: 3,
          gear: "Automatic",
          price: 40,
          image: require("@/assets/Arona.jpg"), // Postavi sliku koju si uploudovao
        },
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
          maxCount: 1,
          selectedCount: 0,
          description: "MAX 20 KG, 99 x 119 x 171 cm",
        },
        {
          name: "Checked Bag x 2",
          price: 35,
          maxCount: 1,
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

    finalPrice() {
      const ticketPrice = this.ticketPrice * this.ticketCount;
      const luggagePrice = this.luggageTypes.reduce((acc, luggage) => {
        return acc + luggage.price * luggage.selectedCount;
      }, 0);
      const basePrice =
        this.selectedTicketType === "return"
          ? this.basePriceOneWay * 2
          : this.basePriceOneWay;

      return basePrice * this.numberOfPassengers + ticketPrice + luggagePrice;
    },
    shuttleBusPrice() {
      return this.ticketCount * this.ticketPrice; // Kalkulacija cene
    },
    canProceed() {
      // Provjeri da li su svi uvjeti ispunjeni
      const isDepartureDateSet = !!this.departureDateFlight;
      const isReturnDateSet =
        this.selectedTicketType === "return" ? !!this.returnDateFlight : true;
      return (
        this.selectedOrigin &&
        this.selectedDestination &&
        isDepartureDateSet &&
        isReturnDateSet
      );
    },
    canConfirm() {
      // Provjera da li su svi uvjeti za "Confirm" dugme ispunjeni
      return (
        this.selectedAirportC3 &&
        this.pickupDateC3 &&
        this.returnDateC3 &&
        this.selectedCar
      );
    },

    canConfirmShuttle() {
      // Provjera da li su svi uvjeti ispunjeni za aktivaciju Confirm dugmeta
      return (
        this.selectedAirportC4 && this.shuttlePickupDate && this.ticketCount > 0
      );
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
        this.addCost(luggage.price);
      }
    },
    resetLuggage() {
      this.luggageTypes.forEach((luggage) => {
        this.removeCost(luggage.price * luggage.selectedCount);
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
            format: "dd/MM/yyyy", // Postavi format na dd/MM/yyyy
          },
          restrictions: {
            minDate: this.getTomorrow(),
          },
        });

        picker.dates.setValue(
          this.departureDate ? new Date(this.departureDate) : null
        );

        picker.subscribe("change", (e) => {
          const formattedDate = e.date.toLocaleDateString("en-GB"); // Formatiraj datum na dd/MM/yyyy
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
        const minDate = this.pickupDate
          ? new Date(this.pickupDate)
          : this.getTomorrow();

        if (!minDate) {
          console.warn("Pickup date is not valid. Resetting return picker.");
          input.value = "";
          return;
        }

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
            format: "dd/MM/yyyy", // Postavi format na dd/MM/yyyy
          },
          restrictions: {
            minDate: minDate, // Minimalni datum postavljen na pickupDate ili sutrašnji datum
          },
        });

        picker.dates.setValue(
          this.returnDate ? new Date(this.returnDate) : null
        );

        picker.subscribe("change", (e) => {
          const dateWithRandomTime = this.addRandomTime(e.date);
          const formattedDate = dateWithRandomTime.toLocaleDateString("en-GB", {
            day: "2-digit", // Dan u formatu 2 cifre
            month: "2-digit", // Mesec u formatu 2 cifre
            year: "numeric", // Godina u punom formatu
          });
          this.returnDate = formattedDate;
          input.value = formattedDate; // Postavi formatirani datum u input polje
        });

        this.$refs.returnButton.addEventListener("click", () => picker.show());
      }
    },
    getDynamicMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1); // Minimum je sutrašnji datum
      return today.toISOString().split("T")[0];
    },
    calculateTotalPrice() {
      if (this.pickupDateC3 && this.returnDateC3 && this.selectedCar) {
        const pickup = new Date(this.pickupDateC3);
        const returnD = new Date(this.returnDateC3);
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24)) + 1; // Uključuje dan pickup-a
        this.totalCarRentalPrice = days * this.selectedCar.price;
      } else {
        this.totalCarRentalPrice = null; // Resetiraj cijenu ako uvjeti nisu ispunjeni
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
      this.updateComponentVisibility(
        false,
        true,
        false,
        false,
        false,
        false,
        false
      );
    },
    showFlightCComponent() {
      this.updateComponentVisibility(
        false,
        false,
        true,
        false,
        false,
        false,
        false
      );
    },
    showFlightC2Component() {
      this.updateComponentVisibility(
        false,
        false,
        false,
        true,
        false,
        false,
        false
      );
    },
    showFlightC3Component() {
      this.updateComponentVisibility(
        false,
        false,
        false,
        false,
        true,
        false,
        false
      );
    },
    showFlightC4Component() {
      this.updateComponentVisibility(
        false,
        false,
        false,
        false,
        false,
        true,
        false
      );
    },
    showFlightDComponent() {
      this.updateComponentVisibility(
        false,
        false,
        false,
        false,
        false,
        false,
        true
      );
    },
    goBack() {
      this.updateComponentVisibility(true, false, false, false);
      this.initDatePickers();
    },
    goBackB() {
      this.updateComponentVisibility(
        false,
        true,
        false,
        false,
        false,
        false,
        false
      );
    },
    goBackC() {
      this.updateComponentVisibility(
        false,
        false,
        true,
        false,
        false,
        false,
        false
      );
    },
    goBackC2() {
      this.ticketCount = 0; // Resetuj broj karata na 0
      this.updateComponentVisibility(
        false,
        false,
        false,
        true,
        false,
        false,
        false
      );
    },
    goBackC21() {
      this.ticketCount = 0; // Resetuj broj karata na 0
      this.resetFlightC3Data();
      this.$emit("gobackC2");
      this.updateComponentVisibility(
        false,
        false,
        false,
        true,
        false,
        false,
        false
      );
    },
    goBackC3() {
      this.updateComponentVisibility(
        false,
        false,
        false,
        false,
        true,
        false,
        false
      );
    },
    updateComponentVisibility(local, b, c, c2, c3, c4, d) {
      this.showFlightSquareLocal = local;
      this.showFlightSquareB = b;
      this.showFlightSquareC = c;
      this.showFlightSquareC2 = c2;
      this.showFlightSquareC3 = c3;
      this.showFlightSquareC4 = c4;
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
    },
    selectTicket(type) {
      this.selectedTicketType = type; // Set the selected ticket type
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
    selectService(service) {
      console.log(`Selected service: ${service}`);
      // Ovdje možete dodati logiku za odabranu uslugu (npr. dodavanje cijene)
    },
    selectCar(car) {
      this.selectedCar = car;
      this.calculateTotalPrice(); // Recalculate total price on car selection
    },

    resetFlightC3Data() {
      this.selectedAirportC3 = null;
      this.pickupDateC3 = "";
      this.returnDateC3 = "";
      this.selectedCar = null;
      this.totalCarRentalPrice = null;
    },
    addCost(amount) {
      this.additionalCosts += amount;
    },
    removeCost(amount) {
      this.additionalCosts -= amount;
    },
    resetCosts() {
      this.additionalCosts = 0;
    },
    confirmShuttleBus() {
      // Dodaj cenu za shuttle bus (5€ po karti)
      this.addCost(this.ticketPrice * this.ticketCount);
      this.showFlightDComponent(); // Prelazak na sledeći prozor
    },
    confirmCarRental() {
      console.log("Car rental confirmed:", {
        airport: this.selectedAirport,
        car: this.selectedCar,
        pickupDate: this.pickupDate,
        returnDate: this.returnDate,
        totalPrice: this.totalCarRentalPrice,
      });
      // Implement logic for confirmation
    },
  },
  watch: {
    pickupDate: "calculateTotalPrice",
    returnDate: "calculateTotalPrice",
    selectedOrigin(newVal) {
      if (
        newVal &&
        this.selectedDestination &&
        newVal.code === this.selectedDestination.code
      ) {
        this.selectedDestination = null; // Reset destination if it matches origin
        alert("Origin and Destination cannot be the same.");
      }
    },
    selectedDestination(newVal) {
      if (
        newVal &&
        this.selectedOrigin &&
        newVal.code === this.selectedOrigin.code
      ) {
        this.selectedOrigin = null; // Reset origin if it matches destination
        alert("Destination and Origin cannot be the same.");
      }
    },
    departureDateFlight(newVal, oldVal) {
      if (new Date(this.returnDateFlight) <= new Date(newVal)) {
        this.returnDateFlight = ""; // Resetovanje povratnog datuma ako je nevalidan
      }
    },
    pickupDateC3(newVal, oldVal) {
      if (new Date(this.returnDateC3) <= new Date(newVal)) {
        this.returnDateC3 = ""; // Resetovanje povratnog datuma ako je nevalidan
      }
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
  height: 900px; /* Set a fixed height */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Dodaj vertikalno skrolovanje */
  max-height: 90vh; /* Ograniči maksimalnu visinu */
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
  font-size: 18px;
  font-weight: bold;
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
.services-header {
  text-align: center;
  margin-bottom: 30px;
}

.services-header h2 {
  font-size: 24px;
  color: #000000;
}

.services-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.service-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.service-option:hover {
  transform: scale(1.05);
}

.service-option img {
  width: 250px;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.service-button {
  background-color: #9400d3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.price-display {
  font-size: 18px;
  color: #00d3e0;
}

.skip-button {
  background-color: #00d3e0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

/* Smanjenje kartica i slika */
.card {
  max-width: 250px; /* Ograniči širinu kartice */
  margin: 10px auto; /* Doda razmak između kartica */
}

.card img {
  max-height: 120px; /* Smanji visinu slika */
  object-fit: contain; /* Zadrži proporcije slike */
}

.card-title {
  font-size: 1.2rem; /* Smanji veličinu naslova */
}

.card-text {
  font-size: 0.9rem; /* Smanji veličinu teksta */
}

.row {
  margin: 0 auto; /* Poravnaj sadržaj u centru */
}

.d-flex {
  display: flex;
  align-items: center;
}

.w-50 {
  width: 50%;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.me-3 {
  margin-right: 1rem;
}

.text-center {
  text-align: center; /* Centriranje labela i sadržaja */
}
.row.justify-content-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Prostor oko elemenata */
  width: 100%; /* Osiguraj da zauzima punu širinu */
}

.col-md-6.mb-3.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centriraj po vertikali */
  max-width: 300px; /* Ograniči maksimalnu širinu */
}

.centered-date-input {
  margin: 0 auto; /* Centriranje unosa */
  text-align: center; /* Centriraj tekst unutar unosa */
  width: 100%; /* Popuni prostor */
  max-width: 300px; /* Maksimalna širina */
}

/* FlightD CSS */
</style>
