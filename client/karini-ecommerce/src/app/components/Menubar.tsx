import React, { useEffect, ChangeEvent, useState } from "react";
// import { Item } from '../types/item';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Item } from "../types/item";
import { CartItem } from "../types/cart";
import { useRouter } from "next/navigation";
import { Button, InputAdornment } from "@mui/material";

interface MenuBarProps {
  page: string;
  items: CartItem[] | [];
  onSearch?: (term: string) => void;
  handleChat?: (term: string) => void;
  handleDBSearch?: (term: string) => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const MenuBar: React.FC<MenuBarProps> = ({
  items,
  onSearch,
  handleChat,
  handleDBSearch,
  page,
}) => {
  const [quantity, setQuantity] = React.useState<number>(0);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chatTerm, setChatTerm] = useState<string>("");

  const handleCartClick = () => {
    router.push("/cart");
  };

  useEffect(() => {
    let totalQuantity = 0;
    console.log(items);
    if (items.length) items.map((i) => (totalQuantity += i.quantity));
    console.log("totalQuantity", totalQuantity);
    setQuantity(totalQuantity);
  }, [items]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleChatChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatTerm(event.target.value);
  };

  const handleChatChangeClick = (term: string) => {
    setChatTerm(term);
    setSearchTerm("");
    handleChat(term);
  };
  const handleSearchChangeClick = (term: string) => {
    setChatTerm("");
    setSearchTerm(term);
    handleDBSearch(term);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Karini
          </Typography>
          {page !== "Cart" && (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Search by SKU or Title"
                  inputProps={{ "aria-label": "search" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="outlined"
                        style={{ backgroundColor: "#ffff" }}
                        onClick={() => handleSearchChangeClick(searchTerm)}
                      >
                        Search All
                      </Button>
                    </InputAdornment>
                  }
                />
              </Search>
              <Search>
                <StyledInputBase
                  value={chatTerm}
                  onChange={handleChatChange}
                  placeholder="Find SKU 12345"
                  inputProps={{ "aria-label": "search" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="outlined"
                        style={{ backgroundColor: "#ffff" }}
                        onClick={() => handleChatChangeClick(chatTerm)}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  }
                />{" "}
              </Search>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show item count in cart"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
