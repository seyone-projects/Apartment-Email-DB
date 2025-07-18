import { sendEMail } from "../constants/mailservices";

export async function updateDocumentStatus(req, res, next) {
  try {
    const {
      isOneMail,
      status,
      allAccepted,
      allRejeceted,
      userData,
      documentName,
    } = req.body;

    var mailContent = "";
    var mailSubject = "";

    if (status) {
      if (allAccepted) {
        mailContent = `
          <!DOCTYPE html>
          <html>
          <body>
              <p>Dear ${userData.name},</p>
              <p>The Registration has been approved. Kindly login and check - <strong>http://localhost:5173/</strong></p>
              <p>Regards,
              <br>Admin</p>
          </body>
          </html>
        `;
        mailSubject = ` ${userData.name} - ${userData.blockId.blockName} - ${userData.flatId.flatNo} Registration Approved`;
      }
    } else {
      mailContent = `
          <!DOCTYPE html>
          <html>
          <body>
              <p>Dear ${userData.name},</p>
              <p>    The Following document ${documentName} - has been 
              rejected for the reason "Reason Pending". Kindly re-upload the document by loggin in our portal -
               <strong>http://localhost:5173/</strong>  </p>
               <p>Regards,
               <br>Admin</p>
          </body>
          </html>
        `;

      mailSubject = ` ${userData.name} - ${userData.blockId.blockName} - ${userData.flatId.flatNo} ${documentName} Rejected`;

      if (allRejeceted) {
        mailContent = `
              <!DOCTYPE html>
              <html>
              <body>
                  <p>Dear ${userData.name},</p>
                  <p>The Registration has been rejected for the reason Waiting for reason. 
                  Kindly re-update the details by loggin in our portal - <strong>http://localhost:5173/</strong>  </p>
                   <p>Regards,
                   <br>Admin</p>
              </body>
              </html>
            `;

        mailSubject = ` ${userData.name} - ${userData.blockId.blockName} - ${userData.flatId.flatNo} Registration Rejected`;
      }
    }
    if (mailSubject && mailContent)
      var mailResponse = await sendEMail(
        mailSubject,
        userData.email,
        mailContent
      );
    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
