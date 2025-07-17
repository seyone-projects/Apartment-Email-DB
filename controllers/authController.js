import { APP_URL } from "../config.js";
import { sendEMail } from "../constants/mailservices.js";
import Association from "../models/associationModel.js";
import { handleErrors } from "../utils/appError.js";
import jwt from "jsonwebtoken";

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

export async function createStaff(req, res, next) {
  try {
    const { isOneMail, name, token, toMail } = req.body;
    const association = await Association.findOne({});

    const emailContent = `  
        <p>Hello ${name},</p>    
        <p>We are delighted to inform you that your sign-up for ${association.name} has been successfully created!</p>
        <p>Welcome to Our Community!</p>
       <p>Click on the Link to login - <p> <a href="${APP_URL}/set-password?token=${token}">${APP_URL}/set-password</a></p>
        <p>Thanks and Regards,</p>
        <p>Admin,<br>
        ${association.name},<br>
        ${association.address1},<br>
        ${association.address2}<br>
        <p>Visit: <a>${APP_URL}</a></p>
      `;
    const subject = "Staff Registration";
    var mailResponse = await sendEMail(subject, toMail, emailContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function validateOTP(req, res, next) {
  try {
    const { isOneMail, updateStatus, token, toMail } = req.body;
    const association = await Association.findOne({});

    const adminEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Approval for ${updateStatus.name} - ${updateStatus.residentType} - ${updateStatus.phoneNumber}</title>
        </head>
        <body>
            <p>We are delighted to inform you that ${updateStatus.name} for ${association?.name} has signed up!</p>
            <p>Name : ${updateStatus?.name}</p>
            <p>Mobile : ${updateStatus?.phoneNumber}</p>
            <p>Email : ${updateStatus?.email}</p>
            <p>Block Number : ${updateStatus?.blockId?.blockName}</p>
            <p>Flat Number : ${updateStatus?.flatId?.flatNo}</p>
            <p>Resident Type : ${updateStatus?.residentType}</p>
            <p>Kindly Approve / Reject by clicking on the portal -<strong>${APP_URL}/admin/request-list/</strong></p>
         
            <p>Regards,
            <br>${association?.name}
            <br>${association?.address}</p>
        </body>
        </html>
        `;

    const customerEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sign Up for ${association?.name} - ${updateStatus.name} - ${updateStatus.residentType}  - ${updateStatus.phoneNumber}</title>
        </head>
        <body>
            <p>We are delighted to inform you that you have signed up for ${association?.name}</p>
            <p>Name : ${updateStatus.name}</p>
            <p>Mobile : ${updateStatus.phoneNumber}</p>
            <p>Email : ${updateStatus.email}</p>
            <p>Block Number : ${updateStatus?.blockId?.blockName}</p>
            <p>Flat Number : ${updateStatus?.flatId?.flatNo}</p>
            <p>Resident Type : ${updateStatus.residentType}</p>
            <p>Admin will approve within 48 hours. Kindly check your status of Approval by clicking the link  <strong>${APP_URL}/pending-approval/</strong>.</p>
            <p>Regards,
            <br>${association?.name}
            <br>${association?.address}</p>
        </body>
        </html>
        `;

    var mailSubject = `Approval for ${updateStatus.name} - ${updateStatus.residentType} - ${updateStatus.phoneNumber}`;
    var mailResponse1 = await sendEMail(
      mailSubject,
      DEFAULT_ADMIN_USER,
      adminEmailContent
    );
    var mailResponse2 = await sendEMail(
      `Sign Up for ${association?.name} - ${updateStatus.name} - ${updateStatus.residentType} - ${updateStatus.phoneNumber}`,
      updateStatus.email,
      customerEmailContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function updateTenantStatus(req, res, next) {
  try {
    const { isOneMail, userData, token, status, reason } = req.body;
    const association = await Association.findOne({});

    if (status === true) {
      const resetContent = `      
      <p>Hello, ${userData?.name}</p>
      <p>We received a request to reset your password for your account at <strong>${association.name}</strong>.</p>
      <p>Click the link below to set a new password:</p>
      <p><a href="${APP_URL}/set-password?token=${token}">${APP_URL}/set-password</a></p>
      <p>This link will expire in 24 hours for security purposes.</p>
      <p>Thanks and Regards,</p>
      <p>Admin,<br>
      ${association.name},<br>
      ${association?.address}<br></p>
      <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
    `;

      var mailSubject = `Reset Password for ${association?.name} Login`;
      var mailResponse = await sendEMail(
        mailSubject,
        userData?.email,
        resetContent
      );
    }

    if (status === false) {
      const blockTenantEmail = `      
      <p>Hello, ${userData?.name}</p>
      <p>We want to inform you that your access to the premises of <strong>${association.name}</strong> has been restricted.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>This action was taken by the property owner, and you may no longer have access to certain facilities or services.</p>
      <p>If you believe this is a mistake or need further clarification, please contact the owner or the association management.</p>
      <p>Thanks and Regards,</p>
      <p>Admin,<br>
      ${association.name},<br>
      ${association?.address}<br></p>
      <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
    `;

      var mailSubject = `Account suspended for ${association?.name}`;
      var mailResponse = await sendEMail(
        mailSubject,
        userData?.email,
        blockTenantEmail
      );
    }

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function updateDocumentStatus(req, res, next) {
  try {
    const { isOneMail, status, allAccepted, userData } = req.body;
    const association = await Association.findOne({});

    let mailContent = "";
    let mailSubject = "";

    if (status) {
      // Document accepted
      if (allAccepted) {
        mailContent = `
          <!DOCTYPE html>
          <html>
          <body>
              <p>Dear ${userData.name},</p>
              <p>The Registration has been approved. Kindly login and check - <strong>${APP_URL}</strong></p>
              <p>Regards,<br>Admin</p>
          </body>
          </html>
        `;
        mailSubject = `${userData.name} - ${
          userData.blockId?.blockName || ""
        } - ${userData.flatId?.flatNo || ""} Registration Approved`;

        // Update flat as booked
        await Flat.findByIdAndUpdate(userData?.flatId?._id, { isBooked: true });
      }
    } else {
      // Document rejected
      mailContent = `
        <!DOCTYPE html>
        <html>
        <body>
            <p>Dear ${userData.name},</p>
            <p>The following document "${getDocumentLabel(
              documentType
            )}" has been rejected for the reason "Reason Pending". 
            Kindly re-upload the document by logging into our portal - <strong>${APP_URL}</strong></p>
            <p>Regards,<br>Admin</p>
        </body>
        </html>
      `;

      mailSubject = `${userData.name} - ${userData?.blockId?.blockName} - ${
        userData?.flatId?.flatNo
      } ${getDocumentLabel(documentType)} Rejected`;

      if (allRejected) {
        mailContent = `
          <!DOCTYPE html>
          <html>
          <body>
              <p>Dear ${userData.name},</p>
              <p>The Registration has been rejected for the reason "Waiting for reason".
              Kindly re-update the details by logging into our portal - <strong>${APP_URL}</strong></p>
              <p>Regards,<br>Admin</p>
          </body>
          </html>
        `;

        mailSubject = `${userData.name} - ${userData.blockId.blockName} - ${userData.flatId.flatNo} Registration Rejected`;
      }
    }

    if (mailSubject && mailContent) {
      await sendEMail(mailSubject, userData.email, mailContent);
    }

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function updateUserStatus(req, res, next) {
  try {
    const { isOneMail, updateUserData, data, toMail } = req.body;
    const association = await Association.findOne({});

    const approvedContent = `      
      <p>We are delighted to inform you that your sign-up for ${association.name} has been successfully approved!</p>
      <p>Welcome to Our Community!</p>
     <p>Click on the Link to login - <p> <a href="${APP_URL}/set-password?token=${updateUserData?.sessionToken}">${APP_URL}/set-password</a></p>
      <p>Thanks and Regards,</p>
      <p>Admin,<br>
      ${association.name},<br>
      ${association.address}<br>
      <p>Visit: <a>${APP_URL}</a></p>
    `;

    const rejectedContent = data.status
      ? ""
      : `
    <!DOCTYPE html>
    <html>
    <body>
        <p>Dear ${updateUserData.name},</p>
        <p>The following documents have been rejected for the given reasons:</p>
        <ul>
            ${data.reasonData
              .map(
                (item) =>
                  `<li><strong>${item.document}</strong>: ${item.reason}</li>`
              )
              .join("")}
        </ul>
        <p>Kindly re-upload the documents by logging into our portal - 
        <a href="${APP_URL}">Link</a></p>
        <p>Regards,<br>Admin</p>
    </body>
    </html>
    `;

    const approveSubject = `${updateUserData.name} - ${updateUserData.phoneNumber} - Welcome to ${association?.name}`;
    const rejectSubject = `${updateUserData.name} - ${updateUserData.phoneNumber} - Rejected for ${association?.name}`;
    var subject = data.status ? approveSubject : rejectSubject;

    var mailResponse = await sendEMail(
      subject,
      updateUserData.email,
      data.status ? approvedContent : rejectedContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { isOneMail, user, token, toMail } = req.body;
    const association = await Association.findOne({});

    const resetContent = `      
    <p>Hello, ${user.name}</p>
    <p>We received a request to reset your password for your account at <strong>${association.name}</strong>.</p>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    <p>Otherwise, click the link below to set a new password:</p>
    <p><a href="${APP_URL}/set-password?token=${token}">${APP_URL}/set-password</a></p>
    <p>This link will expire in 24 hours for security purposes.</p>
    <p>Thanks and Regards,</p>
    <p>Admin,<br>
    ${association.name},<br>
    <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
  `;

    const subject = `Forgot password`;
    var mailResponse = await sendEMail(subject, user.email, resetContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function reVerifyTrigger(req, res, next) {
  try {
    const { isOneMail, updateData, otp, toMail } = req.body;
    const association = await Association.findOne({});

    const otpEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your One-Time Password (OTP) for ${association?.name} Login</title>
        </head>
        <body>
            <p>Dear ${updateData.name},</p>
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
      var mailResponse = await sendEMail(
        mailSubject,
        updateData.email,
        otpEmailContent
      );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function resendOtp(req, res, next) {
  try {
    const { isOneMail, updateData, otp, toMail } = req.body;
    const association = await Association.findOne({});

    const otpEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your One-Time Password (OTP) for ${association?.name} Login</title>
        </head>
        <body>
            <p>Dear ${updateData.name},</p>
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
      var mailResponse = await sendEMail(
        mailSubject,
        updateData.email,
        otpEmailContent
      );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function deactivateUser(req, res, next) {
  try {
    const { isOneMail, updateUserData } = req.body;
    const association = await Association.findOne({});

    const deactivateEmailContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Account Deactivation Notification</title>
  </head>
  <body>
      <p>Dear ${updateUserData.name},</p>
      <p>We hope this message finds you well.</p>
      <p>Please be informed that your account on the ${association?.name} Portal has been deactivated.</p>
      <p>If you believe this is an error or need further assistance, kindly reach out to us at [Contact Information].</p>
      <p>We appreciate your involvement and thank you for being a part of our community.</p>
      <p>Best regards,</p>
      <p>[Your Name]</p>
      <p>${association?.name}</p>
  </body>
  </html>
`;

    const mailSubject = `${updateUserData.name} - has been removed from [Aparment Name]`;
    const recipientEmail = updateUserData.email;

    // Sending the email
    const mailResponse = await sendEMail(
      mailSubject,
      recipientEmail,
      deactivateEmailContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function createBulkUpload(req, res, next) {
  try {
    const { isOneMail, result, secret, toMail } = req.body;
    const association = await Association.findOne({});

    for (const data of result) {
      if (data?.email) {
        const token = jwt.sign(
          {
            id: data?._id,
            name: data?.name,
            phoneNumber: data?.phoneNumber,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        const resetContent = `      
        <p>Hello, ${data?.name}</p>
        <p>We received a request to reset your password for your account at <strong>${association.name}</strong>.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Otherwise, click the link below to set a new password:</p>
        <p><a href="${APP_URL}/set-password?token=${token}">${APP_URL}/set-password</a></p>
        <p>This link will expire in 24 hours for security purposes.</p>
        <p>Thanks and Regards,</p>
        <p>Admin,<br>
        ${association.name},<br>
        ${association?.address}<br></p>
        <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
      `;
        var mailSubject = `Your One-Time Password (OTP) for ${association?.name} Login`;
        var mailResponse = await sendEMail(
          mailSubject,
          data.email,
          resetContent
        );
      }
    }

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function updateEmailId(req, res, next) {
  try {
    const { isOneMail, isUser, token, toMail } = req.body;
    const association = await Association.findOne({});
 
       const resetContent = `      
    <p>Hello, ${isUser?.name}</p>
    <p>We received a request to reset your password for your account at <strong>${association.name}</strong>.</p>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    <p>Otherwise, click the link below to set a new password:</p>
    <p><a href="${APP_URL}/set-password?token=${token}">${APP_URL}/set-password</a></p>
    <p>This link will expire in 24 hours for security purposes.</p>
    <p>Thanks and Regards,</p>
    <p>Admin,<br>
    ${association.name},<br>
    ${association?.address}<br></p>
    <p>Visit: <a href="${APP_URL}">${APP_URL}</a></p>
  `;
    var mailSubject = `Your One-Time Password (OTP) for ${association?.name} Login`;
    var mailResponse = await sendEMail(mailSubject, toMail, resetContent);

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}