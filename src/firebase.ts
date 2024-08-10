// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const {
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_API_KEY
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "expenses-79b2b.firebaseapp.com",
  projectId: "expenses-79b2b",
  storageBucket: "expenses-79b2b.appspot.com",
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T): DocumentData => {
      return data as unknown as DocumentData;
  },
  fromFirestore: (snap: QueryDocumentSnapshot) => ({ id: snap.id, ...snap.data(), date: snap.data()?.date?.toDate?.() ?? undefined } as T)
});

export default db;
