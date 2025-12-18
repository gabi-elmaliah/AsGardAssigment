import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

const today = new Date();

const events = [
  {
    title: "Group Lesson",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0
    ),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      10,
      0
    ),
  },
  {
    title: "Private Lesson",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      45
    ),
  },
];



function SchedulePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSchedule = () => {
    // later: call backend
    console.log("Generate schedule clicked");
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
        <Typography variant="h4">
          Weekly Schedule
        </Typography>

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
            plugins={[timeGridPlugin, dayGridPlugin]}
            initialView="timeGridWeek"
            height={600}
            events={events}
        />
    </Paper>

    </Box>
  );
}

export default SchedulePage;

