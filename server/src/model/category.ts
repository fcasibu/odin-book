import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  title: string;
}

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
