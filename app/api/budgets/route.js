import { connectDB } from "@/lib/db"; 
import Budget from "@/models/Budget";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { month, category, amount } = body;
  const existing = await Budget.findOne({ month, category });

  if (existing) {
    existing.amount = amount;
    await existing.save();
    return Response.json(existing);
  }

  const newBudget = await Budget.create({ month, category, amount });
  return Response.json(newBudget);
}

export async function GET(req) {
  await connectDB();
  const budgets = await Budget.find();
  return Response.json(budgets);
}
