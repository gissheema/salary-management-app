import { useMemo, useState } from "react";

import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {

    console.log("employees", employees);
    return employees.filter((emp) => {
      const value = search.toLowerCase();

      return (
        emp.firstName?.toLowerCase().includes(value) ||
        emp.lastName?.toLowerCase().includes(value) ||
        emp.email?.toLowerCase().includes(value) ||
        emp.department?.name?.toLowerCase().includes(value)
      );
    });
  }, [employees, search]);

  const columns = [
    {
      field: "employeeCode",
      headerName: "ID",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "department.name",
      headerName: "Department",
      flex: 1,
      valueGetter: (value, row) => row.department?.name,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <TextField
          size="small"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}