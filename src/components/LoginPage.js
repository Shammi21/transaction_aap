import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Checkbox, FormControlLabel, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsername = "test";
    const validPassword = "123";

    if (username === validUsername && password === validPassword) {
      console.log("Login Successful");
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #d16ba5, #86a8e7, #5ffbf1)", // gradient background
      }}
    >
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
                <Typography variant="body2" sx={{ color: "#007BFF", cursor: "pointer" }}>
                  Forgot Password?
                </Typography>
              </Grid>

              {/* Login Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
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
                  Login
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
