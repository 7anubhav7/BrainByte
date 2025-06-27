"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required!";
    if (!email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is Invalid!";
    }
    if (!password) errors.password = "Password is required!";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match!";
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEmail(data?.email);
      setName(data?.name);
      setProfileImagePreview(data?.image);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // Function to handle profile image selection.
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file.

    if (file) {
      setProfileImage(file); // Store the selected file in state.

      const reader = new FileReader(); // Create a FileReader to read the file.
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // Update the preview with the base64 URL of the image.
      };
      reader.readAsDataURL(file); // Convert the image file to a Data URL.
    }
  };

  // Function to upload an image to Cloudinary and return the uploaded image URL.
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData(); // Create FormData object to send the image file.
    formData.append("file", image); // Attach the image file.
    formData.append("upload_preset", "ml_default"); // Attach the Cloudinary upload preset.
    console.log(formData);
    // Make a POST request to Cloudinary's API to upload the image.
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST", // HTTP method is POST since we are uploading data.
        body: formData, // Attach the form data containing the image.
      }
    );

    const data = await response.json(); // Convert response into JSON format.
    console.log("data--------", data);
    return data.secure_url; // Return the URL of the uploaded image.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let imageUrl = ""; // Variable to store the uploaded image URL.

    // If a profile image was selected, upload it to Cloudinary.
    if (profileImage) {
      imageUrl = await uploadImageToCloudinary(profileImage); // Upload image and store the URL.
      setIsSuccess(true); // Mark success as true.
      setServerMessage("Image uploaded successfully"); // Update message.
    }

    const requestBody = {
      name,
      email,
      password,
      profileImage: imageUrl,
    };

    const response = await fetch(`${process.env.API}/admin/profile`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsSuccess(false);
      setServerMessage(data?.err);
    } else {
      setIsSuccess(true);
      setServerMessage(data?.msg);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url(/images/pic2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            maxWidth: 900,
            margin: "0 auto",
            padding: 2,

            overflow: "hidden",
            backgroundColor: "rgba(31,15,15,0.6)",
            marginTop: "29px",
            padding: "40px",
            color: "white",
          }}
        >
          <Box
            sx={{
              order: { xs: 2, sm: 1 },
              flex: { xs: "none", sm: 1 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {profileImagePreview && (
              <Box mt={2} textAlign="center">
                <div className="image-container">
                  <img
                    src={profileImagePreview}
                    alt="profile"
                    className="profile-image"
                  />
                </div>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              order: {
                xs: 1,
                sm: 2,
              },
              flex: { xs: 1, sm: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Update Profile
            </Typography>

            {serverMessage && (
              <Alert severity={isSuccess ? "success" : "error"}>
                {serverMessage}
              </Alert>
            )}
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                backgroundColor: "#8A12FC",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                    backgroundColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            >
              Upload Profile Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#8A12FC",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                    color: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                    color: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                    color: "white",
                  },
                },
              }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
