<!-- Flight.vue -->

<template>
  <div class="square-button" @click="handleClick">
    <img
      :src="require('@/assets/Flight.jpg')"
      alt="Flights"
      class="button-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      // Handle button click event if needed
      console.log("Button clicked!");
    },
  },
};
</script>

<style scoped>
.square-button {
  width: 200px; /* Set the width and height as needed */
  height: 200px;
  background-color: #9400d3; /* Set the background color */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.button-image {
  max-width: 100%;
  max-height: 100%;
  width: 100%; /* Adjust the image size as needed */
  height: auto;
}
</style>