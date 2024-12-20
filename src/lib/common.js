import emailjs from "@emailjs/browser";

/**
 * Send Mail E-mail JS
 */
export const sendMail = async (data) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
      data,
      {
        publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
      }
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Save file locally (temporary solution)
 */
export const uploadFile = async (blob) => {
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);
  return url;
};
