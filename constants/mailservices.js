import nodemailer from "nodemailer";
import axios from "axios";
import Association from "../models/associationModel.js";
import EmailFailedLog from "../models/emailFailedLogModel.js";
import validator from 'validator';

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
    // return resolve(true);
    transporter.sendMail(mailOptions, async function (error, info) {
      console.log("error 77,,,,",info)
      if (!error) {
        resolve(true);
      }
      try {
        console.log("error.....3..",error)
        const safeError = {
          message: error?.message,
          stack: error?.stack,
          code: error?.code,
          raw: error ? JSON.stringify(error) : null
        };

        await EmailFailedLog.create({
          to: toMail,
          subject: subject,
          content: FINAL_HTML,
          attachments: attachments || [],
          error: safeError,
          association: association?._id,
          attemptTime: new Date()
        });

        

        console.error(
          "Email failed and saved to failed emails collection:",
          error
        );
        reject(error);
      } catch (dbError) {
       console.error("Failed to save failed email to database:", {
          dbError: dbError?.message || dbError,
          originalError: error?.message || error
        });
        reject(error || dbError);
      }
    });
  });
}
