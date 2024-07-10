import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import firebase from 'firebase/app';
import * as auth from './firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBvnr5wJHRQ15n3EEkYOtEOxFpuKX0WfC8",
  authDomain: "home-auth-d0133.firebaseapp.com",
  projectId: "home-auth-d0133",
  storageBucket: "home-auth-d0133.appspot.com",
  messagingSenderId: "944838041458",
  appId: "1:944838041458:web:9940b3c298aa52533cc7eb"
  };

firebase.auth().settings.appVerificationDisabledForTesting = true;

const app = initializeApp(firebaseConfig)
 auth = getAuth(app)

export default auth ;
