import Notification from "../../models/popnotification/popnotificationModel.js";
import User from "../../models/userModal.js";
import { getIOInstance } from "../../constants/socketStore.js";
import { handleErrors } from "../../utils/appError.js";
import mongoose from "mongoose";

export async function sendNotification({
  assignedTo,
  referenceId,
  icon,
  heading,
  shortDesc,
  sentBy,
  targetUsers = [], // may be strings (userIds)
  toUsers = [], // roles
  type,
}) {
  try {
    const io = getIOInstance();

    let users = [];

    // Fetch users from targetUsers (by IDs)
    if (targetUsers.length > 0) {
      const idUsers = await User.find({
        _id: { $in: targetUsers },
        isActive: true,
      });
      users.push(...idUsers);
    }

    // Fetch users by role (toUsers)
    if (toUsers.length > 0) {
      const roleUsers = await User.find({
        role: { $in: toUsers },
        isActive: true,
      });

      // Avoid duplicate users
      const existingIds = new Set(users.map((u) => u._id.toString()));
      roleUsers.forEach((user) => {
        if (!existingIds.has(user._id.toString())) {
          users.push(user);
        }
      });
    }

    if (!users.length) return;

    const receivers = users.map((user) => ({
      userId: user._id,
      role: user.role,
      read: false,
    }));

    const notification = await Notification.create({
      assignedTo,
      referenceId,
      icon,
      heading,
      shortDesc,
      sentBy,
      receivers,
      type,
      createdAt: new Date(),
    });

    // Emit to socket users
    receivers.forEach(({ userId }) => {
      io.to(userId.toString()).emit("new_notification", {
        id: notification._id,
        assignedTo,
        referenceId,
        icon,
        type,
        heading,
        shortDesc,
        time: notification.createdAt,
        sentBy,
      });
    });

    return notification;
  } catch (err) {
    console.log("err...", err);
  }
}

export async function getNotificationList(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const matchStage = {
      $match: {
        "receivers.userId": new mongoose.Types.ObjectId(req.userId),
      },
    };

    const countAggregation = await Notification.aggregate([
      matchStage,
      { $count: "total" },
    ]);

    const total = countAggregation[0]?.total || 0;
    const pages = Math.ceil(total / limit);

    const notifications = await Notification.aggregate([
      matchStage,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      // ✅ Join with Ticket Collection
      {
        $lookup: {
          from: "tickets",
          localField: "referenceId",
          foreignField: "_id",
          as: "ticketData",
        },
      },

      // ✅ Unwind ticketData to simplify
      {
        $unwind: {
          path: "$ticketData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          referenceId: 1,
          icon: 1,
          type: 1,
          heading: 1,
          shortDesc: 1,
          sentBy: 1,
          createdAt: 1,
          isPicked: 1,
          assignedTo: "$ticketData.assignedTo",
          ticketId: "$ticketData._id",
          read: {
            $first: {
              $map: {
                input: {
                  $filter: {
                    input: "$receivers",
                    as: "r",
                    cond: {
                      $eq: [
                        "$$r.userId",
                        new mongoose.Types.ObjectId(req.userId),
                      ],
                    },
                  },
                },
                as: "filtered",
                in: "$$filtered.read",
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      messageData: notifications,
      pagination: {
        total,
        page,
        pages,
        limit,
      },
    });
  } catch (err) {
    return handleErrors(err, res);
  }
}

export async function markNotificationAsRead(req, res, next) {
  try {
    const { notificationId } = req.params;

    const result = await Notification.updateOne(
      {
        _id: notificationId,
        "receivers.userId": req.userId,
      },
      {
        $set: { "receivers.$.read": true },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "Notification not found or already read",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Notification marked as read",
    });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    return handleErrors(err, res);
  }
}

export async function markAllNotificationsAsRead(req, res, next) {
  try {
    const result = await Notification.updateMany(
      { "receivers.userId": req.userId },
      {
        $set: { "receivers.$[elem].read": true },
      },
      {
        arrayFilters: [{ "elem.userId": req.userId, "elem.read": false }],
      }
    );

    return res.status(200).json({
      status: true,
      message: `Marked ${result.modifiedCount} notifications as read`,
    });
  } catch (err) {
    console.error("Error marking all notifications as read:", err);
    return handleErrors(err, res);
  }
}
