import React from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <CssBaseline />

      <ToastContainer position="bottom-right" autoClose={4000} />

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Asgard Pool Scheduler
          </Typography>

          <Button color="inherit" component={Link} to="/students">
            Students
          </Button>

          <Button color="inherit" component={Link} to="/schedule">
            Schedule
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
