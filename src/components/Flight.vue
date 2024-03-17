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
          <div class="purple-square">
            <div class="half-text">Origin</div>
            <div class="half-text">Destination</div>
          </div>
          <div class="purple-square">
            <div class="half-text">Departure</div>
            <div class="half-text">Return</div>
          </div>
          <div class="purple-square">
            <div class="half-text">Passengers</div>
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
            <p>55 x 40 x 23 cm</p>
            <p>20 $</p>
          </div>
        </div>
        <div class="luggage-type selected">
          <img src="@/assets/Baggage.png" alt="Checked-In Bag" />
          <div class="luggage-details">
            <h3>Checked-In Bag x 6</h3>
            <p>MAX 15 KG, 20 KG or 32 KG</p>
            <p>55 x 40 x 23 cm</p>
            <p>30, 50, 70 $</p>
          </div>
        </div>
      </div>
      <div class="special-purple-square">
        <span>Number :</span>
        <input type="number" v-model="bagNumber" min="1" />
        <span>Weight :</span>
        <input type="number" v-model="bagWeight" min="1" />
        <span>Bag:</span>
        <input type="number" v-model="bagWeight" min="1" />
        <span>Kg</span>
      </div>
      <div class="button-container">
        <button class="back-button" @click="goBackToFlightB">Back</button>
        <button class="next-button">Next</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showFlightSquare: false,
      showFlightSquareB: false,
      showFlightSquareC: false,
    };
  },
  methods: {
    hideFlightSquare() {
      this.showFlightSquare = false;
    },
    showFlightBComponent() {
      this.showFlightSquareB = true;
    },
    goBack() {
      this.showFlightSquareB = false;
      this.showFlightSquare = true;
    },
    showFlightCComponent() {
      this.showFlightSquareB = false;
      this.showFlightSquareC = true;
    },
    goBackToFlightB() {
      this.showFlightSquareC = false;
      this.showFlightSquareB = true;
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
  margin-top: 20px; /* Adjust as needed */
  background-color: #8a2be2; /* Adjust the purple color as needed */
  border-radius: 25px; /* Rounded corners */
  color: white; /* Text color */
}

.special-purple-square span,
.special-purple-square input {
  margin: 0 5px; /* Adjust spacing around text and inputs */
  color: white; /* Text color */
}

.special-purple-square input {
  width: 60px; /* Adjust width as needed */
  padding: 5px; /* Padding inside inputs */
  border: 1px solid #d3d3d3; /* Border color */
  border-radius: 5px; /* Rounded corners for inputs */
  text-align: center;
}

/* Style arrows in number input if needed, for example: */
.special-purple-square input[type="number"]::-webkit-inner-spin-button,
.special-purple-square input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Removes default arrows from inputs */
}
/* FlightC CSS*/
</style>
