import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDUEi9xGKBB9gNqrkli9NfvUOHC7s-YIzY",
    authDomain: "redux-discord-clone.firebaseapp.com",
    databaseURL: "https://redux-discord-clone.firebaseio.com",
    projectId: "redux-discord-clone",
    storageBucket: "redux-discord-clone.appspot.com",
    messagingSenderId: "761681326247",
    appId: "1:761681326247:web:47e696c0e1739b0680eb82",
    measurementId: "G-YLM1BPYF33"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;