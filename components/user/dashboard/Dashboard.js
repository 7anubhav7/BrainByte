"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CircularProgress,
  CardActionArea,
  CardContent,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import Orders from "@/components/user/order/Order";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API}/user/analytics`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log("Error from effect---", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = [
    {
      name: "Subscriptions",
      icon: <BarChartIcon />,
      count: data?.usersSubscriptionCount,
    },
    {
      name: "Orders",
      icon: <GroupIcon />,
      count: data?.userOrderCount,
    },
    {
      name: "User Courses",
      icon: <ShoppingCartIcon />,
      count: data?.userCourseCount,
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Failed to load data
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          color: "#fff",
          textAlign: "center",
          py: 4,
          px: 15,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(900deg, #ffa000, #e52e71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rbga(0,0,0,0.2)",
            }}
          >
            Welcome to Analytics Dashboard
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.6,
              color: "#d1d1d1",
              mx: "auto",
            }}
          >
            View insights on orders, users, subscriptions and more in one place
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {pages.map((page, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 2,
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#333",
                  },
                }}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Box sx={{ fontSize: 48, color: "#ff8a00" }}>
                      {page.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      {page.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "#d1d1d1",
                      }}
                    >
                      {page?.count || "N/A"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "black",
          color: "#fff",
          textAlign: "center",
          py: 4,
          px: 15,
        }}
      >
        <Orders />
      </Box>
    </>
  );
};

export default Dashboard;
