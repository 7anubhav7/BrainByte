"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Content = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => setDialogOpen(false);

  const handleOpen = () => setDialogOpen(true);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter the content title!");
      return;
    }
    try {
      const response = await fetch(`${process.env.API}/Curriculum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        alert("Content added successfully!");
        setTitle("");
        handleClose();
      } else {
        alert("Failed to fetch!");
      }
    } catch (error) {
      alert("An error occured. Please try again!");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          padding: 2,
          bgcolor: "#212121",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search your content"
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
          sx={{
            bgcolor: "purple",
            ":hover": { bgcolor: "darkviolet" },
            whiteSpace: "nowrap",
            padding: "12px 25px",
            fontSize: "1.1rem",
          }}
          onClick={handleOpen}
        >
          New Content
        </Button>
      </Box>

      <Dialog
        PaperProps={{
          sx: {
            bgcolor: "#212121",
            color: "#fff",
          },
        }}
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Add New Content</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Content Title"
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
            variant="contained"
            onClick={handleClose}
            sx={{
              color: "#fff",
              bgcolor: "red",
              ":hover": { bgcolor: "darkred" },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              color: "#fff",
              bgcolor: "purple",
              ":hover": { bgcolor: "darkviolet" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Content;
