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

export default function EmployeeComponent() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees();

      if(response.status === 200 &&  response.data){
      setEmployees(response.data.data);

      }else {
      showSnackbar("Failed to load employees", "error");
      }

    } catch (e) {
      showSnackbar("Unable to load employees", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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

  const saveEmployee = async (employee) => {
    try {
      if (employee.id) {
        await updateEmployee(employee.id, employee);
        showSnackbar("Employee Updated", "success");
      } else {
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
            />
          )}
        </Paper>
      </Container>

      <EmployeeDialog
        open={openDialog}
        employee={selectedEmployee}
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