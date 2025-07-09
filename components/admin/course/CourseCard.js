import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SourceIcon from "@mui/icons-material/Source";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const CourseCard = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]); // State for all courses
  const [hoverIndex, setHoverIndex] = useState(null); // Track which card is hovered
  const [editOpen, setEditOpen] = useState(false); // State for edit dialog
  const [deleteOpen, setDeleteOpen] = useState(false); // State for delete dialog
  const [currentCourse, setCurrentCourse] = useState(null); // Course being edited/deleted
  const [newTitle, setNewTitle] = useState(""); // New title for edit
  const [loading, setLoading] = useState(true); // Loader state
  const [actionLoading, setActionLoading] = useState(false); // Loader for edit/delete actions

  // Fetch courses from the server
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/curriculumCourse`);
      const data = response.json();
      setCourses(data);
    } catch (error) {
      console.log("error from fetchCourse fn---", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>{JSON.stringify(courses)}</h1>
    </>
  );
};

export default CourseCard;
