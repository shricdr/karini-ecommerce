// import React from 'react';
// import { Item } from '../types/item';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';

// interface ItemCardProps {
//   item: Item;
//   onAddToCart: (item: Item) => void;
// }

// const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart }) => {
//   console.log("item",item)
//   return (
//     <>
//     <Card sx={{ width: 345,height:400 }}>
//     <CardMedia
//       component="img"
//       alt="green iguana"
//       height="140"
//       width={140}

//       image={item['ImageSrc']}
//     />
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//       {item.Title}
//       </Typography>
//       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//         {item.Body}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Share</Button>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </Card>
//     {/* <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '300px' }}>
//       <Image src={!==""?item['ImageSrc']:""} width="100" height={100}  alt={item.Title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
//       <h3>{item.Title}</h3>
//       <p>SKU: {item['VariantSKU']}</p>
//       <p>Price: ${item['VariantPrice']}</p>
//       <Button variant="contained" onClick={() => onAddToCart(item)}>Add to Cart</Button>
//     </div> */}
//     </>
//   );
// };

// export default ItemCard;

import React from "react";
import { Item } from "../types/item";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ItemCardProps {
  item: Item;
  onAddToCart: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <Card
      elevation={12} // values from 0 to 24
      sx={{
        width: 345,
        height: 400,
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 6, // stronger shadow on hover
        },
        "&:hover .hoverContent": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={item.Title}
        sx={{
          width: "100%",
          height: "250px",
          objectFit: "cover", // or "contain"
        }}
        image={item.ImageSrc}
      />
      <CardContent>
        <Box
          sx={{
            width: "100%",

            textAlign: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.Title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            position: "absolute",
            bottom: 5,
          }}
        >
          {" "}
          <Typography gutterBottom variant="body1" component="div">
            Varient SKU: {item.VariantSKU}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Price:$
            {item.VariantPrice}
          </Typography>
        </Box>
      </CardContent>

      {/* Hover Content */}
      <Box
        className="hoverContent"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.7)",
          color: "white",
          textAlign: "center",
          p: 2,
          opacity: 0,
          transform: "translateY(100%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <Typography variant="body1" sx={{ mb: 1 }}>
          Price:$
          {item.VariantPrice}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Varient SKU: {item.VariantSKU}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {item.Body !== "" ? item.Body : "Description not added."}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ItemCard;
