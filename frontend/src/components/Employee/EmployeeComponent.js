import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import Navbar from "../Employee/Navbar";
import EmployeeTable from "../Employee/EmployeeTable";
import EmployeeDialog from "../Employee/EmployeeDialog";
import DeleteDialog from "../Employee/DeleteDialog";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

import { getDepartments } from "../../services/departmentService";
import { getDesignations } from "../../services/designationService";

export default function EmployeeComponent() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [departments, setDepartments] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });


  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees(paginationModel.page + 1, paginationModel.pageSize);


      if (response.status === 200 && response.data) {
        setEmployees(response.data.data);
        setRowCount(response.data.meta.total);
      } else {
        showSnackbar("Failed to load employees", "error");
      }

    } catch (e) {
      showSnackbar("Unable to load employees", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const response = await getDepartments(paginationModel.page + 1, paginationModel.pageSize);
      if (response.status === 200 && response.data) {
        setDepartments(response.data.data);
        setRowCount(response.data.meta.total);
      } else {
        showSnackbar("Failed to load departments", "error");
      }
    } catch (e) {
      showSnackbar("Unable to load departments", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadDesignations = async () => {
    try {
      setLoading(true);
      const response = await getDesignations(paginationModel.page + 1, paginationModel.pageSize);


      if (response.status === 200 && response.data) {
        setDesignations(response.data.data);
        setRowCount(response.data.meta.total);
      } else {
        showSnackbar("Failed to load designations", "error");
      }

    } catch (e) {
      showSnackbar("Unable to load designations", "error");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadEmployees();
    loadDepartments();
    loadDesignations();
  }, [paginationModel]);

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setOpenDialog(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialog(true);
  };
  const countries = [
  { country: "India", currency: "INR" },
  { country: "USA", currency: "USD" },
  { country: "UK", currency: "GBP" },
  { country: "Canada", currency: "CAD" },
  { country: "Australia", currency: "AUD" },
  { country: "Singapore", currency: "SGD" },
];


  const saveEmployee = async (employee) => {
    try {
      if (employee.id) {
        delete employee.department; // Remove the department property before sending the update request
        delete employee.designation; // Remove the designation property before sending the update request
        await updateEmployee(employee.id, employee);
        showSnackbar("Employee Updated", "success");
      } else {
        delete employee.id; // Remove the id property before sending the add request
        delete employee.name;
        employee.department = employee.departmentId; // Remove the department property before sending the update request
        employee.designation = employee.designationId; // Remove the designation property before sending the update request
       const selectedCountry = countries.find(c => c.country === employee.country);
        if (selectedCountry) {
          employee.currency = selectedCountry.currency;
        }
        delete employee.departmentId; // Remove the departmentId property before sending the add request
        delete employee.designationId; // Remove the designationId property before sending the add request
        await addEmployee(employee);
        showSnackbar("Employee Added", "success");
      }

      loadEmployees();

      setOpenDialog(false);
    } catch {
      showSnackbar("Operation Failed", "error");
    }
  };

  const removeEmployee = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);

      showSnackbar("Employee Deleted", "success");

      loadEmployees();

      setDeleteDialog(false);
    } catch {
      showSnackbar("Delete Failed", "error");
    }
  };

  return (
    <>
      <Navbar onAdd={handleAdd} />
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              rowCount={rowCount}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          )}
        </Paper>
      </Container>

      <EmployeeDialog
        open={openDialog}
        employee={selectedEmployee}
        departments={departments}
        designations={designations}
        onClose={() => setOpenDialog(false)}
        onSave={saveEmployee}
      />

      <DeleteDialog
        open={deleteDialog}
        employee={selectedEmployee}
        onClose={() => setDeleteDialog(false)}
        onDelete={removeEmployee}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}