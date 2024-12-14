<template>
  <div class="about">
    <div class="square">
      <div class="image-container">
        <img
          src="@/assets/AboutPlane.png"
          alt="Left Image"
          class="left-image"
        />
        <div class="space"></div>
        <img
          src="@/assets/AboutPlane0.png"
          alt="Right Image"
          class="right-image"
        />
      </div>
      <div class="text-container">
        <div class="profile-header">
          <h1>My Profile</h1>
          <img
            :src="profileImage || require('@/assets/EmptyProfile.png')"
            alt="Profile"
            class="profile-picture"
          />
          <input
            type="file"
            class="form-control mt-2"
            @change="uploadProfileImage"
          />
          <h2>{{ username || "Anonymous User" }}</h2>
        </div>
        <div class="profile-buttons">
          <button class="btn btn-primary" @click="viewPreviousFlights">
            Previous Flights
          </button>
          <button class="btn btn-primary" @click="viewPreviousRents">
            Previous Rents
          </button>
          <button class="btn btn-primary" @click="viewPreviousShuttles">
            Previous Shuttles
          </button>
        </div>
        <button class="back-button" @click="goToHomePage">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, storage } from "@/firebase";

export default {
  data() {
    return {
      profileImage: null,
      username: "Anonymous User", // Replace with actual user data
    };
  },
  methods: {
    async uploadProfileImage(event) {
      const file = event.target.files[0];
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to upload a profile image.");
        return;
      }

      const storageRef = ref(storage, `profileImages/${user.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        this.profileImage = url;
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    },

    viewPreviousFlights() {
      alert("Flights functionality will be implemented later.");
    },
    viewPreviousRents() {
      alert("Rents functionality will be implemented later.");
    },
    viewPreviousShuttles() {
      alert("Shuttles functionality will be implemented later.");
    },
    async fetchUserDetails() {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.username = userData.firstName || "Anonymous User";
      }
    },
    async mounted() {
      this.fetchUserDetails();
    },
    goToHomePage() {
      // Redirect to home page
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>
.about {
  background-image: url("@/assets/A321.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  color: #fff;
  padding: 50px;
  min-width: 1000px;
  min-height: 400px;
}

.square {
  background-color: rgba(0, 211, 224, 0.9); /* Transparent turquoise */
  padding: 100px;
  border-radius: 10px;
  text-align: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-image,
.right-image {
  width: 200px;
  height: auto;
}

.space {
  width: 10px;
}

.text-container {
  margin-top: 50px;
}

.login-title {
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.form-label {
  color: #fff; /* White text for labels */
}

.form-control {
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* Semi-transparent input fields */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  color: #000; /* Black text */
}

.btn-primary {
  background-color: #0088cc;
  border: none;
}

.btn-primary:hover {
  background-color: #005f99;
}

.back-button {
  background-color: #9400d3; /* Purple color */
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
}

.back-button:hover {
  background-color: #6d00a7;
}

.profile-header {
  text-align: center;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px auto;
  border: 3px solid white;
}

.profile-buttons button {
  margin: 10px;
}
</style>
