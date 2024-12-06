import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    if (email) {
      console.log(`Password reset link sent to: ${email}`);
      alert("A password reset link has been sent to your email.");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #c3cfe2, #e2e2e2)", // gradient background
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          borderRadius: "16px",
          maxWidth: 400,
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
          Password reset link.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px",
            "&:hover": {
              background: "linear-gradient(to right, #5b86e5, #36d1dc)",
            },
          }}
          onClick={handlePasswordReset}
        >
          Send password reset link
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: "center", color: "#007BFF", cursor: "pointer" }}
          onClick={() => window.history.back()} // Navigate back to login
        >
          Go to Sign-in page.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;
