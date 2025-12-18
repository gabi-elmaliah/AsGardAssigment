import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";

const initialForm = {
  firstName: "",
  lastName: "",
  style: "",
  preference: "",
};

function AddStudentDialog({ open, onClose, onSubmit, saving }) {
  const [form, setForm] = useState(initialForm);

  // When dialog opens/closes, reset the form
  useEffect(() => {
    if (open) setForm(initialForm);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Student</DialogTitle>

      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          value={form.firstName}
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          value={form.lastName}
          onChange={handleChange}
        />

        <TextField
          select
          label="Swimming Style"
          name="style"
          fullWidth
          margin="normal"
          value={form.style}
          onChange={handleChange}
        >
          <MenuItem value="freestyle">Freestyle</MenuItem>
          <MenuItem value="breaststroke">Breaststroke</MenuItem>
          <MenuItem value="butterfly">Butterfly</MenuItem>
          <MenuItem value="backstroke">Backstroke</MenuItem>
        </TextField>

        <TextField
          select
          label="Lesson Preference"
          name="preference"
          fullWidth
          margin="normal"
          value={form.preference}
          onChange={handleChange}
        >
          <MenuItem value="private_only">Private Only</MenuItem>
          <MenuItem value="group_only">Group Only</MenuItem>
          <MenuItem value="prefer_private">Prefer Private</MenuItem>
          <MenuItem value="prefer_group">Prefer Group</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={saving}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={saving}
          startIcon={
            saving ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          Add Student
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStudentDialog;
