import mongoose from "mongoose";

interface IComment extends mongoose.Document {
    location: mongoose.Schema.Types.ObjectId;
    model: "Post" | "Comment";
    author: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
}

const Schema = mongoose.Schema;

const CommentSchema = new Schema<IComment>({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "model",
        required: true,
    },
    model: {
        type: String,
        enum: ["Post", "Comment"],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
