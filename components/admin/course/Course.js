"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { toast } from "react-toastify";
import CourseCard from "./CourseCard";

const CourseControl = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a course title.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.API}/admin/curriculumCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      if (response.ok) {
        toast.success("Course added successfully.");
        setTitle(""); // Reset title input
        handleClose(); // Close the dialog
      } else {
        toast.success("Failed to add the course.");
      }
    } catch (error) {
      console.log("Error adding course:", error);
      toast.success("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          padding: 2,
          bgcolor: "#212121",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search your course"
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            input: { color: "white", fontSize: "1.2rem", height: "2rem" },

            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#8A12FC" },
              "&:hover fieldset": { borderColor: "#8A12FC" },
              "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: "purple",
            ":hover": {
              bgcolor: "darkviolet",
            },
            whiteSpace: "nowrap",
            padding: "12px 24px",
            fontSize: "1.1rem",
          }}
          onClick={handleOpen}
        >
          Add Course
        </Button>
      </Box>

      <Dialog
        PaperProps={{
          sx: {
            bgcolor: "#212121",
            color: "white",
          },
        }}
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Add New Course</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              style: { color: "#8A12FC" },
            }}
            sx={{
              input: { color: "white", fontSize: "1.2rem", height: "2rem" },

              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#8A12FC" },
                "&:hover fieldset": { borderColor: "#8A12FC" },
                "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#fff",
              bgcolor: "red",
              ":hover": {
                bgcolor: "darkred",
              },
              whiteSpace: "nowrap",
              padding: "12px 24px",
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              color: "#fff",
              bgcolor: "purple",
              ":hover": {
                bgcolor: "darkviolet",
              },
              whiteSpace: "nowrap",
              padding: "12px 24px",
              fontSize: "1.1rem",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <CourseCard />
    </>
  );
};

export default CourseControl;
