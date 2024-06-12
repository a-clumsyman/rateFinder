import emailjs from "@emailjs/browser";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcRPnQK5AT6kkm06jRQoG94_ED-TYuLXc",
  authDomain: "ratefinder-1488e.firebaseapp.com",
  projectId: "ratefinder-1488e",
  storageBucket: "ratefinder-1488e.appspot.com",
  messagingSenderId: "272640742674",
  appId: "1:272640742674:web:4f9c647ab6a83f1886cfcb",
  measurementId: "G-X391QZP4BW",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

/**
 * Send Mail E-mail JS
 */
export const sendMail = async (data) => {
  try{
    await emailjs.send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
      data,
      {
        publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
      }
    );
  } catch(error){
    throw error
  }
};

/**
 * Save file to firebase
 */

export const uploadFile = async (blob) => {
  const storageRef = storage.ref();
  const pdfRef = storageRef.child(`pdfs/${new Date().getTime()}-form.pdf`);
  await pdfRef.put(blob);
  const downloadURL = await pdfRef.getDownloadURL();
  return downloadURL;
};
