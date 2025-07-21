import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";

export default function DashboardPage () {
  // Dummy data
  const stats = [
    { label: "Total Orders", value: 245, icon: <ShoppingCartIcon /> },
    { label: "Total Products", value: 87, icon: <StoreIcon /> },
    { label: "Total Users", value: 120, icon: <PeopleIcon /> },
  ];

  const recentOrders = [
    { id: 1, customer: "Alice", total: "$120.00" },
    { id: 2, customer: "Bob", total: "$75.00" },
    { id: 3, customer: "Charlie", total: "$210.00" },
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
        <Typography variant="h6">Recent Orders</Typography>
        <Paper elevation={2} sx={{ mt: 2 }}>
          <List>
            {recentOrders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem>
                  <ListItemText
                    primary={`Customer: ${order.customer}`}
                    secondary={`Total: ${order.total}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

