import { products, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;

  constructor() {
    this.products = new Map([
      [1, { id: 1, name: "Smart Watch", description: "Track your fitness and stay connected", price: "199.99", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", category: "Electronics" }],
      [2, { id: 2, name: "Headphones", description: "Premium wireless headphones", price: "149.99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", category: "Electronics" }],
      [3, { id: 3, name: "Camera", description: "Capture life's moments", price: "599.99", image: "https://images.unsplash.com/photo-1596460107916-430662021049", category: "Electronics" }],
      [4, { id: 4, name: "Coffee Maker", description: "Start your day right", price: "79.99", image: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e", category: "Home" }],
      [5, { id: 5, name: "Sneakers", description: "Comfortable athletic shoes", price: "89.99", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Fashion" }],
      [6, { id: 6, name: "Backpack", description: "Stylish and functional", price: "49.99", image: "https://images.unsplash.com/photo-1525904097878-94fb15835963", category: "Fashion" }],
      [7, { id: 7, name: "Sunglasses", description: "UV protection in style", price: "129.99", image: "https://images.unsplash.com/photo-1529634885322-b17ffaf423ac", category: "Fashion" }],
      [8, { id: 8, name: "Plant Pot", description: "Beautiful ceramic planter", price: "29.99", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411", category: "Home" }],
      [9, { id: 9, name: "Speaker", description: "Wireless bluetooth speaker", price: "179.99", image: "https://images.unsplash.com/photo-1616423641454-caa695af6a0f", category: "Electronics" }],
      [10, { id: 10, name: "Water Bottle", description: "Stay hydrated in style", price: "24.99", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", category: "Lifestyle" }],
    ]);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
}

export const storage = new MemStorage();
