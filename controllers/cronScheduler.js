import cron from "node-cron";
import User from "../models/userModal.js";
import Notification from "../models/notificationModel.js";
import NotificationSummary from "../models/notificationSummary.js";
import Product from "../models/productWarrantyModel.js";
import Association from "../models/associationModel.js";
import { MaintenanceConfiguration } from "../models/maintenanceConfigurationModel.js";
import { sendEMail } from "../constants/mailservices.js";
import moment from "moment";
import xlsx from "xlsx";
import fs from "fs";
import { EC, MC, OWNER, SUPER_ADMIN } from "../constants/roles.js";
import Flat from "../models/flatModal.js";
import {
  NOTIFICATION_ASSOCIATION_MEETING,
  NOTIFICATION_PAYMENT_DUES_TYPES,
  NOTIFICATION_PAYMENT_REMINDER_TYPES,
  NOTIFICATION_EMAIL_TYPE_RECURRING,
  NOTIFICATION_TO_ADMIN,
  NOTIFICATION_TO_ALL_MEMBER,
  NOTIFICATION_TO_ALL_OWNER,
  NOTIFICATION_TO_SPECIFIC,
  RECURRING_TYPE_DAILY,
  RECURRING_TYPE_MONTHLY,
  RECURRING_TYPE_WEEKLY,
  NOTIFICATION_TO_MC_EC,
  NOTIFICATION_TO_IFM,
} from "../constants/notificationType.js";
import { sendUnpaidEmail } from "../utils/promises.js";
// import { createNotificationSummary } from "./notificationController.js";
import MaintenanceOption from "../models/maintenanceOptionModel.js";
import { sendNotification } from "./popnotification/popnotificationController.js";

