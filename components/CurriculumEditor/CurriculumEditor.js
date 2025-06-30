"use client";

import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import NotesIcon from "@mui/icons-material/Notes";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Modal,
  useScrollTrigger,
} from "@mui/material";

import Sidebar from "../sidebar/SideBar";
import { useSearchParams } from "next/navigation";
import { Note } from "@mui/icons-material";

const CurriculumEditor = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contenttitle, setContentTitle] = useState("");
  const [editSectionValue, setEditSectionValue] = useState("");
  const [editLectureValue, setEditLectureValue] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleteLecture, setDeleteLecture] = useState(null);
  const [deletingSection, setDeletingSection] = useState("");

  const [sections, setSections] = useState([
    {
      _id: uuidv4(),
      title: "Introduction",
      lectures: [
        {
          _id: uuidv4(),
          title: "Topic A",
          content: "",
          videourl: "",
        },
      ],
    },
    {
      _id: uuidv4(),
      title: "Basic",
      lectures: [
        {
          _id: uuidv4(),
          title: "Topic B",
          content: "Topic B content",
          videourl: "https",
        },
        {
          _id: uuidv4(),
          title: "Topic B",
          content: "Topic B content",
          videourl: "https",
        },
        {
          _id: uuidv4(),
          title: "Topic B",
          content: "Topic B content",
          videourl: "https",
        },
      ],
    },
  ]);

  const fetchCurriculum = async (searchId) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.API}/admin/singlecurriculum/${searchId}`
    );
    const data = await response.json();
    console.log("DATA FROM Fetch Curriculum fn----", data);
    setContentTitle(data?.title);
    setCurriculum(data?.sections || []);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchCurriculum(search);
    }
  }, [search]);

  const handleAddSection = async () => {
    const idindex = uuidv4();
    const newSection = {
      idindex,
      title: "New Section",
      lectures: [],
    };

    setCurriculum((prevSections) => [...prevSections, newSection]);

    const data = {
      newSection,
      search,
    };
    console.log("data sent from handle add section----", data);
    try {
      const response = await fetch(
        `${process.env.API}/admin/Curriculum/section`,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const { newlyAddedSection } = await response.json();
        console.log("received in handleadd section", newlyAddedSection);
        setCurriculum((prevSections) =>
          prevSections.map((section) =>
            section.idindex === idindex ? newlyAddedSection : section
          )
        );
      } else {
        console.log("Failed to create section. Response from route", response);
        setCurriculum((prevSections) =>
          prevSections.filter((section) => section.idindex !== idindex)
        );
      }
    } catch (error) {
      console.log("ERROR inside handle add section fn------", error);
      setCurriculum((prevSections) =>
        prevSections.filter((section) => section?.idindex !== idindex)
      );
    }
  };

  const handleDeleteSection = async (sectionId) => {
    setDeletingSection(sectionId);
    const response = await fetch(
      `${process.env.API}/admin/Curriculum/section/${sectionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      }
    );
    console.log("Response from route in handle delte section-----", response);
    if (response.ok) {
      setTimeout(() => {
        setCurriculum((prevSections) =>
          prevSections.filter((section) => section?._id !== sectionId)
        );
        setDeleteLecture(null);
      }, 2000);
    } else {
      console.log("Error from handle delete section------");
    }
  };

  const startEditing = (type, sectionIndex, LectureIndex = null) => {
    setEditing({ type, sectionIndex, LectureIndex });

    if (type === "section") {
      setEditSectionValue(curriculum[sectionIndex]?.title);
      alert(curriculum[sectionIndex]?.title);
    } else if (type === "lecture") {
      setEditLectureValue(
        curriculum[sectionIndex]?.lectures[LectureIndex]?.title
      );
    }
  };

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

      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "#212121",
          border: "1px solid #E0E0E0",
        }}
      >
        {curriculum &&
          curriculum?.map((section, sectionIndex) => (
            <Box
              key={section?._id}
              sx={{
                backgroundColor:
                  deletingSection === section?._id ? "red" : "#212121",
                border: "1px solid #E0E0E0",
                padding: "16px",
                borderRadius: "4px",
              }}
            >
              {/* Combined title and icons in one horizontal row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <DescriptionIcon
                    sx={{
                      marginRight: "8px",
                      color: "#FFFF",
                    }}
                  />
                  Section {sectionIndex + 1} : {section.title}
                </Typography>

                <Box>
                  <IconButton
                    onClick={() => startEditing("section", sectionIndex)}
                  >
                    <EditIcon
                      sx={{
                        color: "#FFF",
                      }}
                    />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSection(section?._id)}>
                    <DeleteIcon
                      sx={{
                        color: "#FFF",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "16px",
                }}
              >
                {section?.lectures?.map((Lecture, LectureIndex) => (
                  <Box
                    key={Lecture?._id}
                    sx={{
                      backgroundColor: "#333",
                      padding: "16px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      border: "1px solid #E0E0E0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Lecture {LectureIndex + 1} : {Lecture?.title}
                      </Typography>

                      <Box>
                        <IconButton>
                          {Lecture?.content ? (
                            <LibraryAddCheckIcon
                              sx={{
                                color: "#fff",
                              }}
                            />
                          ) : (
                            <NotesIcon
                              sx={{
                                color: "#fff",
                              }}
                            />
                          )}
                        </IconButton>

                        <IconButton>
                          {Lecture?.videourl ? (
                            <OndemandVideoIcon
                              sx={{
                                color: "#fff",
                              }}
                            />
                          ) : (
                            <PersonalVideoIcon
                              sx={{
                                color: "#fff",
                              }}
                            />
                          )}
                        </IconButton>

                        <IconButton>
                          <EditIcon
                            sx={{
                              color: "#fff",
                            }}
                          />
                        </IconButton>

                        <IconButton>
                          <DeleteIcon
                            sx={{
                              color: "#fff",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSection}
          sx={{
            marginTop: "16px",
            color: "#ffff",
            backgroundColor: "#000",
            textTransform: "none",
          }}
        >
          Add Section
        </Button>
      </Box>

      <Sidebar />
    </>
  );
};
export default CurriculumEditor;
