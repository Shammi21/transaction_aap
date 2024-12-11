import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  Dialog,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

const AddClientPage = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    fee_percentage: 0,
    wallet_address: "",
    type: "Client", // Preselect the type as Client
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Can be "success", "error", "info", or "warning"
  });

  const handleClose = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      name: "",
      fee_percentage: 0,
      wallet_address: "",
      type: "Client", // Reset to preselected type
    });
    setErrors({});
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFeePercentageChange = (operation) => {
    setFormData((prevData) => ({
      ...prevData,
      fee_percentage:
        operation === "increase" ? prevData.fee_percentage + 1 : Math.max(0, prevData.fee_percentage - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "wallet_address" && !formData[key]) {
        newErrors[key] = `${key.replace("_", " ")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully with data:", formData);

    setSnackbar({
      open: true,
      message: "Client created successfully!",
      severity: "success",
    });

    setFormData({
      username: "",
      email: "",
      password: "",
      name: "",
      fee_percentage: 0,
      wallet_address: "",
      type: "Client", // Reset to preselected type
    });
    setErrors({});
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Card>
        <CardHeader
          title="Add Client"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            textAlign: "center",
            padding: "16px",
            fontSize: "1.5rem",
          }}
        />
        <Divider />
        <CardContent sx={{ padding: "24px" }}>
          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              {Object.keys(formData).map((key) => (
                <Grid item xs={12} sm={key === "fee_percentage" || key === "type" ? 6 : 12} key={key}>
                  {key === "type" ? (
                    <TextField
                      select
                      label="Type"
                      name="type"
                      variant="outlined"
                      fullWidth
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      error={!!errors[key]}
                      helperText={errors[key]}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </TextField>
                  ) : key === "fee_percentage" ? (
                    <TextField
                      label="Fee Percentage"
                      name="fee_percentage"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      error={!!errors[key]}
                      helperText={errors[key]}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Increase">
                              <IconButton
                                onClick={() => handleFeePercentageChange("increase")}
                                color="primary"
                              >
                                <KeyboardArrowUpIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Decrease">
                              <IconButton
                                onClick={() => handleFeePercentageChange("decrease")}
                                color="primary"
                              >
                                <KeyboardArrowDownIcon />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <TextField
                      label={key
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                      name={key}
                      variant="outlined"
                      fullWidth
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${key.replace("_", " ")}`}
                      required={key !== "wallet_address"} // wallet_address is not required
                      error={!!errors[key]}
                      helperText={errors[key]}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{ fontWeight: "bold" }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  backgroundColor: "#50e3c2",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "8px 24px",
                  "&:hover": { backgroundColor: "#3cb591" },
                }}
              >
                Create Client
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AddClientPage;
