import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation"; // Import useRouter
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoneyIcon from "@mui/icons-material/Money";

import {
  drawerStyles,
  listItemStyles,
  listItemIconStyles,
  logoutIconStyles,
  appBarStyles,
  drawerMobileStyles,
  mainContentStyles,
} from "./sidebarStyles";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin",
    },
    {
      text: "Create Content & Courses",
      icon: <ChatIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/content/create",
    },
    {
      text: "Courses",
      icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/course",
    },
    {
      text: "Tutorial",
      icon: <BuildIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/content",
    },
    {
      text: "Home",
      icon: <LiveHelpIcon sx={{ fontSize: "32px" }} />,
      link: "/",
    },
    {
      text: "Create Category",
      icon: <CategoryIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/category",
    },
    {
      text: "Create SubCategory",
      icon: <AcUnitIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/subcategory",
    },
    {
      text: "Create Category With SubCategory",
      icon: <AlignVerticalCenterIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/catewithsubcate",
    },
    {
      text: "All User",
      icon: <ManageAccountsIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/alluser",
    },
    {
      text: "Pricing",
      icon: <MoneyIcon sx={{ fontSize: "32px" }} />,
      link: "/pricing",
    },
  ];

  return (
    <Box sx={{ display: "flex " }}>
      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={drawerStyles(isHovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: "10px",
                  padding: isHovered ? "10px 20px" : "10px 0",
                  cursor: "pointer",
                  ":hover": {
                    borderLeft: "19px solid blueviolet !important",
                  },
                  transition: "border-bottom 0.3s ease",
                }}
                onClick={() => router.push(item.link)} // Navigate using router.push
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: isHovered ? "50px" : "40px",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isHovered && (
                  <ListItemText
                    primary={item.text}
                    sx={{ marginLeft: "10px", fontSize: "18px" }}
                  />
                )}
              </ListItem>
            ))}

            {/* Logout Item */}
            <ListItem
              sx={{
                marginBottom: "10px",
                padding: isHovered ? "10px 20px" : "10px 0",
                cursor: "pointer",
                ":hover": {
                  borderLeft: "19px solid blueviolet !important",
                },
                transition: "border-bottom 0.3s ease",
              }}
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isHovered ? "50px" : "40px",
                  justifyContent: "center",
                  marginLeft: "20px",
                }}
              >
                <ExitToAppIcon sx={{ fontSize: "32px", color: "blueviolet" }} />
              </ListItemIcon>
              {isHovered && (
                <ListItemText
                  primary="Logout"
                  sx={{ marginLeft: "10px", fontSize: "18px" }}
                />
              )}
            </ListItem>
          </List>
        </Drawer>
      )}

      {isSmallScreen && (
        <AppBar position="fixed" sx={{ backgroundColor: "#1a1a1a" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: isSmallScreen ? "block" : "none",
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "#1a1a1a",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push(item.link); // Navigate using router.push
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: "100px", xs: "0" },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;
