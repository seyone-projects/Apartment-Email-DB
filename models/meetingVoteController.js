import mongoose from "mongoose";
const { Schema, model } = mongoose;

const meetingVoteSchema = new Schema({
    meetingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Meeting ID is required"],
        ref: 'meeting',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["Accept", "Decline", "Tentative"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, { timestamps: true });


meetingVoteSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const MeetingVote = model("meetingvote", meetingVoteSchema);
export default MeetingVote;
