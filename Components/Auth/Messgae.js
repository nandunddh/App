import { Email } from "./smtp";

export const Messgae = ({ email, name, mobilenumber, message }, callback) => {
  // console.log(email, name, mobilenumber, message);
  try {
    const messagebody = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }

      h1 {
        color: #007bff;
      }

      p {
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Contact Form Details </h1>
      <p>Name : ${name},</p>
      <p>Email : ${email},</p>
      <p>Mobile Number : ${mobilenumber},</p>
      <p>Message : ${message},</p>
      <p>Date: ${Date()}.</p>
    </div>
  </body>
  </html>`;

    Email.send({
      Username: "nandugoud113@gmail.com",
      Password: "AC781B881AC3B360ACFFC638E3AC951181F8",
      // SecureToken: "95009f41-b2ce-4a70-947f-62c2449e5f69",
      Host: "smtp.elasticemail.com",
      To: "nandu-pc2@outlook.com",
      From: "nandugoud113@gmail.com",
      Subject: `Contact Details | USG App ${name}`,
      Body: messagebody,
      Port: 2525,
      tracking_settings: {
        subscription_tracking: {
          enable: false
        }
      }
    })
      .then(() => {

        callback(true);
        alert("Thanks for Contacting USG.\nOur Support team will contact you shortly.");
        // console.log("params", params)
      })
      .catch((err) => console.log("error in smtp", err));
    callback(false);
    return true;
  } catch (error) {
    alert("Error", error);
    return false;
  }
};
