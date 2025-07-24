import Association from "../models/associationModel.js";
import moment from "moment";
import { sendEMail } from "../constants/mailservices.js";
import { handleErrors } from "../utils/appError.js";

export async function createTicket(req, res, next) {
  try {
    const { issueType, ticketDetails, natureOfIssue } = req.body;

    const association = await Association.findOne({});

    var mailContent = `
          <html>
          <body>
              <p>Dear ${ticketDetails?.userId?.name},</p>
              <p>Thank you for reaching out to us. We have received your ticket regarding the ${
                ticketDetails?.issueType
              } issue in your apartment (${
      ticketDetails?.userId?.blockId?.blockName +
      "-" +
      ticketDetails?.userId?.flatId?.flatNo
    }). Your concern is important to us, and we are committed to resolving it as quickly as possible.</p>
              <br/>
              <b>Ticket Details:</b>
              <ul>
              <li>Ticket ID: ${ticketDetails?.ticketDetailsId}</li>
              <li>Issue Type: ${ticketDetails?.issueType}</li>
              <li>Nature of Issue : ${ticketDetails?.natureOfIssue}</li>
              <li>Description: ${ticketDetails?.description}</li>
              <li>Date Submitted: ${moment(ticketDetails?.createdAt).format(
                "DD-MM-YYYY"
              )}</li>
              </ul>
              <br/>
              <p>Our maintenance team will review your request and schedule a visit to your apartment at the earliest convenience. You will be notified in advance of the scheduled visit.</p>
             ${
               ticketDetails?.natureOfIssue == "Plumbing"
                 ? "<p>For Plumbing Issues: If you notice a significant leak or flooding, please use the shutoff valve if safe to do so and contact our emergency services at [Emergency Contact Number].</p>"
                 : ""
             }
          ${
            ticketDetails?.natureOfIssue == "Electrician"
              ? "<p>For Electrical Issues: If the issue is urgent (e.g., power outage or exposed wiring), please call our emergency hotline immediately at [Emergency Contact Number].</p>"
              : ""
          }
              <p>We appreciate your patience as we work to resolve this matter. If you have any additional information or concerns, please reply to this email, and our team will assist you further.</p>
              <p></p>
              <p>Best Regards,</p>
              <p>[Your Name]</p>
              <p>[Your Position]</p>
              <p>${association?.name}</p>
              <p>${association?.address}</p>
              <p>${association?.contactNumber}</p>
          </body>
          </html>
      `;

    var mailSubject = `Ticket Confirmation: ${natureOfIssue} Reported`;
    var mailResponse = await sendEMail(
      mailSubject,
      ticketDetails?.userId?.email,
      mailContent
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return handleErrors(err, res);
  }
}
export async function updateTicket(req, res, next){
  try{
    const association = await Association.findOne({});
        var mailContent = `

        <html>
            <body>

                <p>Dear ${obj?.userId?.name},</p>

                <b>Ticket Details:</b>

                <ul>
                    <li>Ticket ID: ${obj?.ticketDetailsId}</li>
                    <li>Issue Type: ${obj?.issueType}</li>
                    <li>Nature of Issue : ${obj?.natureOfIssue}</li>
                    <li>Description: ${obj?.description}</li>
                    <li>Date Submitted: ${moment(obj?.createdAt).format(
                      "DD-MM-YYYY"
                    )}</li>
                    <li>Status: ${
                      obj?.status === "R"
                        ? "Requested"
                        : obj?.status === "C"
                        ? "Completed"
                        : obj?.status === "P"
                        ? "Processing"
                        : ""
                    }</li>
                </ul>
                <br />

                <p>We appreciate your patience as we work to resolve this matter.
                    If you have any additional information or concerns, please create fresh ticket or call us</p>

                <p>Best Regards,</p>

                <p>[Your Name]</p>
                <p>[Your Position]</p>
                <p>${association?.name}</p>
                <p>[Contact Information]</p>

            </body>
        </html>
    `;
        var mailSubject = `Ticket Confirmation: ${obj?.natureOfIssue} Status Update`;
        var mailResponse = await sendEMail(
          mailSubject,
          obj?.userId?.email,
          mailContent
        );

  return res.status(200).json({ status: true });

  }catch(err){
     return handleErrors(err, res);
  }
}
