import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Chip,
} from "@mui/material";

// Utility to group payload by order_id
function groupOrdersById(orderItems) {
  const grouped = {};
  orderItems.forEach((item) => {
    if (!grouped[item.order_id]) {
      grouped[item.order_id] = {
        status: item.status,
        customer_name: item.customer_name,
        adress: item.adress,
        items: [],
      };
    }
    grouped[item.order_id].items.push(item);
  });
  return grouped;
}

// Status color chip mapper
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function OrdersUI({ payload }) {
  const orders = groupOrdersById(payload);

  return (
    <Box maxWidth="md" mx="auto" p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your Orders
      </Typography>

      {Object.entries(orders).map(([orderId, order]) => {
        const total = order.items.reduce(
          (sum, i) => sum + parseFloat(i.total_price),
          0
        );

        return (
          <Paper key={orderId} variant="outlined" sx={{ mb: 4, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">Order #{orderId}</Typography>
              <Chip label={order.status} color={getStatusColor(order.status)} />
            </Box>

            <Typography variant="subtitle1">
              Customer: {order.customer_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: {order.adress ?? "No address provided"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">${item.total_price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
                    Order Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ${total.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        );
      })}
    </Box>
  );
}
