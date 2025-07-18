import { sendEMail } from "../constants/mailservices";

function getEmails(users) {
  return users.map((user) => user.email);
}

export async function updatePettyCashLimit(req, res, next) {
  try {
    const { isOneMail, userData, newContent, emailList } = req.body;

    const emailContent = `
        <p>Dear Admin,</p>
        <br/>
        <p>Greetings!</p>
        <p>Bank account details page has been modified by ${userData?.name} - ${userData?.role}.</p>
        ${newContent}
        <br/>
        <p>Thanks!</p>
      `;

    await Promise.allSettled(
      emailList.map((email) =>
        sendEMail("Bank details updated notification", [email], emailContent)
      )
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function updateAmount(req, res, next) {
  try {
    const { isOneMail, userData, newContent, users } = req.body;

    const emailContent = `
        <p>Dear Admin,</p>
        <br/>
        <p>Greetings!</p>
        <p>Bank account details page has been modified by ${userData?.name} - ${userData?.role}.</p>
        ${newContent}
        <br/>
        <p>Thanks!</p>
      `;
    await sendEMail(
      "Account amount updated notification",
      users?.email,
      emailContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
