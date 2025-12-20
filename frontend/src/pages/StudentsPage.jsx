import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddStudentDialog from "../components/AddStudentDialog";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  fetchStudents,
  deleteStudent,
  createStudent,
} from "../services/studentsService";

function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  const handleEditClick = (student) => {
    navigate(`/students/${student._id}/edit`);
  };

  const handleDeleteClick = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );

    if (!confirmed) return;

    try {
      await deleteStudent(student._id);
      setStudents((prev) => prev.filter((s) => s._id !== student._id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateStudent = async (form) => {
    try {
      setSaving(true);

      const createdStudent = await createStudent(form);

      setStudents((prev) => [createdStudent, ...prev]);
      setOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Box>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box>
              <Typography variant="h4">Students</Typography>
              <Typography variant="body2" color="text.secondary">
                Total students: {students.length}
              </Typography>
            </Box>

            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Student
            </Button>
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Swimming Style</TableCell>
                  <TableCell>Lesson Preference</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No students added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.style}</TableCell>
                      <TableCell>{student.preference}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          aria-label="edit student"
                          onClick={() => handleEditClick(student)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          aria-label="delete student"
                          onClick={() => handleDeleteClick(student)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <AddStudentDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateStudent}
        saving={saving}
      />
    </>
  );
}

export default StudentsPage;
