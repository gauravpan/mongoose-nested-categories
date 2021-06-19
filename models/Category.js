import mongoose from "mongoose";

/* CategoriesSchema will correspond to a collection in your MongoDB database. */
const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this Categories."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  children: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Categories" }],
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Categories",
  },
});

export default mongoose.models.Categories ||
  mongoose.model("Categories", CategoriesSchema);
