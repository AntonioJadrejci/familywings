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
          <h2>{{ username || "Anonymous User" }}</h2>
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
        </div>
        <div class="profile-buttons">
          <button class="btn btn-primary" @click="viewPreviousFlights">
            Last Flight
          </button>
          <button class="btn btn-primary" @click="viewPreviousRents">
            Last Car Rent
          </button>
          <button class="btn btn-primary" @click="viewPreviousShuttles">
            Previous Shuttle
          </button>
        </div>
        <button class="back-button" @click="goToHomePage">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "@/firebase";
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      profileImage: null,
      username: "Anonymous User",
    };
  },
  methods: {
    // Dohvati korisničke podatke iz Firestore-a
    async fetchUserDetails(user) {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.username = userData.firstName || "Anonymous User";

        // Dohvati profilnu sliku
        this.profileImage =
          userData.profileImage ||
          (await this.getStorageProfileImage(user.uid)) ||
          require("@/assets/EmptyProfile.png");
      }
    },

    // Dohvati profilnu sliku iz Firebase Storage
    async getStorageProfileImage(userId) {
      const storageRef = ref(storage, `profileImages/${userId}`);
      try {
        return await getDownloadURL(storageRef);
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          return require("@/assets/EmptyProfile.png"); // Default slika
        }
        console.error("Error fetching profile image:", error);
        return null;
      }
    },

    // Uploadaj novu sliku
    async uploadProfileImage(event) {
      const file = event.target.files[0];
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to upload a profile image.");
        return;
      }

      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const db = getFirestore();

      try {
        // Uploadaj sliku u Storage
        await uploadBytes(storageRef, file);

        // Dohvati URL uploadane slike
        const url = await getDownloadURL(storageRef);

        // Ažuriraj Firestore s novim URL-om slike
        await updateDoc(doc(db, "users", user.uid), { profileImage: url });
        this.profileImage = url;

        alert("Profile image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading profile image:", error);
        alert("Failed to upload profile image.");
      }
    },

    goToHomePage() {
      this.$router.push("/");
    },

    async viewPreviousFlights() {
      await this.fetchLastPDF("flighttickets");
    },
    async viewPreviousRents() {
      await this.fetchLastPDF("rents");
    },
    async viewPreviousShuttles() {
      await this.fetchLastPDF("shuttles");
    },
    async fetchLastPDF(category) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to view previous files.");
        return;
      }

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data()[category.toLowerCase()] || [];
        if (data.length === 0) {
          alert(`No PDFs found in ${category} category.`);
          return;
        }

        // Dohvati zadnji PDF
        const lastPDF = data[data.length - 1];
        if (lastPDF.url) {
          this.downloadPDF(lastPDF.name, lastPDF.url);
        } else {
          alert("The PDF URL is missing or invalid.");
        }
      } else {
        alert("No data found for the current user.");
      }
    },
    downloadPDF(name, url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    // Koristi onAuthStateChanged za sigurnu provjeru korisnika
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchUserDetails(user);
      } else {
        this.username = "Anonymous User";
        this.profileImage = require("@/assets/EmptyProfile.png");
      }
    });
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
