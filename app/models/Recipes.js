"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    userID: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail_filename: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    reviews: { type: (Array), required: true },
    categories: { type: (Array), required: true },
}, {
    timestamps: true,
});
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema, "recipes");
exports.default = Recipe;
