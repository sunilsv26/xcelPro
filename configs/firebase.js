
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLypLSxzKzaSESYuhyMVGCmCLQKE4eHYg",
  authDomain: "xcelpros-7af22.firebaseapp.com",
  projectId: "xcelpros-7af22",
  storageBucket: "xcelpros-7af22.appspot.com",
  messagingSenderId: "211081723428",
  appId: "1:211081723428:web:bcd46de44294a6190b22b1",
  measurementId: "G-SHP15DQ7MD"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();
const auth = firebase.auth();
//const db = getDatabase()
const now = firebase.firestore.Timestamp.now();
const storage = firebase.storage();
export { auth, now, storage };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');