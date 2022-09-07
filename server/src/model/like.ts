import mongoose from "mongoose";

export interface ILike extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId;
    model: "Post" | "Comment";
    location: mongoose.Schema.Types.ObjectId;
}

const Schema = mongoose.Schema;

const LikeSchema = new Schema<ILike>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    model: {
        type: String,
        enum: ["Post", "Comment"],
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "model",
        required: true,
    },
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;
