import { sendEMail } from "../constants/mailservices.js";
import { handleErrors } from "../utils/appError.js";
import { APP_URL } from "../config.js";

export async function createMaintenanceConfiguration(req, res) {
  try {
    const { isOneMail, month, emailList } = req.body;

    const emailContent = `
      <p>Dear Resident,</p>
      <br/>
      <p>Greetings!</p>
      <p>We hope this email finds you well. This is a friendly reminder that your maintenance payment for the month of ${month} is due.</p>
      <p>Click on the Link to view your invoice - <a href="${APP_URL}/member/maintenance-payment">View Invoice</a></p>
      <br/>
      <p>To avoid any late fees, please make the payment before the due date. If you have already completed the payment, kindly disregard this message.</p>
      <p>Thanks!</p>
    `;

    await Promise.allSettled(
      emailList.map((email) =>
        sendEMail(
          "Reminder Notification For Maintenance",
          [email],
          emailContent
        )
      )
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
