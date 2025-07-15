import nodemailer from "nodemailer";
import axios from "axios";
import Association from "../models/associationModel.js";

import { DEFAULT_EMAIL_ADDRESS, EMAIL_CREDENTIALS } from "../config.js";

async function getBase64Image(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];
    if (!contentType) {
      console.error("Error: Content-Type header not found in response...");
      return null;
    }

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return `data:${contentType};base64,${base64Image}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_CREDENTIALS.user,
//     pass: EMAIL_CREDENTIALS.pass,
//   },
// });

let transporter = nodemailer.createTransport({
    host: "liveezmail.co.in",
    port: 587, 
      secure: false,
    auth: {
    user: EMAIL_CREDENTIALS.user,
     pass: EMAIL_CREDENTIALS.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

export async function sendEMail(subject, toMail, htmlcontent, attachments) {
  const association = await Association.findOne({});

  //   const base64Image = await getBase64Image(association?.logo);

  //   const HEADER = `
  //   <div style="background-color: #0044cc; padding: 20px; text-align: center; color: #ffffff;">
  //       <img src="http://liveez-qa.com.s3-website.ap-south-1.amazonaws.com/assets/mainLogo-9yqXprfp.png"
  //             alt="Company Logo" width="150"
  //             style="display: block; margin: auto; border-radius: 5px;">
  //   </div>
  // `;

  const HEADER = ""; 

  const FOOTER = `
    <div style="background-color: #009688; padding: 20px; color: #ffffff; text-align: center;">
        <p>Warm regards,</p>
        <p><strong>${association?.name}</strong></p>
        <p>${association?.email} | ${association?.contactNumber}</p>
        <p style="font-size: 12px;">&copy; 2025 ${association?.name}. All rights reserved.</p>
    </div>
`;
  const FINAL_HTML = `${HEADER}${htmlcontent}${FOOTER}`;

  return new Promise((resolve, reject) => {
    var mailOptions = {
      from: DEFAULT_EMAIL_ADDRESS,
      to: toMail,
      subject: subject,
      html: FINAL_HTML,
    };
    if (attachments?.length) {
      mailOptions.attachments = attachments;
    }
    transporter.sendMail(mailOptions, async function (error, info) {
      console.log("error.....",error);
      console.log("infor,,,2,,,,,",info)
      if (!error) resolve(true);
      if (error) reject(error);
    });
  });
}
