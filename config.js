import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDoBJ2rVJKhGppMMN2J5SXTqmNFOgMibaI",
    authDomain: "barter-app-f6af9.firebaseapp.com",
    databaseURL: "https://barter-app-f6af9.firebaseio.com",
    projectId: "barter-app-f6af9",
    storageBucket: "barter-app-f6af9.appspot.com",
    messagingSenderId: "839362316676",
    appId: "1:839362316676:web:acb563f56250608562f5d1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();
