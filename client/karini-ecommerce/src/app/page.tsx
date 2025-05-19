"use client";

import { useEffect, useState } from "react";
import { Item } from "./types/item";
import { CartItem } from "./types/cart";
import MenuBar from "./components/Menubar";
// import FileUpload from "./components/FileUpload";
import InfiniteProductList from "./components/InfiniProductList";
import {
  addToCartApi,
  ChatService,
  DBSearchService,
  fetchCartItemsService,
  updateCartItems,
} from "@/lib/utils";

const Home: React.FC = () => {
  const [apiItem, setAPIItem] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chatTerm, setChatTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleChat = async (term: string) => {
    console.log(term);
    setChatTerm(term);
    if (term !== "") {
      const result = await ChatService(term);
      if (Array.isArray(result.response)) setAPIItem(result.response);
      else setAPIItem([]);
    } else setAPIItem([]);
  };

  const handleDBSearch = async (term: string) => {
    console.log(term);
    setSearchTerm(term);
    if (term !== "") {
      const result = await DBSearchService(term);
      if (Array.isArray(result.response)) setAPIItem(result.response);
      else setAPIItem([]);
    } else setAPIItem([]);
  };

  const handleCartChange = (item: Item, operation: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let exist: any = null;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        exist = existingItem;
        // If item already exists, increment quantity in local state
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity:
                  operation === "+"
                    ? cartItem.quantity + 1
                    : cartItem.quantity - 1,
              }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    // Perform API call outside the setCart callback
    if (exist) {
      updateCartItems({
        ...exist,
        quantity: operation === "+" ? exist.quantity + 1 : exist.quantity - 1,
      });
    } else {
      addToCartApi(item);
    }
  };

  const fetchCartItem = async () => {
    const result = await fetchCartItemsService();
    setCart(result.data);
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <MenuBar
          page="Home"
          items={cart}
          onSearch={handleSearch}
          handleChat={handleChat}
          handleDBSearch={handleDBSearch}
        />
      </div>
      <div style={{ paddingTop: "60px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <InfiniteProductList
            handleCartChange={handleCartChange}
            searchTerm={searchTerm}
            uploadMessage={"uploadMessage"}
            apiItems={apiItem}
            chatTerm={chatTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
