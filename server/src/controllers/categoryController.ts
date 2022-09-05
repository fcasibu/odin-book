import Category from "../model/category";

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find({}).exec();

  return sendResponse(res, 200, { categories });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryID).exec();

  return sendResponse(res, 200, { category });
});

export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  return sendResponse(res, 201, { category });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.categoryID).exec();

  return sendResponse(res, 200, { category: null });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryID,
    req.body,
    { new: true }
  ).exec();

  return sendResponse(res, 200, { category });
});
