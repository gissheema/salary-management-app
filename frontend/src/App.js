
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeComponent from "./components/Employee/EmployeeComponent";
import SideBar from "./components/SideBar/SideBar"
import Dashboard from "./components/Dashboard/Dashboard";

import "./styles/global.css";
import "./App.css";
export default function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>

          <div className="layout">
            <div className="sidebar">

              <SideBar />
            </div>
            <div className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeComponent />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}