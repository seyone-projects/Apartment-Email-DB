import { APP_URL } from "../config.js";
import { sendEMail } from "../constants/mailservices.js";
import Association from "../models/associationModel.js";
import { handleErrors } from "../utils/appError.js";

export async function signUp(req, res, next) {
  try {
    const { isOneMail, name, otp, toMail } = req.body;
    const association = await Association.findOne({});
    const otpEmailContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Your One-Time Password (OTP) for ${association?.name} Login</title>
          </head>
          <body>
              <p>Dear ${name},</p>
              <p>Welcome to ${association?.name}</p>
              <p>To complete your login process, please use the following One-Time Password (OTP). This OTP is valid for the next 120 seconds.</p>
              <p><strong>Your OTP is: ${otp}</strong></p>
              <p>Please enter this OTP on the login page to access your account. If you did not request this OTP, please disregard this email.</p>
              <p>For security reasons, please do not share this OTP with anyone. If you need any assistance or have any questions, feel free to contact our support team at support@apartmentassociation.com.</p>
              <p>Thank you for being a part of our community!</p>
              <p>Best regards,</p>
              <p>${association?.name}</p>
              <p><strong>${APP_URL}</strong></p>
          </body>
          </html>
        `;
    var mailSubject = `Your One-Time Password (OTP) for ${association?.name} Login`;
    if (mailSubject && otpEmailContent)
      var mailResponse = await sendEMail(mailSubject, toMail, otpEmailContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
