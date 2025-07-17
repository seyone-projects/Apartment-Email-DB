import moment from "moment";
import { handleErrors } from "../utils/appError.js";
import { sendEMail } from "../constants/mailservices.js";
import Association from "../models/associationModel.js";
import { APP_URL } from "../config.js";

export const paymentMaintenanceVerification = async (req, res) => {
  try {
    const { user, amount } = req.body;

    const association = await Association.findOne({});

    const paymentContent = `      
  <p>Hello, ${user?.name}</p>
  <p>We have successfully received your maintenance payment for <strong>${
    association.name
  }</strong>.</p>
  <p>Thank you for making your payment on time. Your support helps us maintain and improve our community services.</p>
  <p>If you have any questions or concerns, feel free to contact the management committee.</p>
  <p>Payment Details:</p>
  <ul>
    <li><strong>Amount Paid:</strong> ₹${amount}</li>
    <li><strong>Payment Date:</strong> ${moment().format("DD-MMM-YYYY")}</li>
    <li><strong>Invoice No:</strong> Invoice-1000</li>
  </ul>
  <p>Thanks and Regards,</p>
  <p>Admin,<br>
  ${association.name},<br>
  ${association?.address}</p>
  <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
`;

    const mailSubject = `Maintenance Payment Confirmation - ${association?.name}`;
    var mailResponse = await sendEMail(mailSubject, user.email, paymentContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return handleErrors(err, res);
  }
};

export const paymentAmenityVerification = async (req, res) => {
  try {
    const { user } = req.body;
    const association = await Association.findOne({});

    const paymentContent = `      
  <p>Hello, ${user?.name}</p>
  <p>We have successfully received your <strong>amenity booking payment</strong> for <strong>${association.name}</strong>.</p>
  <p>Thank you for using our facility. Your contribution helps us maintain the amenity and provide better services.</p>
  <p>If you have any questions regarding this booking, please feel free to contact the management committee.</p>

  <p><strong>Booking Details:</strong></p>


  <p>Thanks and Regards,</p>
  <p>Admin,<br>
  ${association.name},<br>
  ${association?.address}</p>
  <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
`;

    const mailSubject = `Amenity Payment Confirmation - ${association?.name}`;
    var mailResponse = await sendEMail(mailSubject, user.email, paymentContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return handleErrors(err, res);
  }
};
