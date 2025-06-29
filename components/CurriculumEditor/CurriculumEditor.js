"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Modal,
} from "@mui/material";

import Sidebar from "../sidebar/SideBar";
import { useSearchParams } from "next/navigation";

const CurriculumEditor = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contenttitle, setContentTitle] = useState("");

  const fetchCurriculum = async (searchId) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.API}/admin/singlecurriculum/${searchId}`
    );
    const data = await response.json();
    console.log("DATA FROM Fetch Curriculum fn----", data);
    setContentTitle(data?.title);
    setCurriculum(data?.section);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchCurriculum(search);
    }
  }, [search]);

  return (
    <>
      <Box
        sx={{
          mt: 0,
          padding: "16px",
          background: "linear-gradient(90deg, #8A12FC, #ff0080)",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {contenttitle}
        </Typography>
      </Box>
      <Sidebar />
    </>
  );
};
export default CurriculumEditor;
