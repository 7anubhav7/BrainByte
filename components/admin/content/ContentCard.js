"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SourceIcon from "@mui/icons-material/Source";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

import { useRouter } from "next/navigation";

const ContentCard = () => {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/Curriculum`);
      const data = await response.json();
      console.log("CONTENT--------", data);
      setContent(data);
    } catch (error) {
      toast.error("Error fetching content!");
      console.log("ERROR-----------", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchContent}
          disabled={loading}
          sx={{
            bgcolor: "#8A12FC",
            ":hover": {
              bgcolor: "#6A0FBA",
              color: "#fff",
            },
          }}
        >
          {loading ? <CircularProgress color="inherit" size={20} /> : "Reload"}
        </Button>
      </Box>

      {content.map((content, index) => (
        <Box
          key={content?._id}
          sx={{
            padding: 2,
            mt: 2,
            bgcolor: "#212121",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.2)",
            transition: "all 0.3 ease",
            "&:hover": {
              boxShadow: "0px 1px 4px rgba(0,0,0,0.3)",
            },
            width: "100%",
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "#E0E0E0",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.8rem",
                      color: "black",
                    }}
                  >
                    Image
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#FFF",
                  }}
                >
                  {content?.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default ContentCard;
