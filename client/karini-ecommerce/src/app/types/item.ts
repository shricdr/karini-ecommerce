export interface Item {
  _id?: string; // MongoDB ObjectId
  ImageSrc: string;
  Title: string;
  VariantSKU: string;
  Price: number;
  VariantPrice: number;
  Body: string;
  quantity?: number;
}
