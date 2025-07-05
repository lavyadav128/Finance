import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  month: String, // Format: "2025-07"
  category: String, // e.g. "Food"
  amount: Number, // Budgeted amount
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
