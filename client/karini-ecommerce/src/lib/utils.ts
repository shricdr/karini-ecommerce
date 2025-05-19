import { Item } from "@/app/types/item";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addToCartApi = async (item: any) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ productId: item._id, quantity: 1 }),
    };
    await fetch(`http://localhost:3000/api/cart/addItemToCart`, options);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateCartItems = async (item: Item) => {
  try {
    const options = {
      method: "PUT",
      body: JSON.stringify({ productId: item._id, quantity: item.quantity }),
    };
    await fetch(
      `http://localhost:3000/api/cart/updateCartItemQuantity`,
      options
    );
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const fetchCartItemsService = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/cart/getCartItems`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const removeItemFromCartService = async (id: string) => {
  try {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ productId: id }),
    };
    const res = await fetch(
      `http://localhost:3000/api/cart/removeItemFromCart`,
      options
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const ChatService = async (message: string) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ message }),
    };
    const res = await fetch(`http://localhost:3000/api/product/chat`, options);
    const result = await res.json();
    console.log("chat result", result);
    return result;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const DBSearchService = async (search: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/product/search?searchquery=${search}`
    );
    const result = await res.json();
    console.log("chat result", result);
    return result;
  } catch (error) {
    console.log((error as Error).message);
  }
};
