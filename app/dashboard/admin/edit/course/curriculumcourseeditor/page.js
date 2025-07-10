"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CourseEdit from "@/components/CurriculumCourseEditor/courseEdit/CourseEdit";
import Sidebar from "@/components/sidebar/SideBar";
import { useSearchParams } from "next/navigation";

const ContentViewPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.API}/admin/course/edit/${search}`
        );

        const data = await response.json();
        setContent(data);

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
        console.log("error from effect hook---", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [search]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Sidebar />

      <CourseEdit content={content} loading={loading} />
    </>
  );
};

export default ContentViewPage;
