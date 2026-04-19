import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Google Sign In
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Sign Out
export async function logOut() {
  await signOut(auth);
}

// Save a study session to Firestore
export async function saveSession(userId, topic, data, quizScore) {
  await addDoc(collection(db, "sessions"), {
    userId,
    topic,
    cleanNotes: data.cleanNotes,
    flashcards: data.flashcards,
    quiz: data.quiz,
    quizScore,
    createdAt: serverTimestamp(),
  });
}

// Get all sessions for a user
export async function getUserSessions(userId) {
  const q = query(
    collection(db, "sessions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}