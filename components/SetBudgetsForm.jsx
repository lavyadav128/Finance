"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  useTheme,
} from "@mui/material";

export default function SetBudgetsForm({ onSuccess }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month, category, amount: Number(amount) }),
    });

    setAmount("");
    onSuccess?.();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 6,
        borderRadius: 3,
        backgroundColor: theme.palette.background.default,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
        📅 Set Budget
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          type="number"
          label="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1, py: 1.2 }}
        >
          Save Budget
        </Button>
      </Box>
    </Paper>
  );
}
