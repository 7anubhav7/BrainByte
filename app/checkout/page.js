"use client";

import React, { useState } from "react";
import CheckOut from "@/components/checkout/CheckOut";
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
import { Box, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <>
      <Navbar />
      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "50vh",
          backgroundImage: 'url("/images/pic2.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mb: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", // Ensure animation stays within bounds
        }}
      >
        {/* Top Left Navigation */}
        <Box sx={{ position: "absolute", top: 20, left: 20, color: "white" }}>
          <Typography variant="h6">Home &gt; Checkout</Typography>
        </Box>

        {/* Center Animated BrainByte Text */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: "3rem", md: "5rem" },
            fontWeight: "bold",
            color: "green",
            textShadow: "0 4px 6px rgba(0,0,0,0.6)",
            animation:
              "fadeInUp 2s ease-in-out, pulse 1.5s infinite ease-in-out",
            textAlign: "center",
            position: "relative",
          }}
        >
          BrainByte
        </Typography>

        {/* Keyframes for Animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </Box>

      <CheckOut />

      <Box sx={{ mb: 20 }}></Box>

      <Footer />
    </>
  );
};

export default NavBar;
