import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Paper, Grid, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState({
    username: false,
    password: false
  })
  const [snakBar, setSnakBar] = useState({
    text : '',
    status: ''
  })

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if(!username && !password){
      setValidationError(() => ({password : true, username : true}))
      return;
    }
    if (!username) {
      setValidationError((prev) => ({...prev, username : true}))
      return;
    }
    if (!password) {
      setValidationError((prev) => ({...prev, password : true}))
      return;
    }
    
    
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      });
      if (response?.data) {
        navigate("/dashboard");
      } else {
        setSnakBar({text : 'Invalid username or password', status: 'error'})
      }
      setSnakBar({text : 'Login successfully', status: 'success'})
      setLoading(false);
      return response.data; 
    } catch (error) {
      handleClick()
      console.error("Login failed:", error.response?.data || error.message);
      setLoading(false);
      setSnakBar({text : 'Login failed', status: 'error'})
    }

  }; 

  useEffect(() => {
    setValidationError({
      username: false,
      password: false
    })
  }, [username, password])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #d16ba5, #86a8e7, #5ffbf1)", // Gradient background
      }}
    >
      <Snackbar anchorOrigin={{ vertical : 'top', horizontal : 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snakBar.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snakBar.text}
        </Alert>
      </Snackbar>
      <Paper
        elevation={12}
        sx={{
          padding: 4,
          borderRadius: "16px",
          maxWidth: 400,
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* User Icon */}
          <Box
            sx={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#ff9a8b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontSize: "32px" }}>
              👤
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#333",
              marginBottom: 2,
            }}
          >
            Login to Nova
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              {/* Username Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Username"
                  value={username}
                  error={validationError.username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  error={validationError.password}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Grid>

              {/* Remember Me and Forgot Password */}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                  sx={{ margin: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#007BFF", cursor: "pointer" }}
                  onClick={() => navigate("/forgot-password")} // Navigate to forgot password page
                >
                  Forgot Password?
                </Typography>
              </Grid>

              {/* Login Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    color: "#fff",
                    "&:hover": {
                      background: "linear-gradient(to right, #feb47b, #ff7e5f)",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
