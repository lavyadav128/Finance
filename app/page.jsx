"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SetBudgetsForm from "@/components/SetBudgetsForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";
import { useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
  Container,
} from "@mui/material";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          background: theme.palette.background.paper,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          gutterBottom
          align="center"
          color="primary"
        >
          💰 Finance Tracker
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <TransactionForm onSuccess={() => setRefresh(refresh + 1)} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <TransactionList refresh={refresh} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <MonthlyBarChart refresh={refresh} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryPieChart refresh={refresh} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <SetBudgetsForm onSuccess={() => setRefresh(refresh + 1)} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <BudgetVsActualChart />
        </Box>
      </Paper>
    </Container>
  );
}
