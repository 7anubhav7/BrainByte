import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent } from "@mui/material";

import Footer from "@/components/footer/Footer";
import Accordionleft from "@/components/categorysingle/Accordion";
import Centerads from "@/components/categorysingle/Centerads";

import Content from "@/components/categorysingle/Content";
import Title from "@/components/categorysingle/Title";
import SimilarReads from "@/components/categorysingle/SimilarReads";
import Advertisement from "@/components/categorysingle/Advertisement";
import Advertisementtop from "@/components/categorysingle/Advertisementtop";

// import { useSession } from "next-auth/react";
import Advertisementbottom from "@/components/categorysingle/Advertisementbottom";

// import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function ContentLayout({ content, loading }) {
  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: "#212121", color: "#fff", minHeight: "100vh" }}>
        <Grid container spacing={1}>
          {/* Left Accordion Menu */}
          <Grid item xs={12} md={3}>
            <Accordionleft />
          </Grid>

          {/* Center Content */}
          <Box sx={{ p: 4 }}>
            <Centerads />
            <Title content={content} loading={loading} />
            <Content content={content} loading={loading} />
            <SimilarReads />
          </Box>

          {/* Right Ads Section */}
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              //  bgcolor: "#1e1e1e",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card sx={{ maxWidth: 300, bgcolor: "#212121", color: "#fff" }}>
              <CardContent>
                <Advertisement />
                <Advertisementtop />
                <Advertisementbottom />

                <Advertisement />
                <Advertisementtop />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Floating Menu Icon for Mobile */}
        {/* <Footer /> */}
      </Box>
      <Footer />
    </>
  );
}
