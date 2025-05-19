import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from "../components/ItemCard";
import { Item } from "../types/item";

const PAGE_SIZE = 10;
interface InfiniteProductListProps {
  uploadMessage: string | null;
  searchTerm: string;
  handleCartChange: (item: Item, operation: string) => void;
  apiItems?: Item[];
  chatTerm?: string;
}

const InfiniteProductList: React.FC<InfiniteProductListProps> = ({
  uploadMessage,
  searchTerm,
  handleCartChange,
  apiItems,
  chatTerm,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [skip, setSkip] = useState(0);
  const [flag, setFlag] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (s: number = skip) => {
    try {
      console.log("s", s);
      const res = await fetch(
        `http://localhost:3000/api/product/getProducts?skip=${
          s === 0 ? 0 : skip
        }&limit=${limit}`
      );
      const result = await res.json();

      if (result.products.length === 0 || result.products.length < limit) {
        setHasMore(false);
        return;
      }
      console.log("result.products", result.products);
      if (s === 0) {
        setItems([...result.products]);
        setSkip(0 + limit);
      } else {
        setItems((prev) => [...prev, ...result.products]);
        setSkip(skip + limit);
      }
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [uploadMessage]);

  useEffect(() => {
    console.log("apiItems", apiItems);
    // let f = 0;
    if ((chatTerm !== "" || searchTerm !== "") && apiItems) {
      setFlag(true);
      // f = 1;
      setItems(apiItems);
    } else {
      if (flag) {
        setFlag(true);
        fetchItems(0);
      } else {
        setFlag(false);
        fetchItems(skip + limit);
      }
    }
  }, [apiItems, searchTerm]);

  const filteredItems = items.filter(
    (item) =>
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item["VariantSKU"].toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error loading items: {error}</div>;

  return (
    <>
      <h1 style={{ margin: 10 }}>{items.length} item found </h1>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={
          <h4
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            {!hasMore
              ? " "
              : items.length > 0
              ? "Loading..."
              : "Data not available"}
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more items</b>
          </p>
        }
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {filteredItems.map((item, i) => (
            <div key={i} style={{ padding: "10px" }}>
              <ItemCard
                key={item._id}
                item={item}
                onAddToCart={() => handleCartChange(item, "+")}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteProductList;
