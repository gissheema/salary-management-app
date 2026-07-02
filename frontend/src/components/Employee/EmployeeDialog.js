import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const initialState = {
  id: null,
  name: "",
  email: "",
  department: "",
  departmentId: "",
  designation: "",
  designationId: "",
  salary: "",
  country: "",
  employmentStatus: "",
};

const countries = [
  { country: "India", currency: "INR" },
  { country: "USA", currency: "USD" },
  { country: "UK", currency: "GBP" },
  { country: "Canada", currency: "CAD" },
  { country: "Australia", currency: "AUD" },
  { country: "Singapore", currency: "SGD" },
];

const employmentStatuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "TERMINATED", label: "Terminated" },
];

export default function EmployeeDialog({
  open,
  employee,
  departments,
  designations,
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
  }, [employee, open, departments, designations]);

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

    if (!formData.departmentId.trim())
      temp.departmentId = "Department is required";

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
      country: formData.country,
      employmentStatus: formData.employmentStatus,
      designationId: (formData.designationId),
      departmentId: (formData.departmentId),
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
              label="First Name"
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

            <Select
              fullWidth
              name="departmentId"
              value={formData.departmentId}
              labelId="department-label"
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>


            <Select
              fullWidth
              name="designationId"
              value={formData.designationId}
              labelId="designation-label"
              label="Designation"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Designation</em>
              </MenuItem>

              {designations.map((designation) => (
                <MenuItem key={designation.id} value={designation.id}>
                  {designation.name}
                </MenuItem>
              ))}
            </Select>

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


          <Grid size={{ xs: 12, md: 6 }}>


            <Select
              fullWidth
              name="country"
              value={formData.country}
              labelId="country-label"
              label="Country"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Country</em>
              </MenuItem>

              {countries.map((country) => (
                <MenuItem key={country.country} value={country.country}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>


            <Select
              fullWidth
              name="employmentStatus"
              value={formData.employmentStatus}
              labelId="employmentStatus-label"
              label="Employment Status"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>

              {employmentStatuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.value}
                </MenuItem>
              ))}
            </Select>

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