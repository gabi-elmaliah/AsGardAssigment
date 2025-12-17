import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";

const App = () => {
  return (
      <>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Asgard Pool Scheduler
          </Typography>

          <Button color="inherit">Students</Button>
          <Button color="inherit">Schedule</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Add students, generate schedule, and view weekly gantt.
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default App