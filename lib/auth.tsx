import React, { createContext, useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFBoKdBrMb97BWSlbVOWgSaid7dKjxpGs",
  authDomain: "vyoma-afa38.firebaseapp.com",
  projectId: "vyoma-afa38",
  storageBucket: "vyoma-afa38.appspot.com",
  messagingSenderId: "880852694456",
  appId: "1:880852694456:web:5f4f3ee888d4cc27adcb4d",
};

// Initialize Firebase
let app;
let auth;

try {
  // Initialize Firebase with the hardcoded config values
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Provide a mock auth object to prevent app crashes
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: () =>
      Promise.reject(new Error("Firebase not initialized")),
    createUserWithEmailAndPassword: () =>
      Promise.reject(new Error("Firebase not initialized")),
    signOut: () => Promise.resolve(),
    sendPasswordResetEmail: () =>
      Promise.reject(new Error("Firebase not initialized")),
  } as any;
}

type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount and listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update user profile with full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName,
          // Note: Firebase Auth doesn't have a built-in field for phone number
          // You might want to store this in a separate database like Firestore
        });

        // You can store additional user data in Firestore or another database
        // For example:
        // await addDoc(collection(db, "users"), {
        //   uid: userCredential.user.uid,
        //   email,
        //   fullName,
        //   phone,
        //   createdAt: new Date(),
        // });
      }

      return { error: null };
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await signInWithCredential(auth, googleCredential);
      return { error: null };
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      return { error };
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      if (Platform.OS === "web") {
        // Web implementation
        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
        setRecaptchaVerifier(verifier);
        const provider = new PhoneAuthProvider(auth);
        const verificationId = await provider.verifyPhoneNumber(
          phoneNumber,
          verifier,
        );
        return { verificationId, error: null };
      } else {
        // Native implementation would require react-native-firebase
        // This is a simplified version
        console.log("Phone authentication initiated for:", phoneNumber);
        // In a real implementation, you would use @react-native-firebase/auth here
        return { verificationId: "mock-verification-id", error: null };
      }
    } catch (error: any) {
      console.error("Phone Sign-In Error:", error);
      return { verificationId: "", error };
    }
  };

  const confirmPhoneCode = async (verificationId: string, code: string) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      return { error: null };
    } catch (error: any) {
      console.error("Phone verification error:", error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithPhone,
        confirmPhoneCode,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
