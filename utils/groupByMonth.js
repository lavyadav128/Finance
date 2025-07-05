export function groupTransactionsByMonth(transactions) {
    const result = {};
  
    for (const tx of transactions) {
      const date = new Date(tx.date);
      const month = date.toLocaleString("default", { month: "short", year: "numeric" });
  
      if (!result[month]) result[month] = 0;
      result[month] += tx.amount;
    }
  
    // Convert to array for Recharts
    return Object.entries(result).map(([month, total]) => ({
      month,
      total,
    }));
  }
  