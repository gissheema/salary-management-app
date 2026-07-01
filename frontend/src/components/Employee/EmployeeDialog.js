import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";

const initialState = {
  id: null,
  name: "",
  email: "",
  department: "",
  salary: "",
};

export default function EmployeeDialog({
  open,
  employee,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData(initialState);
    }
  }, [employee, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {

    let temp = {};

    if (!formData.firstName.trim())
      temp.firstName = "First name is required";

    if (!formData.lastName.trim())
      temp.lastName = "Last name is required";

    if (!formData.email.trim())
      temp.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    )
      temp.email = "Invalid email";

    // if (!formData.department.trim())
    //   temp.department = "Department is required";

    if (
      formData.salary === "" ||
      Number(formData.salary) <= 0
    )
      temp.salary = "Salary must be greater than zero";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      ...formData,
      salary: Number(formData.salary),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {formData.id
          ? "Update Employee"
          : "Add Employee"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Employee Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department?.name}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {formData.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}