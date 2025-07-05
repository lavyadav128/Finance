"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export default function BudgetVsActualChart() {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    Promise.all([
      fetch("/api/transactions").then((res) => res.json()),
      fetch("/api/budgets").then((res) => res.json()),
    ]).then(([transactions, budgets]) => {
      const currentMonth = new Date().toISOString().slice(0, 7); // "2025-07"
      const spending = {};

      transactions.forEach((t) => {
        const month = t.date.slice(0, 7);
        if (month === currentMonth) {
          spending[t.category] = (spending[t.category] || 0) + t.amount;
        }
      });

      const data = ["Food", "Transport", "Shopping", "Bills", "Other"].map(
        (cat) => {
          const budget = budgets.find(
            (b) => b.category === cat && b.month === currentMonth
          );
          return {
            category: cat,
            budget: budget?.amount || 0,
            actual: spending[cat] || 0,
          };
        }
      );

      setChartData(data);
    });
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 6,
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.default,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        color="primary"
        sx={{ mb: 2 }}
      >
        📊 Budget vs Actual (This Month)
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#1976d2" name="Budget" />
            <Bar dataKey="actual" fill="#2e7d32" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
