"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Breadcrumbs,
  Link,
  CircularProgress,
  Modal,
} from "@mui/material";
import { CheckCircle, FileDownload } from "@mui/icons-material";
import CourseDescription from "./CourseDescription";
import Alumni from "./Alumni";
import Technologies from "./Technologies";
import AboutCourse from "./AboutCourse";
import Faqs from "./Faqs";
import CourseJourney from "./CourseJourney";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { jsPDF } from "jspdf";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage({ course, loading }) {
  const icons = [
    "</>", // Code
    "🔥", // Fire/Hot Topic
    "💻", // Laptop
    "⚡", // Lightning Bolt/Power
    "🚀", // Rocket/Innovation
    "🌟", // Star/Highlight
    "📚", // Book/Learning
    "🖥️", // Desktop Computer
    "📱", // Mobile Phone
    "💡", // Light Bulb/Idea
    "🔧", // Wrench/Tools
    "🛠️", // Hammer and Wrench/Development
    "📈", // Chart/Progress
    "🧠", // Brain/AI
    "🌐", // Globe/Web
    "🔒", // Lock/Security
    "🔑", // Key/Access
    "📂", // Folder/Files
    "🖱️", // Mouse/Interaction
    "⌨️", // Keyboard
    "🧑‍💻", // Developer
    "🤖", // Robot/Automation
    "🛡️", // Shield/Security
    "🌍", // Earth/Global Impact
    "⏳", // Hourglass/Time
    "⚙️", // Gear/Settings
    "🖇️", // Paperclip/Attachment
    "📤", // Upload
    "📥", // Download
    "💾", // Floppy Disk/Save
    "🔍", // Magnifying Glass/Search
    "🗂️", // File Organizer
    "📡", // Satellite/Communication
    "🕹️", // Joystick/Gaming
    "🌌", // Milky Way/Space Tech
    "🚧", // Construction/Work in Progress
  ];
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState("");
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dummyData = "This is the brochure content. You can download this file.";

  const handleDownload = () => {
    if (!course) return; // Ensure that data is available before generating the PDF

    const doc = new jsPDF();

    // Get the image URL dynamically from the course object
    const backgroundImageUrl = course.imageUrl;

    // Determine the image format based on the file extension (PNG or JPEG)
    const imageFormat = backgroundImageUrl.endsWith(".png") ? "PNG" : "JPEG";

    // Add background image with the correct format
    doc.addImage(backgroundImageUrl, imageFormat, 0, 0, 210, 297);

    // Set document title
    // Set course title font size and color
    doc.setFontSize(18);
    doc.setTextColor(128, 0, 128); // Set course title color to purple
    doc.setFont("helvetica", "bold"); // Set font to bold for the course title
    doc.text(course.title, 10, 10);

    // Underline the course title with a purple color and increased height
    const titleWidth = doc.getTextWidth(course.title); // Get width of the course title
    doc.setDrawColor(128, 0, 128); // Set purple color for the underline (RGB)
    doc.line(10, 16, 10 + titleWidth, 16); // Draw line just below the title with increased height

    // Add some space after the title
    let yPosition = 10; // Initial Y position for sections

    course.sections.forEach((section) => {
      // Set different color for section titles and make them bold
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold"); // Bold font for section titles
      doc.setTextColor(0, 153, 76); // Set color to green for section title
      doc.text(section.title, 10, 10); // Section title
      const titleWidth = doc.getTextWidth(course.title);

      doc.setDrawColor(128, 0, 128);
      doc.line(10, 16, 10 + titleWidth, 16);
      let yPosition = 30;

      course.sections.forEach((section) => {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 153, 76);
        doc.text(section.title, 10, yPosition);
        section.lectures.forEach((lecture) => {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(51, 51, 51);
          doc.text(`-${lecture.title}`, 15, yPosition);
          yPosition += 10;
        });
        yPosition += 10;
      });
    });

    // Save the PDF with a filename
    doc.save("Brochure.pdf");
  };

  useEffect(() => {
    // Select a random icon from the array
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    setCurrentIcon(randomIcon);
  }, []); // Runs once when the component mounts

  // Display loading indicator while data is loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          size={80} // Makes it larger
          sx={{
            color: "purple", // Sets the color to purple
            animation: "spin 2s linear infinite", // Adds custom animation
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(180deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </Box>
    );
  }

  const handleButtonClick = () => {
    if (!data) return;
    router.push(`/checkout?search=${course?.slug}`); // Redirect to checkout if `data` exists
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "linear-gradient(180deg, #0F172A, #0B1120)",
          color: "#fff",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 12 },

          backgroundImage: `url(${course?.imageUrl || "/images/default.png"})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Breadcrumb Section */}
        <Breadcrumbs sx={{ color: "#a8a8a8", mb: 4 }}>
          <Link
            href="/all-courses"
            underline="hover"
            sx={{ color: "#00ff88", textDecoration: "none", fontSize: "14px" }}
          >
            All Courses
          </Link>
          <Typography sx={{ fontSize: "14px", color: "#a8a8a8" }}>
            Live
          </Typography>
        </Breadcrumbs>

        {/* Main Content Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Text Section */}
          <Box sx={{ maxWidth: "600px" }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              {course?.title}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircle sx={{ color: "#00ff88" }} />
                Comprehensive Learning
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircle sx={{ color: "#00ff88" }} />
                Industry Readiness
              </Stack>
            </Typography>

            <Typography variant="body2" sx={{ color: "#a8a8a8", mb: 4 }}>
              Recommended for Students and Working Professionals
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#00ff88",
                  color: "#000",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#00e67a" },
                }}
              >
                {data ? "Proceed to Checkout" : "Login to Register"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "#00ff88",
                  borderColor: "#00ff88",
                  textTransform: "none",
                  "&:hover": { borderColor: "#00e67a", color: "#00e67a" },
                }}
                startIcon={<FileDownload />}
                onClick={handleOpen}
              >
                Download Brochure
              </Button>
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: "#a8a8a8", display: "block", mt: 2 }}
            >
              Fill out the form to increase your chances of getting shortlisted
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                color: "#00ff88",
                textAlign: "center",
                display: "block",
                mt: 2,
                position: "relative",
                "&::before": {
                  content: '"Special Price"',
                  display: "block",
                  fontSize: "1.1rem",
                  color: "#a8a8a8",
                  fontWeight: "medium",
                  marginBottom: "4px",
                },
                animation:
                  "fadeIn 1.5s ease-in-out, bounce 2s infinite ease-in-out",
              }}
            >
              ${course?.price}
              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes bounce {
                  0%,
                  100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-5px);
                  }
                }
              `}</style>
            </Typography>
          </Box>

          {/* Icon Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              mt: { xs: 4, md: 0 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Replace with an actual image/icon */}
            <Box
              sx={{
                width: "250px",
                height: "250px",
                bgcolor: "transparent",
                border: "3px dashed #00ff88",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "90%",
                  height: "90%",
                  border: "2px dashed #00ff88",
                  borderRadius: "50%",
                },
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {currentIcon}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {course ? <CourseDescription course={course} /> : null}

      {/* <CourseDescription/> */}

      {/* <CourseJourney /> */}

      {course ? <CourseJourney course={course} /> : null}

      <Alumni />

      {/* <AboutCourse/> */}

      {course ? <AboutCourse course={course} /> : null}

      <Technologies />
      <Faqs />
      <Footer />

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#212121",
            color: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            width: "900px",
            maxHeight: "80vh", // Set max height for the modal
            overflowY: "auto", // Make the modal scrollable
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", fontSize: "1.25rem" }}
          >
            Brochure Content
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: "1.125rem",
              color: "#00e67a",
            }}
          >
            {course?.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: "1rem", // Adjust font size
              lineHeight: "1.9", // Improve line height for readability
              fontWeight: "500", // Set lighter font weight for description text
              overflowWrap: "break-word", // Handle long words without breaking the layout
            }}
          >
            {course?.description}
            {/* You can adjust the description length as needed */}
          </Typography>

          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "#00ff88",
              borderColor: "#00ff88",
              textTransform: "none",
              "&:hover": { borderColor: "#00e67a", color: "#00e67a" },
            }}
            startIcon={<FileDownload />}
            onClick={handleDownload}
          >
            Download Brochure
          </Button>
        </Box>
      </Modal>
    </>
  );
}
