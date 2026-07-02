
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeComponent from "./components/Employee/EmployeeComponent";
import SideBar, { drawerWidth } from "./components/SideBar/SideBar"
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

import "./styles/global.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function App() {

  const [token, setToken] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          {token ? (
            <div className="layout" token={token} >

              <div
                position="fixed"
                className="mobile-menu-icon"
                sx={{
                  width: {
                    md: `calc(100% - ${drawerWidth}px)`,

                  },
                }}
              >
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </div>


              <div className="sidebar">

                <SideBar onLogout={handleLogout}
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
              </div>

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: {
                    md: `calc(100% - ${drawerWidth}px)`,
                  }
                }}
              >

                <div className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<EmployeeComponent />} />
                  </Routes>
                </div>
              </Box>
            </div>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </BrowserRouter>
      </div>
    </>
  );
}