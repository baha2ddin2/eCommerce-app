import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useParams } from "react-router-dom";
import { changeStatus, getOrderById } from "../slices/orders";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orderById) || [];
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getOrderById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (order.length > 0) {
      setStatus(order[0]?.status || "");
    }
  }, [order]);

  const total = order
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  if (!order || order.length === 0) {
    return <Typography color="error">Order not found.</Typography>;
  }
  const handelchange = (e) =>{
    const newStatus = e.target.value;
    setStatus(newStatus);
    dispatch(changeStatus({status : newStatus ,total,id})).then(() => {
      dispatch(getOrderById({ id }))
    });
  }

  return (
    <Box p={4} maxWidth="1000px" mx="auto">
      <Typography variant="h4" gutterBottom>
        🧾 Order #{id} Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Customer Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Name:</strong> {order[0].customer_name}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {order[0].adress}
        </Typography>

        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Chip
            label={status}
            color={
              status === "shipped"
                ? "success"
                : status === "cancelled"
                ? "error"
                : "warning"
            }
            variant="outlined"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          />

          <FormControl size="small">
            <InputLabel id="status-label">Change Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Change Status"
              onChange={handelchange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        🛒 Ordered Products
      </Typography>
      <Paper elevation={2} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${parseFloat(item.price).toFixed(2)}</TableCell>
                <TableCell>
                  ${(item.quantity * parseFloat(item.price)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <strong>Grand Total</strong>
              </TableCell>
              <TableCell>
                <strong>${total}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
