// import Image from "next/image";
"use client";
import styles from "./page.module.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Tabs from "@/components/tab/Tab";
import Course from "@/components/course/Course";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Tabs />
      <Course />
      <Footer />
    </div>
  );
}
