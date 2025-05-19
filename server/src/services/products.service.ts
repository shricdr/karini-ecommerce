import { Request, Response } from "express";
import productModel, { ProductDocument } from "../models/product.model"; // Adjust the path as needed
import { IncomingForm, File } from "formidable";
import * as fs from "fs/promises"; // Using the promise-based fs API
import path from "path";
import nlp from "compromise";
import { convertToJson } from "./cart.service";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
const uploadsDirectory = path.join(__dirname, "uploads");

// export const bulkInsertProduct = async (req: Request, res: Response) => {
//   console.log("Started bulkInsertProduct");

//   try {
//     // Create the incoming form with proper options
//     const form = new IncomingForm({
//       uploadDir: uploadsDirectory, // Set the upload directory
//       keepExtensions: true, // Keep the file extensions
//       maxFileSize: 10 * 1024 * 1024, // Set the max file size (10MB in this case)
//       multiples: false, // Don't allow multiple files
//     });

//     // Parsing the form data
//     form.parse(req, async (err, fields, files) => {
//       console.log("Inside form.parse");

//       // Handle errors in parsing
//       if (err) {
//         console.error("Form parsing error", err);
//         return res
//           .status(400)
//           .json({ message: "File upload failed", error: err });
//       }

//       console.log("Parsed fields:", fields);
//       console.log("Parsed files:", files);

//       // Check if file is uploaded
//       if (!files.file) {
//         return res.status(400).json({ message: "File not found" });
//       }

//       // Get the file from the files object
//       const file = Array.isArray(files.file) ? files.file[0] : files.file;

//       // Log the file path to check
//       console.log("File path:", file.filepath);

//       // Read the file content (JSON file in this case)
//       const content = await fs.readFile(file.filepath, "utf-8");

//       try {
//         // Parse the JSON content from the file
//         const data = JSON.parse(content);

//         if (!Array.isArray(data)) {
//           return res
//             .status(400)
//             .json({ message: "Invalid JSON: must be an array" });
//         }

//         // Insert data into MongoDB here (you can replace this with actual MongoDB insertion)
//         // await productModel.insertMany(data);

