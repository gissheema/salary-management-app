import { useEffect, useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
function EmployeeForm({ saveEmployee, selectedEmployee }) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee])

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmployee(employee);
    setEmployee({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {employee.id ? "Update Employee" : "Add Employee"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            {employee.id ? "Update" : "Save"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EmployeeForm;