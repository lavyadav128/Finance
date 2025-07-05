import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function POST(req) {
  const body = await req.json();
  await connectDB();
  const tx = await Transaction.create(body);
  return Response.json(tx);
}

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}
