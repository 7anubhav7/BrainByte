import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk(
  "categories/addCategory", // Unique action type for adding a category
  async (newCategory) => {
    const response = await fetch(`${process.env.API}/admin/category`, {
      method: "POST", // Sends a POST request to add a new category
      headers: { "Content-Type": "application/json" }, // Ensures the request body is in JSON format
      body: JSON.stringify({ name: newCategory }), // Sends the new category name as the request body
    });
    return response.json();
    // Converts response data to JSON and returns it
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories", // Unique action type for fetching categories
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      // Sends a GET request to fetch categories from the backend API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory", // Unique action type for updating a category
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/admin/category/${id}`, {
        method: "PUT", // Sends a PUT request to update an existing category
        headers: { "Content-Type": "application/json" }, // Ensures the request body is in JSON format
        body: JSON.stringify({ id, name }), // Sends the updated category name and ID in the request body
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating category:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.API}/admin/category/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return id;
    } catch (error) {
      console.error("Error deleting categories:", error);
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handling fetchCategories actions
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; // Set loading to true when fetching starts
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false; // Stop loading when fetch is successful
        state.list = action.payload; // Store fetched categories in state
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; // Stop loading when fetch fails
        state.error = action.error.message; // Store error message
      })

      // Handling addCategory action
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
        // Add the newly created category to the list
      })

      // Handling updateCategory action
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (cat) => cat._id === action.payload._id
        );
        // Find the index of the category to update
        if (index !== -1) {
          state.list[index] = action.payload;
          // Update the category in the state
        }
      })

      // Handling deleteCategory action
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat._id !== action.payload);
        // Remove the deleted category from the state
      });
  },
});

export default categorySlice.reducer;
