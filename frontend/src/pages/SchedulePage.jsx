import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { generateSchedule } from "../services/scheduleService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [weekStart, setWeekStart] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [showConflicts, setShowConflicts] = useState(false);

  const handleGenerateSchedule = async () => {
    setLoading(true);
    setError(null);

    try {
      const { lessons, conflicts } = await generateSchedule(weekStart);
      const calendarEvents = mapLessonsToEvents(lessons);

      setEvents(calendarEvents);

      setConflicts(conflicts || []);

      // STEP 1: decide if popup should open
      if (conflicts && conflicts.length > 0) {
        setShowConflicts(true);
      } else {
        setShowConflicts(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (info) => {
    const { instructor, students, type, style } = info.event.extendedProps;

    const instructorName = `${instructor.name}`;

    const studentsNames = students
      .map((s) => `${s.firstName} ${s.lastName}`)
      .join(", ");

    const message = `
        Lesson Type: ${type}
        Style: ${style}

        Instructor:
        ${instructorName}

        Students:
        ${studentsNames}
        `;

    alert(message);
  };

  const mapLessonsToEvents = (lessons) => {
    return lessons.map((lesson) => ({
      id: lesson.id,
      title:
        lesson.type === "group"
          ? `Group ${lesson.style}`
          : `Private ${lesson.style}`,
      start: lesson.start,
      end: lesson.end,
      extendedProps: {
        instructor: lesson.instructor,
        students: lesson.students,
        type: lesson.type,
        style: lesson.style,
      },
    }));
  };

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Weekly Schedule</Typography>

        <Button
          variant="contained"
          onClick={handleGenerateSchedule}
          disabled={loading}
        >
          Generate Schedule
        </Button>
      </Box>

      {/* Status */}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Paper elevation={1}>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          height={600}
          eventClick={handleEventClick}
          datesSet={(info) => {
            // info.start is Sunday 00:00
            setWeekStart(info.start.toISOString());
            console.log("Week start set to:", info.start.toISOString());
          }}
          events={events}
        />
      </Paper>
      <Dialog
        open={showConflicts}
        onClose={() => setShowConflicts(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Scheduling Conflicts</DialogTitle>

        <DialogContent dividers>
          {conflicts.length === 0 ? (
            <Typography>No conflicts 🎉</Typography>
          ) : (
            <List>
              {conflicts.map((conflict, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={conflict.type}
                    secondary={
                      <>
                        <Typography variant="body2">
                          {conflict.message}
                        </Typography>
                        {conflict.student && (
                          <Typography variant="caption" color="text.secondary">
                            Student: {conflict.student.firstName}{" "}
                            {conflict.student.lastName}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowConflicts(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SchedulePage;
