"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { fetchSubCategories } from "@/slice/subcategorySlice";

const ScrollableTabs = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [subcategories, setSubCategories] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);

    const selectedSlug = subcategories[newValue]?.slug;
    if (selectedSlug) {
      router.push(`/content/${selectedSlug.toLowerCase()}`);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/subcategory`);
      const data = await response.json();
      console.log("data:-----", data);
      setSubCategories(data);
    } catch (error) {
      console.log("error during fetching", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#1c1c1c",
          color: "#fff",
          padding: "10px 0",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTabs-scrollButton": {
              color: "white",
              "&:hover": {
                color: "#00ff00",
              },
              "& svg": {
                fontSize: "3rem",
              },
            },
          }}
        >
          {subcategories.map((tab, index) => (
            <Tab
              key={index}
              label={tab.name}
              sx={{
                textTransform: "none",
                fontSize: isSmallScreen ? "14px" : "16px", // Increased font size
                fontWeight: 600,
                "&.Mui-selected": {
                  color: "#00ff00 !important", // Force white for the selected tab
                },
                color: value === index ? "#fff" : "#fff", // Active tab is white, others are gray
                "&:hover": {
                  color: "#00ff00", // Green text on hover
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default ScrollableTabs;
