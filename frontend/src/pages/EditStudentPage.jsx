import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentById,updateStudent } from "../services/studentsService";




function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await fetchStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateStudent(id, student);
      navigate("/students");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
};

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
  <Typography variant="h4" mb={3}>
    Edit Student
  </Typography>

  <Box maxWidth={500}>
    <TextField
      label="First Name"
      name="firstName"
      fullWidth
      margin="normal"
      onChange={handleChange}
      value={student.firstName}
    />

    <TextField
      label="Last Name"
      name="lastName"
      fullWidth
      margin="normal"
      onChange={handleChange}
      value={student.lastName}
    />

    <TextField
      select
      label="Swimming Style"
      name="style"
      fullWidth
      margin="normal"
      onChange={handleChange}
      value={student.style}
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
      onChange={handleChange}
      value={student.preference}
    >
      <MenuItem value="private_only">Private Only</MenuItem>
      <MenuItem value="group_only">Group Only</MenuItem>
      <MenuItem value="prefer_private">Prefer Private</MenuItem>
      <MenuItem value="prefer_group">Prefer Group</MenuItem>
    </TextField>

    <Box mt={3} display="flex" gap={2}>
      <Button
        variant="outlined"
        onClick={() => navigate("/students")}
      >
        Cancel
      </Button>

      <Button variant="contained" color="primary" onClick={handleSave} 
      disabled={saving} 
      startIcon={
        saving ? <CircularProgress size={20} color="inherit" /> : null
      }>  
        Save Changes
      </Button>
    </Box>
  </Box>
</Box>
  );
}

export default EditStudentPage