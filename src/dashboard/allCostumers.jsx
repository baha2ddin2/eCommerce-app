import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const dummyUsers = [
  {
    user: "alice1",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: 1234567890,
    role: "customer",
    created_at: "2025-07-20T15:53:07.000Z"
  },
  {
    user: "charlie1",
    name: "Charlie Lee",
    email: "charlie@example.com",
    phone: 1234567892,
    role: "customer",
    created_at: "2025-07-20T15:53:07.000Z"
  },
  {
    user: "diana1",
    name: "Diana Gomez",
    email: "diana@example.com",
    phone: 1234567893,
    role: "customer",
    created_at: "2025-07-20T15:53:07.000Z"
  },
  {
    user: "ethan1",
    name: "Ethan Brown",
    email: "ethan@example.com",
    phone: 1234567894,
    role: "customer",
    created_at: "2025-07-20T15:53:07.000Z"
  }
];

export default function AllCustomersPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        👥 All Customers
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyUsers.map((user) => (
              <TableRow key={user.user}>
                <TableCell>{user.user}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Tooltip title="Delete user">
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
