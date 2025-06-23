"use client";

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/slice/categorySlice";
import subcategoryReducer from "@/slice/subcategorySlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer,
  },
});
