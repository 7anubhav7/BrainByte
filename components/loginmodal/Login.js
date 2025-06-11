"use client";

import { act, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import loginModalStyles from "./modalStyles";
import { IconButton, TextField } from "@mui/material";
import { toast } from "react-toastify";

const LoginModal = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // This function validates the Register form to make sure all required fields are filled out and are correct
  const validateForm = () => {
    const errors = {}; // Create an empty object to store validation error messages

    // Check if 'name' field is not empty
    if (!form.name) errors.name = "Name is required";

    // Check if 'email' field is not empty and matches a valid email format using regex
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      // Regular expression to check if email format is valid
      errors.email = "Invalid email format";

    // Check if 'password' field is not empty and has at least 6 characters
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6)
      // Minimum password length validation
      errors.password = "Password must be at least 6 characters";

    // If we're on the 'Sign Up' tab (activeTab === 1), check if the 'organization' field is filled
    if (activeTab === 1 && !form.organization)
      errors.organization = "Organization is required";

    return errors; // Return the errors object, which contains any validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = form;
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        handleClose();
      } else {
        toast.error(result?.err);
      }
    } catch (e) {
      toast.error("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={loginModalStyles.modalBox}>
        <Box sx={loginModalStyles.modalHeader}>
          <Typography variant="h6" sx={loginModalStyles.title}>
            Please Login To Continue
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          centered
          sx={loginModalStyles.tabs}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {activeTab === 1 && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
          )}

          <TextField
            fullWidth
            label="E-Mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
          />
          {activeTab === 1 && (
            <TextField
              fullWidth
              label="Institution / Organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              error={!!errors.organization}
              helperText={errors.organization}
              margin="normal"
            />
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={loginModalStyles.button}
            disabled={loading}
          >
            {loading
              ? activeTab === 0
                ? "Signing In..."
                : "Signing Up..."
              : activeTab === 0
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
