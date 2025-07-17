import moment from "moment";
import { handleErrors } from "../utils/appError.js";
import { NOTIFICATION_ASSOCIATION_MEETING } from "../constants/notificationType.js";
import { sendEMail } from "../constants/mailservices.js";
import { APP_URL } from "../config.js";

export async function createNotification(req, res, next) {
  try {
    const {
      isOneMail,
      notificationType,
      body,
      date,
      startTime,
      endTime,
      venue,
      emailList,
      file,
      isVoting,
      userDatas,
      notification,
    } = req.body;

    if (notificationType == NOTIFICATION_ASSOCIATION_MEETING) {
      const emailContent = `
                <p>${body}</p>
                <p>Date:${moment(date).format("DD-MMM-YYYY")}</p>
                <p>Start Time:${startTime}</p>
                <p>End Time:${endTime}</p>
                <p>Venue:${venue}</p>
                `;
      sendEMail(
        NOTIFICATION_ASSOCIATION_MEETING + " Notification",
        emailList,
        emailContent,
        file ? [{ filename: file.originalname, content: file.buffer }] : []
      );
    }

    if (isVoting) {
      var NEW_URL = APP_URL + "/mail/notification-voting";

      userDatas?.forEach(async (element) => {
        const acceptUrl = `${NEW_URL}?notificationId=${notification?._id}&userId=${element?._id}&status=Accept`;
        const declineUrl = `${NEW_URL}?notificationId=${notification?._id}&userId=${element?._id}&status=Decline`;
        const tentativeUrl = `${NEW_URL}?notificationId=${notification?._id}&userId=${element?._id}&status=Tentative`;
        const emailContent = `
                      <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: auto; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
                          <h2 style="color: #333;">Your Voting</h2>
                          <p>Hello,</p>
                          <p>${title}</p>
                          <div style="text-align: center; margin: 20px 0;">
                              <a href="${acceptUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Accept</a>
                              <a href="${declineUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px; background-color: #dc3545; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Decline</a>
                              <a href="${tentativeUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px; background-color: #ac921d; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Tentative</a>
                          </div>
                          <p style="font-size: 12px; color: #666;">If you did not request this email, you can safely ignore it.</p>
                          <p style="font-size: 12px; color: #666;">Thank you!</p>
                      </div>
                  `;
        await sendEMail(
          "Voting for Meeting",
          "seyoneprojects@gmail.com",
          emailContent
        );
      });
    }

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
