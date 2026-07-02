
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeComponent from "./components/Employee/EmployeeComponent";
import SideBar from "./components/SideBar/SideBar"
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

import "./styles/global.css";
import "./App.css";
import { useEffect, useState } from "react";
export default function App() {

    const [token, setToken] = useState(null);

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
            <div className="sidebar">

              <SideBar onLogout={handleLogout}/>
            </div>
            <div className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeComponent />} />
              </Routes>
            </div>
          </div>







      ) : (
        <Login onLogin={handleLogin} />
      )}


          
        </BrowserRouter>
      </div>
    </>
  );
}