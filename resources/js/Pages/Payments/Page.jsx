import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns"; // Import the columns

const data = [
  { status: "success", email: "test@example.com", amount: 100 },
  { status: "pending", email: "user@example.com", amount: 150 },
  { status: "success", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
  { status: "pending", email: "test@example.com", amount: 100 },
  { status: "success", email: "user@example.com", amount: 150 },
];

export default function Page() {
  return (
    <div>
      <DataTable data={data} columns={columns} /> {/* Passing columns as props */}
    </div>
  );
}
