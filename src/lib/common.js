import emailjs from "@emailjs/browser";

/**
 * Send Mail E-mail JS
 */
const sendMail = (data) => {
  emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
      data,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
      }
    )
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};

/** 
 * Save file to firebase
 */
