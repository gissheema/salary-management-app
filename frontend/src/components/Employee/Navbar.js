import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Navbar({ onAdd }) {
  return (
    <AppBar position="static" elevation={2} bgcolor="#eeeeee"
      color="#333"
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Salary Management System
        </Typography>

        <Button
          color="inherit"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
              bgcolor: "#000",
              color: "#fff",
            "&:hover": {
              bgcolor: "#ccc",
              color: "#000",
            },
          }}

        >
          Add Employee
        </Button>
      </Toolbar>
    </AppBar>
  );
}