export default function startCronJob() {
  // cron.schedule('0 0 * * *', () => { // triggered at midnight
  //     console.log('Task triggered at midnight:', new Date());
  // });

  // cron.schedule('*/10 * * * * *', async () => {

  const sendMailForPaymentDues = async (_id, date) => {
    try {
      const response = await MaintenanceConfiguration.aggregate([
        {
          $match: {
            isPaid: false,
          },
        },
        {
          $lookup: {
            from: "maintenances",
            localField: "maintenanceId",
            foreignField: "_id",
            as: "maintenanceData",
          },
        },
        {
          $unwind: {
            path: "$maintenanceData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "flats",
            localField: "flatId",
            foreignField: "_id",
            as: "flatsData",
          },
        },
        {
          $unwind: {
            path: "$flatsData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "blocks",
            localField: "flatsData.blockId",
            foreignField: "_id",
            as: "blockData",
          },
        },
        {
          $unwind: {
            path: "$blockData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "flatsData._id",
            foreignField: "flatId",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            userName: "$userData.name",
            email: "$userData.email",
            endDate: "$maintenanceData.endDate",
            isPaid: 1,
          },
        },
      ]).exec();
      const association = await Association.findOne({});
      response?.forEach(async (element) => {
        if (!element.isPaid && element.email) {
          await sendUnpaidEmail(
            element.userName,
            element.email,
            association?.name,
            element?.endDate
          );
        }
      });
      // await createNotificationSummary(_id, date);
    } catch (e) {
      // console.log(e);
    }
  };

  function getEmails(users) {
    return users.map((user) => user.email);
  }

  const sendMailMeeting = async (
    _id,
    body,
    date,
    startTime,
    endTime,
    venue,
    emailList
  ) => {
    const emailContent = `
        <p>${body}</p>
        <p>Date:${moment(date).format("DD-MMM-YYYY")}</p>
        <p>Start Time:${startTime}</p>
        <p>End Time:${endTime}</p>
        <p>Venue:${venue}</p>
        `;
    await sendEMail(
      NOTIFICATION_ASSOCIATION_MEETING + " Notification",
      emailList,
      emailContent
    );
    // await createNotificationSummary(_id, date);
  };
  // cron.schedule('*/10 * * * * *', async () => {

  //  cron.schedule('0 0 * * *', async () => { // triggered at midnight

  //  cron.schedule('* * * * *', async () => { // triggered at every minutes

  cron.schedule("0 0 * * *", async () => {
    // triggered at midnight

    try {
      const notifications = await Notification.find({
        emailType: NOTIFICATION_EMAIL_TYPE_RECURRING,
      });
      notifications.forEach(async (notification) => {
        const {
          _id,
          recurringDay,
          notificationType,
          body,
          date,
          startTime,
          endTime,
          emailType,
          recurringFrequency,
          recurringDate,
          isDone,
          notificationTo,
          venue,
          specificDoors,
        } = notification;

        let today;
        if (recurringFrequency === RECURRING_TYPE_MONTHLY) {
          today =
            moment(new Date()).format("DD") ==
            moment(new Date(recurringDate)).format("DD");
        }

        const todayDay = moment().format("dddd");
        let userFilter = {};
        let toRoles = [];
        if (notificationTo == NOTIFICATION_TO_ADMIN) {
          userFilter.role = SUPER_ADMIN;
          toRoles = [SUPER_ADMIN];
        }
        if (notificationTo == NOTIFICATION_TO_MC_EC) {
          userFilter = {
            $or: [{ role: EC }, { role: MC }],
          };
          toRoles = [EC, MC];
        }
        if (notificationTo == NOTIFICATION_TO_IFM) {
          userFilter.role = IFM;
          toRoles = [IFM];
        }

        if (notificationTo == NOTIFICATION_TO_SPECIFIC) {
          // const flats = await Flat.find({ doorNumber: { $in: specificDoors } });
          // const flatIds = flats.map((f) => f._id);
          // const specificUsers = await User.find({
          //   flatId: { $in: flatIds },
          //   isActive: true,
          // });
          // const specificUserIds = specificUsers.map((u) => u._id);

          await sendNotification({
            referenceId: notification._id,
            type: "general_notification",
            icon: "📢",
            heading: "Notification",
            shortDesc: "Notification",
            sentBy: notification.createdBy,
            targetUsers: specificDoors,
          });
        }
        if (notificationTo == NOTIFICATION_TO_ALL_MEMBER) {
          toRoles = [OWNER, RENTAL];
        }
        if (notificationTo == NOTIFICATION_TO_ALL_OWNER) {
          userFilter.role = OWNER;
          toRoles = [OWNER];
        }

        if (toRoles.length > 0) {
          await sendNotification({
            referenceId: notification._id,
            type: "general_notification",
            icon: "📢",
            heading: "Notification",
            shortDesc: "Notification",
            sentBy: notification.createdBy,
            toUsers: toRoles,
          });
        }
        const userList = await User.find(userFilter);
        const emailList = getEmails(userList);

        if (notificationType == NOTIFICATION_PAYMENT_DUES_TYPES) {
          if (recurringFrequency === RECURRING_TYPE_DAILY) {
            await sendMailForPaymentDues(_id, date);
          } else if (recurringFrequency === RECURRING_TYPE_MONTHLY && today) {
            await sendMailForPaymentDues(_id, date);
          } else if (
            recurringFrequency === RECURRING_TYPE_WEEKLY &&
            recurringDay == todayDay
          ) {
            await sendMailForPaymentDues(_id, date);
          }
        }
        if (notificationType == NOTIFICATION_PAYMENT_REMINDER_TYPES) {
          if (recurringFrequency === RECURRING_TYPE_DAILY) {
            await sendMailForPaymentDues(_id, date);
          } else if (recurringFrequency === RECURRING_TYPE_MONTHLY && today) {
            await sendMailForPaymentDues(_id, date);
          } else if (
            recurringFrequency === RECURRING_TYPE_WEEKLY &&
            recurringDay == todayDay
          ) {
            await sendMailForPaymentDues(_id, date);
          }
        }
        if (notificationType == NOTIFICATION_ASSOCIATION_MEETING) {
          if (recurringFrequency === RECURRING_TYPE_DAILY) {
            await sendMailMeeting(
              _id,
              body,
              date,
              startTime,
              endTime,
              venue,
              emailList
            );
          } else if (recurringFrequency === RECURRING_TYPE_MONTHLY && today) {
            await sendMailMeeting(
              _id,
              body,
              date,
              startTime,
              endTime,
              venue,
              emailList
            );
          } else if (
            recurringFrequency === RECURRING_TYPE_WEEKLY &&
            recurringDay == todayDay
          ) {
            await sendMailMeeting(
              _id,
              body,
              date,
              startTime,
              endTime,
              venue,
              emailList
            );
          }
        }
      });
    } catch (e) {}
  });

  cron.schedule("* * * * *", async () => {
    // triggered at every minutes
    try {
      const isExist = await User.find({
        role: OWNER,
        isEmailVerified: false,
        autoDeleteTime: { $lt: Date.now() },
      });

      if (isExist.length > 0) {
        const result = await User.deleteMany({
          isEmailVerified: false,
          autoDeleteTime: { $lt: Date.now() },
        });

        await Promise.all(
          isExist.map((user) =>
            Flat.findByIdAndUpdate(user?.flatId?.toString(), {
              isBooked: false,
            })
          )
        );
      } else {
        // console.log("No users found for deletion.");
      }
    } catch (error) {
      // console.error("Error occurred:", error.message);
    }
  });

  // Method: send mail to specific users who all are not paid amount
  // cron.schedule('*/10 * * * * *', async () => { // for testing: run it for every 10 sec
  cron.schedule("0 0 1 * *", async () => {
    // Runs every first day of month
    // const { date } = req.body;
    // if (!date) {
    //     return res.status(400).json({ status: false, message: 'Required year and month' });
    // }

    // const splitted = date.split("-");
    // const year = splitted[0];
    // const month = splitted[1];
    // const startDate = new Date(year, month - 1, 1);
    // const endDate = new Date(year, month, 1);

    const response = await MaintenanceConfiguration.aggregate([
      {
        $match: {
          // createdAt: {
          //     $gte: startDate,
          //     $lt: endDate
          // }
          isPaid: false,
        },
      },
      {
        $lookup: {
          from: "maintenances",
          localField: "maintenanceId",
          foreignField: "_id",
          as: "maintenanceData",
        },
      },
      {
        $unwind: {
          path: "$maintenanceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "flats",
          localField: "flatId",
          foreignField: "_id",
          as: "flatsData",
        },
      },
      {
        $unwind: {
          path: "$flatsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          flatsData: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "flatsData.blockId",
          foreignField: "_id",
          as: "blockData",
        },
      },
      {
        $unwind: {
          path: "$blockData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "flatsData._id",
          foreignField: "flatId",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          flatNo: "$flatsData.flatNo",
          blockName: "$blockData.blockName",
          userName: "$userData.name",
          email: "$userData.email",
          squareFeet: "$flatsData.squareFeet",
          maintenanceAmount: 1,
          createdAt: 1,
          shortName: "$maintenanceData.shortName",
          flatType: "$flatsData.isBooked",
          isPaid: 1,
          paidAt: {
            $cond: {
              if: { $eq: ["$paidAt", null] },
              then: null,
              else: "$paidAt",
            },
          },
        },
      },
    ]).exec();

    response?.forEach(async (element) => {
      if (element?.email) {
        const association = await Association.findOne({});
        const emailContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Your One-Time Password (OTP) for ${
                          association?.name
                        } Login</title>
                    </head>
                    <body>
                        <p>Dear ${element.userName},</p>
                        <p>Kindly make the payment of ${
                          element.maintenanceAmount
                        } for the ${moment(element.createdAt).format(
          "MMMM"
        )} on or before 10th of the ${moment(element.createdAt).format(
          "MMMM"
        )}.</p>
                        <p>Thank you for being a part of our community!</p>
                        <p>Regards,</p>
                        <p>Admin</p>
                        <p>${association?.name}</p>
                    </body>
                    </html>
                  `;
        var mailSubject = `Payment Dues Remainder`;
        if (mailSubject && emailContent)
          var mailResponse = await sendEMail(
            mailSubject,
            element.email,
            emailContent
          );
      }
    });
  });

  // Method: send mail with excel(unpaid and current month paid) to Admin for every month 15th
  cron.schedule("0 0 15 * *", async () => {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const response = await MaintenanceConfiguration.aggregate([
      {
        $match: {
          $or: [
            { isPaid: false },
            {
              isPaid: true,
              createdAt: {
                $gte: startOfMonth,
                $lt: endOfMonth,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "maintenances",
          localField: "maintenanceId",
          foreignField: "_id",
          as: "maintenanceData",
        },
      },
      {
        $unwind: {
          path: "$maintenanceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "flats",
          localField: "flatId",
          foreignField: "_id",
          as: "flatsData",
        },
      },
      {
        $unwind: {
          path: "$flatsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          flatsData: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "flatsData.blockId",
          foreignField: "_id",
          as: "blockData",
        },
      },
      {
        $unwind: {
          path: "$blockData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "flatsData._id",
          foreignField: "flatId",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          flatNo: "$flatsData.flatNo",
          blockName: "$blockData.blockName",
          userName: "$userData.name",
          email: "$userData.email",
          squareFeet: "$flatsData.squareFeet",
          maintenanceAmount: 1,
          createdAt: 1,
          shortName: "$maintenanceData.shortName",
          flatType: "$flatsData.isBooked",
          isPaid: 1,
          paidAt: {
            $cond: {
              if: { $eq: ["$paidAt", null] },
              then: null,
              else: "$paidAt",
            },
          },
        },
      },
    ]).exec();

    if (!response.length) {
      return;
    }

    // Transform data for the Excel sheet
    const transformedData = response.map((item) => ({
      maintenanceAmount: item.maintenanceAmount,
      Paid: item.isPaid ? "Paid" : "Unpaid", // Custom header
      createdAt: item.createdAt,
      flatNo: item.flatNo,
      blockName: item.blockName,
      squareFeet: item.squareFeet,
      shortName: item.shortName,
      // flatType: item.flatType,
      paidAt: item.paidAt,
    }));

    const worksheet = xlsx.utils.json_to_sheet(transformedData, {
      header: [
        "maintenanceAmount",
        "Paid",
        "createdAt",
        "flatNo",
        "blockName",
        "squareFeet",
        "shortName",
        "paidAt",
      ],
    });

    const headers = [
      "Maintenance Amount",
      "Paid",
      "Created Date",
      "Flat Name",
      "Block Name",
      "Square Feet",
      "Short Name",
      "Paid Date",
    ];

    headers.forEach((header, index) => {
      const cell = worksheet[xlsx.utils.encode_cell({ r: 0, c: index })];
      if (cell) {
        cell.v = header;
      }
    });

    // Set cell styles for the Paid column
    const range = xlsx.utils.decode_range(worksheet["!ref"]);
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const cellAddress = `B${row + 1}`; // Column 'B' for 'Paid'
      const cell = worksheet[cellAddress];

      if (cell) {
        cell.s = {
          fill: {
            fgColor: { rgb: cell.v === "Paid" ? "90EE90" : "FFA07A" }, // Light green for 'Paid' and light orange for 'Unpaid'
          },
        };
      }
    }

    // Create a new workbook
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Maintenance Data");

    const excelFilePath = "maintenance_data.xlsx";
    xlsx.writeFile(workbook, excelFilePath);

    const attachments = [{ path: excelFilePath }];
    const association = await Association.findOne({});

    const emailContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Society Dues Payment Status</title>
            </head>
            <body>
                <p>Dear Admin,</p>
                <p>Kindly find the attached Society Dues Payment Status Report as of ${moment(
                  new Date()
                ).format("DD-MM-YYYY")}.</p>
                <p>Regards,</p>
                <p>Admin</p>
                <p>${association?.name}</p>
            </body>
            </html>
        `;

    const mailSubject = `Society Dues Payment Status`;

    if (mailSubject && emailContent) {
      try {
        const users = await User.find({ role: SUPER_ADMIN });
        users?.forEach(async (element) => {
          const mailResponse = await sendEMail(
            mailSubject,
            element.email,
            emailContent,
            attachments
          );
        });
      } catch (error) {
        // console.error("Error sending email:", error);
      }
    }
  });

  // Method: send mail to Admin for upcoming and expired product warranty
  cron.schedule("0 0 * * 1", async () => {
    // triggers on every monday
    try {
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(futureDate.getDate() + 60);

      const products = await Product.find({
        "warranty.endDate": { $lt: futureDate },
      });

      if (products.length === 0) {
        return;
      }

      const association = await Association.findOne({});

      for (const product of products) {
        const emailContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Warranty Item Expiry Notification</title>
                    </head>
                    <body>
                        <p>Dear Admin,</p>
                        <p>Please note the warranty of the ${
                          product.productName
                        } is expiring on ${moment(
          product.warranty.endDate
        ).format(
          "DD-MM-YYYY"
        )}. Kindly take necessary steps to extend the expiry.</p>
                        <p>Regards,</p>
                        <p>Admin</p>
                        <p>${association?.name || "Your Organization"}</p>
                    </body>
                    </html>
                `;

        const mailSubject = `Warranty Expiry Notification - ${product.productName}`;

        const users = await User.find({ role: SUPER_ADMIN });

        for (const user of users) {
          try {
            await sendEMail(mailSubject, user.email, emailContent);
          } catch (error) {
            // console.error(`Error sending email to ${user.email}:`, error);
          }
        }
      }
    } catch (error) {
      // console.error('Error in cron job:', error);
    }
  });
}

cron.schedule("* * * * *", () => {
  // console.log("⏱ Cron job running every minute:", new Date().toLocaleString());
});

// cron.schedule('0 0 * * *', async () => {
cron.schedule("0 0 * * *", async () => {
  try {
    const today = moment();
    const nextMonth = today.format("YYYY-MM"); // due entry month

    const maintenanceOption = await MaintenanceOption.findOne();
    if (!maintenanceOption) return;

    // Get all unpaid invoices whose due date has passed
    const unpaid = await MaintenanceConfiguration.find({
      isPaid: false,
      dueDate: { $lte: today.toDate() },
    });

    // Group by invoiceNumber + flatId
    const invoiceMap = new Map();

    for (const entry of unpaid) {
      const key = `${entry.invoiceNumber}_${entry.flatId}`;
      if (!invoiceMap.has(key)) invoiceMap.set(key, []);
      invoiceMap.get(key).push(entry);
    }

    for (const [key, entries] of invoiceMap.entries()) {
      const [invoiceNumber, flatId] = key.split("_");

      // Check if due already generated
      const alreadyDue = await MaintenanceConfiguration.findOne({
        invoiceNumber: `DUE-${invoiceNumber}`,
        month: nextMonth,
        expense: "Late Payment Due",
        flatId,
      });

      if (alreadyDue) continue;

      const totalAmount = entries.reduce((sum, e) => sum + (e.amount || 0), 0);

      let dueAmount = 0;
      if (maintenanceOption.dueType === "rupee") {
        dueAmount = maintenanceOption.dueAmount;
      } else if (maintenanceOption.dueType === "percentage") {
        dueAmount = Math.round(
          (maintenanceOption.dueAmount / 100) * totalAmount
        );
      }

      // Save one due per invoiceNumber + flatId
      await MaintenanceConfiguration.create({
        flatId,
        month: nextMonth,
        dueDate: moment().endOf("month").toDate(),
        amount: dueAmount,
        actualAmount: dueAmount / 1000,
        expense: "Late Payment Due",
        expenseNmber: `DUE-${moment().format("YYYYMM")}`,
        invoiceNumber,
        isPaid: false,
        paidAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("❌ Error in cron job:", error);
  }
});
