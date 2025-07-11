"use client";

import { useState } from "react";
import {
  Paper,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export default function TransactionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description)
      return alert("All fields required");

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ amount, date, description, category }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("Other");
      onSuccess();
    }
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
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        ➕ Add Transaction
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 1, py: 1.2 }}
        >
          Add Transaction
        </Button>
      </Box>
    </Paper>
  );
}
