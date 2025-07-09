"use client";

import Sidebar from "@/components/user/sidebar/Sidebar";
import Subscription from "@/components/user/subscription/Subscription";
import ProfileImage from "@/components/user/profileimage/ProfileImage";
import { Box, Grid, Typography } from "@mui/material";

const SubscriptionPage = () => {
  return (
    <>
      <ProfileImage />
      <Subscription />
      <Sidebar />
    </>
  );
};

export default SubscriptionPage;
