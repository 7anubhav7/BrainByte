import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent } from "@mui/material";

// import Footer from "@/components/footer/Footer";
import Accordionleft from "@/components/categorysingle/Accordion";
//import Centerads from "@/components/categorysingle/Centerads";

//import Content from "@/components/categorysingle/Content";
// import Title from "@/components/categorysingle/Title";
//import SimilarReads from "@/components/categorysingle/SimilarReads";
//import Advertisement from "@/components/categorysingle/Advertisement";
//import Advertisementtop from "@/components/categorysingle/Advertisementtop";

// import { useSession } from "next-auth/react";
//import Advertisementbottom from "@/components/categorysingle/Advertisementbottom";

// import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function ContentLayout({ content, loading }) {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#212121",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Accordionleft />
            {/* <Grid item xs={12} md={7}>
              <Centerads />
              <Content />
              <SimilarReads />
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card>
                  <CardContent>
                    <Advertisement />
                    <Advertisementtop />
                    <Advertisementbottom />
                    <Advertisement />
                    <Advertisementtop />
                  </CardContent>
                </Card>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
