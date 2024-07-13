import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import AuthenticatedScreen from "./CharactersPage";
import Profile from "./Profile";

// Firebase configuration - replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmM5w7JJSAqAC3WCKCykrsdzkwhH-gIxQ",
  authDomain: "loginapp-1c095.firebaseapp.com",
  projectId: "loginapp-1c095",
  storageBucket: "loginapp-1c095.appspot.com",
  messagingSenderId: "398823817487",
  appId: "1:398823817487:web:d8327617a3fe4c8a05be7a",
  measurementId: "G-R03EJX5M8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [userData, setUserData] = useState(null); // Track additional user data
  const [currentPage, setCurrentPage] = useState("login"); // Track current page
  const [showStartScreen, setShowStartScreen] = useState(true); // Track whether to show start screen

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user.uid);
        setCurrentPage("characters"); // Redirect to characters page after login
      } else {
        setCurrentPage("login"); // Redirect to login page if no user
      }
    });

    // Simulate start screen for 3 seconds
    setTimeout(() => {
      setShowStartScreen(false);
    }, 3000);

    return () => unsubscribe();
  }, [auth]);

  const fetchUserData = async (uid) => {
    console.log("Fetching user data for UID:", uid);
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Retrieve all user data from Firestore
      console.log("User data found:", userData); // Check console for correct data
      setUserData(userData);
      setUser(userData); // Set userData state correctly
    } else {
      console.log("No such user document!");
    }
  };

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
        setCurrentPage("login"); // Redirect to login page after logout
      } else {
        // Sign in or sign up
        if (currentPage === "login") {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else if (currentPage === "signup") {
          // Sign up
          if (password === cpassword) {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;

            // Save additional user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
              name: name,
              email: email,
            });

            console.log("User created successfully!");
          } else {
            Alert.alert("Error", "Passwords do not match.");
            return;
          }
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      Alert.alert("Authentication Error", error.message);
    }
  };

  const handleNavigateToProfile = async () => {
    if (user) {
      await fetchUserData(user.uid);
    }
    setCurrentPage("profile");
  };

  if (showStartScreen) {
    return (
      <View style={styles.startScreen}>
        <Text style={styles.appTitle}>My App</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentPage === "login" && (
        <LoginPage
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleAuthentication={handleAuthentication}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "signup" && (
        <SignUpPage
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          cpassword={cpassword}
          setcPassword={setcPassword}
          handleAuthentication={handleAuthentication}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "characters" && (
        <AuthenticatedScreen
          user={user}
          handleAuthentication={handleAuthentication}
          navigateToProfile={handleNavigateToProfile}
        />
      )}
      {currentPage === "profile" && (
        <Profile
          user={userData} // Pass userData directly to user prop
          handleAuthentication={handleAuthentication}
          navigateBack={() => setCurrentPage("characters")}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  startScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343a40",
  },
  appTitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default App;
