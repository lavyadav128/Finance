"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

export default function CategoryPieChart({ refresh }) {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const grouped = {};
        transactions.forEach((t) => {
          grouped[t.category] = (grouped[t.category] || 0) + t.amount;
        });

        const pieData = Object.entries(grouped).map(([name, value]) => ({
          name,
          value,
        }));

        setData(pieData);
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
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="secondary"
        gutterBottom
      >
        📊 Category Breakdown
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <PieChart width={350} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Paper>
  );
}
