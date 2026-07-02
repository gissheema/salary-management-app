import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  People,
  Business,
  Badge,
  BarChart,
  Settings,
  Logout,
} from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Employees",
    icon: <People />,
    path: "/employees",
  },
  {
    text: "Departments",
    icon: <Business />,
    path: "/departments",
  },
  {
    text: "Designations",
    icon: <Badge />,
    path: "/designations",
  },
  {
    text: "Analytics",
    icon: <BarChart />,
    path: "/analytics",
  },
  {
    text: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
          SMA
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <List>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" onClick={onLogout}  />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export { drawerWidth };