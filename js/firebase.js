// Firebase SDK
import { 
initializeApp 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";


import {
getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


import {
getDatabase,
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";


import {
getStorage,
ref as storageRef,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";



const firebaseConfig = {

apiKey: "AIzaSyDTJFiY42avRGMqtKrZB7gPhWL-ASTRh3w",

authDomain: "mybot-d79df.firebaseapp.com",

databaseURL: "https://mybot-d79df-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "mybot-d79df",

storageBucket: "mybot-d79df.firebasestorage.app",

messagingSenderId: "215753443154",

appId: "1:215753443154:web:af883fb18af1d499a15c8b",

measurementId: "G-FYWB6LBG34"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);



export {
ref,
push,
set,
storageRef,
uploadBytes,
getDownloadURL
};
