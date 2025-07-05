"use client";

import { useState, useEffect } from "react";
import ContentDisplay from "@/components/contentdisplay/ContentDisplay";

const ContentViewPage = ({ params: promiseParams }) => {
  const [content, setContent] = useState(null);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await promiseParams;
      setParams(resolvedParams);
    };
    fetchParams();
  }, [promiseParams]);

  useEffect(() => {
    if (!params?.slug) return;
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.API}/content/${params?.slug}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch content!!");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        setError(error.message || "An Error Occurred!");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [params]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <ContentDisplay content={content} loading={loading} />
    </>
  );
};

export default ContentViewPage;
