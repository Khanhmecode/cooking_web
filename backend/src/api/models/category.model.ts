import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  idCategory: {
    type: String,
    default: "",
  },
  strCategory: {
    type: String,
  },
  strCategoryThumb: {
    type: String
  },
  strCategoryDescription: {
    type: String
  },
  status: {
    type: String,
    default: 'active'
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema, 'categories');

export default Category;