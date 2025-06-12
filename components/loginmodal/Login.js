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
import ReCAPTCHA from "react-google-recaptcha";
import { useSession, signIn, signOut } from "next-auth/react";

const CaptchaProtectionPopup = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "rgb(33, 179, 255)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 9999, // Ensure it's on top
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzHPIg1vi9om7i-Uo1drOVBBytptqaXrqtZWr8Q_PGyWsmTy2QSUSrOGd9S27Ma3fNroA&usqp=CAU"
        alt="reCAPTCHA logo"
        style={{ height: "60px", padding: "10px 10px" }}
      />
      protected by Google reCAPTCHA.
      {hovered && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          <a
            href="https://policies.google.com/privacy?hl=en"
            style={{ color: "#fff" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </Typography>
      )}
    </Box>
  );
};

const LoginModal = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
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
    if (activeTab === 1 && !recaptchaToken)
      errors.recaptcha = "Please complete the reCaptcha";

    return errors; // Return the errors object, which contains any validation errors
  };

  const validateLoginForm = () => {
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
      const data = { ...form, recaptchaToken };
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

  // This function handles the form submission for login (Sign In)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission to handle it manually

    // Validate the Login form before submitting
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Update errors state if validation fails
      return; // Stop further execution if the form is invalid
    }

    setLoading(true); // Set loading state to true to indicate that the login process is ongoing

    try {
      // Extract the email and password from the form data
      const email = form.email;
      const password = form.password;

      // Use the 'signIn' function (likely from NextAuth) to attempt logging in
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect after login
        email,
        password, // Pass the email and password for authentication
      });

      // If the login is unsuccessful, display the error message from the result
      if (!result.ok) {
        toast.error(result?.error);
      } else {
        toast.success("Login successfully"); // Show a success message if login is successful
        setRecaptchaToken(null); // Reset the reCAPTCHA token after successful login
        handleClose(); // Close the login modal or form
      }
    } catch (error) {
      toast.error("Error connecting to the server!"); // If there was an error with the login request, show an error message
    } finally {
      setLoading(false); // Set loading state to false when the login process is complete
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            activeTab === 1 ? handleSubmit(e) : handleLogin(e);
          }}
        >
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

          {activeTab === 1 && (
            <ReCAPTCHA
              sitekey="6LeAzV0rAAAAAJi_AW5SW_ngRD4CXUyJiow0Avbk"
              onChange={setRecaptchaToken}
            />
          )}

          {activeTab === 1 && errors.recaptcha && (
            <p style={{ color: "red" }}>{errors.recaptcha}</p>
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
