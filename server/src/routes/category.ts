import express from "express";

import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategory,
    updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.route("/").get(getAllCategory).post(createCategory);

router
    .route("/:categoryID")
    .get(getCategory)
    .delete(deleteCategory)
    .patch(updateCategory);

export default router;
