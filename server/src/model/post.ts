import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
    author: mongoose.Schema.Types.ObjectId;
    text: string;
    photoURL?: string;
    group?: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

const Schema = mongoose.Schema;

const PostSchema = new Schema<IPost>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        maxlength: 1000,
        required: true,
    },
    photoURL: {
        type: String,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
