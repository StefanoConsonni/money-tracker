import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCG3J4oQ2Gd92XMmPuP1UYnnoGvi7YG0gU",
	authDomain: "money-tracker-3f8f5.firebaseapp.com",
	projectId: "money-tracker-3f8f5",
	storageBucket: "money-tracker-3f8f5.appspot.com",
	messagingSenderId: "33892283927",
	appId: "1:33892283927:web:90655fe6aac5e9b8e70e52",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
