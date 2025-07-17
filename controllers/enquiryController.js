import Association from "../models/associationModel.js";
import moment from "moment";
import Enquiry from "../models/enquiryModel.js";
import { sendEMail } from "../constants/mailservices.js";
import { handleErrors } from "../utils/appError.js";

export async function createEnquiry(req, res, next) {
  try {
    const { isOneMail, name, email, description } = req.body;
    const association = await Association.findOne({});

    const emailContent = `
                <p>Dear ${name},</p>
                <br/>

                <p>Thank you for contacting us through our website's Contact Us page. We’ve received your inquiry and are currently reviewing it.</p>
                <p>

                <br/>
                <b>Here’s a summary of your message:</b><br/>
                <b>Name :</b> ${name}<br/>
                <b>Email :</b> ${email} <br/>
                <b>Description :</b> ${description} <br/>
                </p>
                <b>Message:</b>
                <p>
                We aim to respond to all inquiries within [timeframe, e.g., "24-48 hours"]. If your matter is urgent, please don’t hesitate to reach us directly at ${association?.contactNumber} or ${association?.email}.
                </p>

                <p>In the meantime, feel free to browse our Events and Ads section </p>

                <p>Thank you for giving us the opportunity to assist you. We’ll be in touch shortly!</p>
               <br/> <br/>
                <p>
                                Warm regards,</br>
                ${association?.name}</br>
               ${association?.email}/${association?.contactNumber}.
                </p>
              `;

    await sendEMail(
      `Thank You for Reaching Out to Us! - ${association?.name}`,
      "lakshmananmca003@gmail.com",
      emailContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
