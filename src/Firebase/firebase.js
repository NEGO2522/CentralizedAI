// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailLink, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInAnonymously
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeugJV1DKuTnLHPQMP1wcAguS1zawW8dw",
  authDomain: "ai-application-280d5.firebaseapp.com",
  projectId: "ai-application-280d5",
  storageBucket: "ai-application-280d5.appspot.com",  // Fixed the storage bucket URL
  messagingSenderId: "675597473249",
  appId: "1:675597473249:web:b869c2edb3adaa46332ea0",
  measurementId: "G-CZDKBK0J8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Moved after app initialization
const googleProvider = new GoogleAuthProvider();

// Email link authentication
const sendSignInLink = async (email) => {
  const actionCodeSettings = {
    url: window.location.origin + '/login',
    handleCodeInApp: true,
  };
  
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending sign in link:', error);
    return { success: false, error: error.message };
  }
};

// Google sign in
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error: error.message };
  }
};

// Check if the user is coming back from an email link
const isSignInLink = () => {
  return isSignInWithEmailLink(auth, window.location.href);
};

// Complete sign in with email link
const signInWithEmailLinkHandler = async (email) => {
  try {
    const result = await signInWithEmailLink(auth, email, window.location.href);
    window.localStorage.removeItem('emailForSignIn');
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with email link:', error);
    return { success: false, error: error.message };
  }
};

export { 
  auth, 
  storage,  
  signInWithGoogle, 
  sendSignInLink, 
  isSignInLink, 
  signInWithEmailLinkHandler 
};