// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcWi4F-Zevl35qJwgNbbBMxjrev8snMU8",
  authDomain: "linkedin-clone-76af7.firebaseapp.com",
  projectId: "linkedin-clone-76af7",
  storageBucket: "linkedin-clone-76af7.appspot.com",
  messagingSenderId: "186905918158",
  appId: "1:186905918158:web:c331c84e2ac5556ab92e9f"
};

// Initialize Firebase

module.exports = initializeApp(firebaseConfig);