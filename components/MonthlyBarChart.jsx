"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { groupTransactionsByMonth } from "@/utils/groupByMonth";
import {
  Paper,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export default function MonthlyBarChart({ refresh }) {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const grouped = groupTransactionsByMonth(transactions);
        setData(grouped);
      });
  }, [refresh]);

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
        color="primary"
        gutterBottom
      >
        📊 Monthly Expenses
      </Typography>

      {data.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No data yet
        </Typography>
      ) : (
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
}
