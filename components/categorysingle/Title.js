import { DiscussionEmbed } from "disqus-react";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Modal,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { format } from "date-fns";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import MarkdownIt from "markdown-it";
import Markdown from "react-markdown";
import Divider from "@mui/material/Divider";

import Share from "./Share";

const ResponsiveComponent = ({ content }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadinggain, setLoadinggain] = useState(false);
  const [modalGainOpen, setModalGainOpen] = useState(false);
  const [contentGain, setContentGain] = useState("");
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const date = content?.date ? new Date(content.date) : null;
  const formattedData =
    date && !isNaN(date) ? format(date, "dd MMM, yyyy") : "Invalid date";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          padding: 1,
          backgroundColor: "#212121",
          color: "#fff",
          width: isMobile ? "100%" : "990px",
          margin: "auto",
          marginTop: "10",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? 2 : 0,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            {content?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Last Updated : {formattedData}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="Summarize Article" arrow>
            <IconButton
              size="small"
              sx={{
                color: "white",
                "&:hover": {
                  color: "green",
                },
              }}
              //onClick={handleSummarize}
            >
              <AutoAwesomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gain in-depth knowledge" arrow>
            <IconButton
              size="small"
              sx={{
                color: "white",
                "&:hover": {
                  color: "green",
                },
              }}
              //onClick={handleGain}
            >
              <FlutterDashIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Open Chat" arrow>
            <IconButton
              size="small"
              sx={{
                color: "white",
                "&:hover": {
                  color: "green",
                },
              }}
              //onClick={handleGain}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>

          <Share />
        </Box>
      </Box>
      <Divider
        sx={{
          height: "3px",
          width: isMobile ? "100%" : "990px",
          margin: "auto",
          backgroundColor: "white",
        }}
      />
    </>
  );
};

export default ResponsiveComponent;
