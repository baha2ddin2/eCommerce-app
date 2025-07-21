import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch , useSelector } from "react-redux";
import { allOrders } from "../slices/orders";
import { getUsers } from "../slices/user";
import { Link as RouteLink } from "react-router-dom";

export default function DashboardPage () {
  const orders = useSelector((state)=>state.order.allOrders)||[]
  const products =useSelector((state)=>state.product.data)||[]
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.user.allUsers)||[]
  useEffect(()=>{
    dispatch(allOrders())
    dispatch(getUsers())
  },[dispatch])

  console.log(orders)
  // Dummy data
  const stats = [
    { label: "Total Orders", value: orders.length , icon: <ShoppingCartIcon /> },
    { label: "Total Products", value: products.length, icon: <StoreIcon /> },
    { label: "Total Users", value: users.length, icon: <PeopleIcon /> },
  ];


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
              {item.icon}
              <Box ml={2}>
                <Typography variant="h6">{item.value}</Typography>
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
  <Typography variant="h6" gutterBottom>
    Recent Orders
  </Typography>

  <Grid container spacing={3}>
    {orders.map((order) => (
      <Link component={RouteLink} to={`order/${order.id}`} key={order.id} underline="none">
        <Grid item xs={12} sm={6} md={4} >
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Order #{order.id}
              </Typography>
            </Box>

            <Typography variant="body2">
              <strong>Customer:</strong> {order.user}
            </Typography>
            <Typography variant="body2">
              <strong>Total:</strong> ${order.total}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    order.status === "pending" || order.status ==="delivered"
                      ? "orange"
                      : order.status === "shipped"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {order.adress}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(order.created_at).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Link>
    ))}
  </Grid>
</Box>

    </Box>
  );
};

