"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.API}/user/orders`);
        if (!response.ok) {
          throw new Error("Error fetching orders");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mt: 4,
          textAlign: "center",
        }}
      >
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Container maxWidth="x1">
        <Typography
          variant={isMobile ? "h5" : "h3"}
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#8A12FC",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Your orders
        </Typography>

        {orders?.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No Orders Found!
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "purple",
                    "&>*": {
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Payment Method
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Payment Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "purple",
                        color: "pointer",
                        transition: "background-color 0.3s ease",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order._id}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.orderStatus}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.transactionId.substring(0, 10)}...
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      ${order.totalPrice}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};
export default Orders;
