import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import styles from "./ItemManagerStyles";
import { fetchCategories } from "@/slice/categorySlice";
import { fetchSubCategories } from "@/slice/subcategorySlice";
import {
  setEditingItem,
  resetEditingItem,
  saveItem,
  fetchItems,
} from "@/slice/catewithsubcateSlice";

const ItemManager = () => {
  const dispatch = useDispatch();
  const { list: categories } = useSelector((state) => state.categories);
  const { items, editingItem, loading } = useSelector((state) => state.items);
  const { list: subcategories } = useSelector((state) => state.subcategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  //Debug
  useEffect(() => {
    console.log("Cateogires fetched-", categories);
  }, [categories]);
  //

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSaveItem = () => {
    const item = {
      categoryId: selectedCategory,
      subcategoryId: selectedSubCategory,
      title,
      subtitle,
    };
    dispatch(saveItem(item)).then(() => {
      resetForm();
    });
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setTitle("");
    setSubTitle("");
    dispatch(resetEditingItem());
  };

  // Handle delete item
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id)).then(() => dispatch(fetchItems()));
  };

  return (
    <Box p={3} maxWidth="990px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Category with Sub Category
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={styles.selectField}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>SubCategory</InputLabel>
          <Select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            sx={styles.selectField}
            disabled={!selectedCategory}
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={styles.textField}
        />

        <TextField
          label="Sub Title"
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          sx={styles.textField}
        />
        <Button
          variant="contained"
          onClick={handleSaveItem}
          disabled={!selectedCategory || !selectedSubCategory}
          sx={styles.button}
        >
          Add
        </Button>
      </Box>
      <List>
        {loading ? (
          <Typography>Loading..,</Typography>
        ) : (
          items &&
          items.map((item) => (
            <ListItem
              key={item._id}
              divider
              sx={{
                borderColor: "#8A12FC",

                padding: 1, // Add spacing
                // Subtle shadow for card effect
                "&:hover": {
                  backgroundColor: "#8A12FC", // Slightly brighter background on hover
                },
                transition: "all 0.3s ease", // Smooth hover transition
              }}
            >
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <span
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "1rem",
                        color: "#CCCCCC",
                      }}
                    >
                      <strong>Category:</strong> {item.categoryId.name}
                    </span>
                    <span style={{ fontSize: "1rem", color: "#CCCCCC" }}>
                      <strong>Subcategory:</strong> {item.subcategoryId.name}
                    </span>
                  </>
                }
                primaryTypographyProps={{
                  variant: "h6", // Modern typography for title
                  color: "white", // White text for title
                }}
              />
              <IconButton
                edge="end"
                sx={{
                  color: "green", // Green color for edit icon
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 0, 0.1)", // Add hover background
                  },
                }}
                onClick={() => dispatch(setEditingItem(item))}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                sx={{
                  color: "red", // Red color for delete icon
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)", // Add hover background
                  },
                }}
                onClick={() => handleDeleteItem(item._id)}
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
export default ItemManager;
