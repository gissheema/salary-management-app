import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DeleteDialog({
  open,
  employee,
  onClose,
  onDelete,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Delete Employee</DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <WarningAmberIcon
            color="warning"
            sx={{ fontSize: 70 }}
          />

          <Typography align="center">
            Are you sure you want to delete
          </Typography>

          <Typography
            variant="h6"
            color="error"
          >
            {employee?.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            This action cannot be undone.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}