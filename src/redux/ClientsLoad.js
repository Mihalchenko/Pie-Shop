import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

import { setItems } from "./SortSlice.js"

 export async function clientsLoad (dispatch) {
  const firebaseConfig = {
    apiKey: "AIzaSyAx0Ys2oLTghXecXFt1MhPqL5uL3fyc3dM",
    authDomain: "mihalchenko-fd3-project.firebaseapp.com",
    databaseURL: "https://mihalchenko-fd3-project-default-rtdb.firebaseio.com",
    projectId: "mihalchenko-fd3-project",
    storageBucket: "mihalchenko-fd3-project.appspot.com",
    messagingSenderId: "431587691440",
    appId: "1:431587691440:web:5a4e5dfa30b5f4cf8ce475"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const database = getDatabase(app);
  
  const dbRef = ref(database);
  get(child(dbRef, `/`)).then((snapshot) => {
    if (snapshot.exists()) {
      dispatch(setItems (snapshot.val()));
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error("Возникла ошибка " + error);
  });
 };