//         res
//           .status(200)
//           .json({ message: "Data uploaded successfully", count: data.length });
//       } catch (error) {
//         console.error("Error parsing JSON", error);
//         res.status(400).json({ message: "Invalid JSON file", error });
//       }
//     });
//   } catch (error: any) {
//     console.error("Error uploading data:", error);
//     res.status(500).json({ message: "Failed to upload data." });
//   }
// };
export const bulkInsertProduct = async (req: Request, res: Response) => {
  try {
    // const form = new IncomingForm({ multiples: false }); // Handle single file upload
    // const { fields, files } = await new Promise<{
    //   fields: formidable.Fields;
    //   files: formidable.Files;
    // }>((resolve, reject) => {
    //   form.parse(req, (err, fields, files) => {
    //     if (err) {
    //       reject(err);
    //       return;
    //     }
    //     resolve({ fields, files });
    //   });
    // });
    // if (!files || !files.jsonFile) {
    //   return res.status(400).json({
    //     error: 'No JSON file uploaded with the field name "jsonFile".',
    //   });
    // }
    // const uploadedFile = files.jsonFile as File; // Type assertion
    // try {
    //   const fileString = await fs.readFile(uploadedFile.filepath, "utf-8");
    //   const jsonData = JSON.parse(fileString);
    //   console.log("Parsed JSON Data (formidable - TS):", jsonData);
    //   res.json({
    //     message: "JSON file processed successfully (formidable - TS)",
    //     data: jsonData,
    //   });
    // } catch (parseErr: any) {
    //   console.error("Error parsing JSON:", parseErr);
    //   res.status(400).json({ error: "Invalid JSON file." });
    // } finally {
    //   try {
    //     await fs.unlink(uploadedFile.filepath);
    //   } catch (unlinkErr: any) {
    //     console.warn("Error deleting temporary file:", unlinkErr);
    //   }
    // }
    // const form = new IncomingForm();
    // console.log("form", form);
    // console.log("req.body", req.body);
    // console.log("#85===========>");
    // form.parse(req, async (err, fields, files) => {
    //   console.log("#86===========>");
    //   if (err || !files.file) {
    //     return res
    //       .status(400)
    //       .json({ message: "File upload failed", error: err });
    //   }
    //   const file = Array.isArray(files.file) ? files.file[0] : files.file;
    //   const content = await fs.readFile(file.filepath, "utf-8");
    //   try {
    //     const data = JSON.parse(content);
    //     if (!Array.isArray(data)) {
    //       return res
    //         .status(400)
    //         .json({ message: "Invalid JSON: must be an array" });
    //     }
    //     console.log("data", data);
    //     // Insert data to MongoDB here...
    //     res.status(200).json({
    //       message: "Data uploaded successfully",
    //       count: "data.length",
    //     });
    //   } catch (error) {
    //     res.status(400).json({ message: "Invalid JSON file", error });
    //   }
    // });
    // const form = new formidable.IncomingForm({ multiples: false });
    // form.parse(req, async (err, fields, files) => {
    //   if (err || !files.file) {
    //     return res.status(400).json({ message: "File upload failed" });
    //   }
    //   try {
    //     const file = Array.isArray(files.file) ? files.file[0] : files.file;
    //     const fileContent = await fs.readFile(file.filepath, "utf-8");
    //     const jsonData = JSON.parse(fileContent);
    //     if (!Array.isArray(jsonData)) {
    //       return res
    //         .status(400)
    //         .json({ message: "Invalid JSON: must be an array of objects" });
    //     }
    //     console.log(jsonData);
    //     // const result = await collection.insertMany(jsonData);
    //     return res.status(200).json({ message: `Inserted records` });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: "Server error" });
    //   }
    // });
    // console.log("--- Request Received ---");
    // console.log("Content-Type:", req.headers["content-type"]);
    // console.log("Raw req.body:", req.body);
    // console.log("req.body as string:", req.body.toString("utf-8"));
    // const bodyString = req.body.toString("utf-8");
    // let jsonStart = bodyString.indexOf("{");
    // if (jsonStart === -1) {
    //   jsonStart = bodyString.indexOf("[");
    // }
    // let json = bodyString;
    // if (jsonStart !== -1) {
    //   json = bodyString.substring(jsonStart);
    // }
    // const jsonString = json.trim();
    // console.log("String to parse:", jsonString);
    // try {
    //   const jsonData = JSON.parse(jsonString);
    //   console.log("Parsed JSON:", jsonData, typeof jsonData);
    //   res.json({ message: "Success", data: jsonData });
    // } catch (error: any) {
    //   console.error("JSON Parse Error:", error);
    //   res.status(400).json({ error: "Invalid JSON", details: error.message });
    // }
    // if (!req.body || req.body.length === 0) {
    //   return res.status(400).json({ error: "Empty request body" });
    // }
    // // const jsonString = req.body.toString("utf-8").trim();
    // // console.log("Received data:", jsonString); // Log the raw data
    // const jsonData = JSON.parse(jsonString);
    // console.log("Parsed JSON:", jsonData);
    // // Process jsonData here
    // res
    //   .status(200)
    //   .json({ message: "Data processed successfully", data: jsonData });
    const dataBuffer = req.body;
    const dataAsString: string = dataBuffer.toString("utf-8");
    console.log("dataAsString", dataAsString);
    const data: any = JSON.parse(dataAsString);
    console.log("Data as JSON:", data);
    if (data.length < 1) {
      return res.status(400).json({ message: "File is empty can not upload" });
    }
    let formattedData = [];
    for (let product of data) {
      let formattedObj: any = {};
      for (let [key, value] of Object.entries(product)) {
        const dbKey = key.split(" ").join("");
        if (product[key] === "" && key === "Variant Price")
          formattedObj[dbKey] = 0;
        else formattedObj[dbKey] = value;
      }
      formattedData.push(formattedObj);
    }
    await productModel.insertMany(formattedData);
    res.status(200).json({ message: "Products uploaded successfully" });
  } catch (error: any) {
    console.error("Error uploading data:", error);
    res.status(500).json({ message: "Failed to upload data." });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      message: "Products fetch successfully",
      products,
      status: "success",
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};

export const getProductsInPagination = async (req: Request, res: Response) => {
  try {
    let skip = 0,
      limit = 10;
    if (req?.query?.skip) skip = +req.query.skip;
    if (req?.query?.limit) limit = +req.query.limit;
    const products = await productModel
      .find({})
      .sort("_id")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Products fetch successfully",
      products,
      limit,
      nextOffset: skip + limit,
      status: "success",
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};

export const dbSearch = async (req: Request, res: Response) => {
  try {
    let searchquery;
    if (req?.query?.searchquery) searchquery = req.query.searchquery;

    const products = await productModel.find({
      Title: { $regex: `${searchquery}`, $options: "i" },
    });

    res.status(200).json({
      message: "Products fetch successfully",
      response: products,

      status: "success",
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};

async function handleChatMessageNlp(userMessage: string) {
  let intent: "find_product" | "show_products_by_criteria" | null = null;
  let entities: { sku?: string; category?: string; price_limit?: number } = {};

  const lowerMessage = userMessage.toLowerCase();

  // Rule for finding by SKU
  const findSkuRegex = /(find|look for|search)\s+sku\s+([a-z0-9-]+)/i;
  let skuMatch = lowerMessage.match(findSkuRegex);
  if (!skuMatch) {
    skuMatch = lowerMessage.replace(/\u00A0/g, " ").match(findSkuRegex);
  }
  if (skuMatch && skuMatch[2]) {
    intent = "find_product";
    entities.sku = skuMatch[2];
  }

  // Rule for showing products by category and price
  const showCategoryPriceRegex =
    /(show|display)\s+([a-z]+(?:\s+[a-z]+)*)\s+under\s+\$?(\d+)/i;
  const showCategoryPriceMatch = lowerMessage.match(showCategoryPriceRegex);
  if (showCategoryPriceMatch) {
    intent = "show_products_by_criteria";
    entities.category = showCategoryPriceMatch[2].trim();
    entities.price_limit = parseInt(showCategoryPriceMatch[3], 10);
  }

  console.log("NLP Intent (Rule-Based):", intent);
  console.log("NLP Entities (Rule-Based):", entities);

  return { intent, entities };
}

async function processNlpOutput(nlpOutput: {
  intent: string | null;
  entities: any;
}) {
  const { intent, entities } = nlpOutput;
  let response: any = "Sorry, I couldn't understand your request.";

  if (intent === "find_product" && entities.sku) {
    try {
      const query = {
        VariantSKU: { $regex: `^${entities.sku}$`, $options: "i" },
      };
      const product: any = await productModel.find(query);
      if (product.length) {
        response = product;
      } else {
        response = `No product found with SKU ${entities.sku}`;
      }
    } catch (error) {
      console.error("Database error:", error);
      response = "Error querying the database.";
    }
  } else if (intent === "show_products_by_criteria" && entities.category) {
    const query: any = {
      Type: { $regex: `${entities.category}$`, $options: "i" },
    };
    if (entities.price_limit) {
      query.VariantPrice = { $lt: entities.price_limit };
    }
    try {
      const products = await productModel.find(query);
      if (products.length > 0) {
        response = products;
      } else {
        response = `No ${entities.category} products found${
          entities.price_limit ? ` under $${entities.price_limit}` : ""
        }.`;
      }
    } catch (error) {
      console.error("Database error:", error);
      response = "Error querying the database.";
    }
  }

  return response;
}

export const Chats = async (req: Request, res: Response) => {
  const data = convertToJson(req);
  const userMessage = data.message;
  const nlpOutput = await handleChatMessageNlp(userMessage);
  const response = await processNlpOutput(nlpOutput);
  res.json({ response });
};
