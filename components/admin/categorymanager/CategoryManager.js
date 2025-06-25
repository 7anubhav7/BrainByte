import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";

import categoryManagerStyles from "./categoryManagerStyles";
import {
  addCategory,
  updateCategory,
  fetchCategories,
  deleteCategory,
} from "@/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryManager = () => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const [editing, setEditing] = useState({ id: null, name: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredCategories, setFilteredCategories] = useState([]);
  const { list: categories, loading } = useSelector(
    (state) => state.categories
  );

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleSaveCategory = () => {
    if (editing.id) {
      dispatch(updateCategory({ id: editing.id, name: editing.name }));
    } else {
      dispatch(addCategory(newCategory));
    }
    setEditing({ id: null, name: "" });
    setNewCategory("");
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(() =>
        cat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  return (
    <Box sx={categoryManagerStyles.container}>
      <Typography variant="h4" gutterBottom>
        CategoryManager
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search Category"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          inputProps={{
            startadornment: (
              <InputAdornment postion="start">
                <Search style={categoryManagerStyles.searchIcon} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: categoryManagerStyles.inputLabel,
          }}
          sx={categoryManagerStyles.searchField}
        />
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label={editing.id ? "Edit Category" : "Add Category"}
          variant="outlined"
          fullWidth
          value={editing.id ? editing.name : newCategory}
          onChange={(e) =>
            editing.id
              ? setEditing({ ...editing, name: e.target.value })
              : setNewCategory(e.target.value)
          }
          InputLabelProps={{ style: categoryManagerStyles.inputLabel }}
          sx={categoryManagerStyles.categoryField}
        />

        <Button
          variant="contained"
          onClick={handleSaveCategory}
          disabled={!newCategory.trim() && !editing.name.trim()}
        >
          {editing.id ? "Update" : "Add"}
        </Button>
      </Box>

      <List>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredCategories?.map((category) => (
            <ListItem
              key={category?._id}
              divider
              sx={categoryManagerStyles.listItem}
            >
              <ListItemText primary={category?.name} />

              <IconButton
                edge="end"
                onClick={() =>
                  setEditing({ id: category?._id, name: category?.name })
                }
              >
                <Edit style={{ color: "green" }} />
              </IconButton>

              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDeleteCategory(category?._id)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default CategoryManager;
