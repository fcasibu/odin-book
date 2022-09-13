import mongoose from "mongoose";

export interface INotification extends mongoose.Document {
    from: mongoose.Schema.Types.ObjectId;
    to: mongoose.Schema.Types.ObjectId;
    model: "Request" | "Auction";
    type: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

const Schema = mongoose.Schema;

const NotificationSchema = new Schema<INotification>({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "model",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "model",
        required: true,
    },
    model: {
        type: String,
        enum: ["Request", "Auction"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
