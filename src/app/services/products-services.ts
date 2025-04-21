import { ServiceBase } from "./service-base";

export class ProductService extends ServiceBase {
  // Get all products with error handling
  static getProducts = async () => {
    try {
      const response = await fetch(this.getUrl("/products"));

      // Check for successful response and valid JSON content
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }

      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to load products. Please try again later.");
    }
  };

  // Get a product by ID with error handling
  static getProductById = async (id: number) => {
    try {
      const response = await fetch(this.getUrl(`/products/${id}`));

      // Check for successful response and valid JSON content
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to load the product. Please try again later.");
    }
  };
}

