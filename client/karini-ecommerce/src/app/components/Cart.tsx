/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CartItem } from "../types/cart";
import MenuBar from "./Menubar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import {
  addToCartApi,
  fetchCartItemsService,
  removeItemFromCartService,
  updateCartItems,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Row {
  _id: string;
  desc: string;
  qty: number;
  unit: number;
  price: number;
  action: string;
}
const TAX_RATE = 0.07;

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  // const [totalAmount, setTotalAmount] = useState<number>(0);
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchItems = async () => {
    try {
      const result = await fetchCartItemsService();
      setItems(result.data);
      setLoading(false);
      // setTotalAmount(result.totalAmount);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useMemo(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const rows = items.map((item: any) =>
      createRow(
        item.productId.Title,
        item.quantity,
        item.productId.VariantPrice,
        item.productId._id
      )
    );
    setRows(rows);
  }, [items]);

  const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  const priceRow = (qty: number, unit: number) => {
    return qty * unit;
  };

  const createRow = (desc: string, qty: number, unit: number, _id: string) => {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price, _id };
  };
  const subtotal = (items: readonly Row[]) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error loading items: {error}</div>;
  const modifyQty = (id: string, operation: string) => {
    console.log("#99==>", id);
    let exist: any;
    setItems((prevCart: any) => {
      console.log("prevcart", prevCart);
      const existingItem = prevCart.find(
        (cartItem: any) => cartItem.productId._id === id
      );
      console.log("existingItem", existingItem);

      if (existingItem) {
        exist = existingItem;
        console.log("existingItem", existingItem);
        // If item already exists, increment quantity in local state
        return prevCart.map((cartItem: any) =>
          cartItem.productId._id === id
            ? {
                ...cartItem,
                quantity:
                  operation === "+"
                    ? cartItem.quantity + 1
                    : cartItem.quantity - 1,
              }
            : cartItem
        );
      }
    });

    // Perform API call outside the setCart callback
    if (exist) {
      const quantity =
        operation === "+" ? exist.quantity + 1 : exist.quantity - 1;
      if (quantity <= 0) removeItemFromCart(exist.productId._id);
      else
        updateCartItems({
          ...exist,
          _id: exist.productId._id,
          quantity,
        });
    } else {
      addToCartApi({ ...items, _id: exist.productId._id });
    }
  };

  const removeItemFromCart = (id: string) => {
    console.log("#140==>", id);
    setItems((prevCart) => {
      return prevCart.filter((cartItem: any) => cartItem.productId._id !== id);
    });
    removeItemFromCartService(id);
  };

  return (
    <>
      <MenuBar items={items} page={"Cart"} />
      {items.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: Row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled button group"
                    >
                      <Button onClick={() => modifyQty(row._id, "-")}>-</Button>
                      <Button disabled>{row.qty}</Button>
                      <Button onClick={() => modifyQty(row._id, "+")}>+</Button>
                    </ButtonGroup>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => removeItemFromCart(row._id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px", // Or whatever height you need
            }}
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Your cart is currently empty.
                </Typography>
                <Typography variant="h5" component="div">
                  {
                    "Looks like you haven't added any items yet. Browse our amazing products and find something you'll love!"
                  }
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="small" onClick={() => router.push("/")}>
                  Start Shopping
                </Button>
              </CardActions>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
