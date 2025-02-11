import fs from "fs/promises";
import path from "path";
import { products, users, type Product, type InsertProduct, type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

interface StorageData {
  products: Product[];
  users: User[];
  nextProductId: number;
  nextUserId: number;
}

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  addProduct(product: InsertProduct): Promise<Product>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByInstagramId(instagramId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
}

export class JsonStorage implements IStorage {
  private data: StorageData;
  private readonly filePath: string;
  public sessionStore: session.Store;

  constructor() {
    this.filePath = path.join(process.cwd(), "data.json");
    this.data = {
      products: [
        {
          id: 1,
          name: "Classic Leather Tote",
          description: "Elegant everyday tote bag made from premium leather",
          price: "129.99",
          image: "https://images.unsplash.com/photo-1591561954557-26941169b49e",
          category: "Totes"
        },
        {
          id: 2,
          name: "Structured Satchel",
          description: "Professional satchel with multiple compartments",
          price: "159.99",
          image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
          category: "Satchels"
        },
        {
          id: 3,
          name: "Mini Crossbody Bag",
          description: "Compact crossbody perfect for essentials",
          price: "89.99",
          image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6",
          category: "Crossbody"
        }
      ],
      users: [],
      nextProductId: 4,
      nextUserId: 1
    };
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000
    });
    this.loadData();
  }

  private async loadData() {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(fileData);
    } catch (error) {
      // If file doesn't exist, save the default data
      await this.saveData();
    }
  }

  private async saveData() {
    await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
  }

  async getAllProducts(): Promise<Product[]> {
    return this.data.products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.data.products.find(p => p.id === id);
  }

  async addProduct(product: InsertProduct): Promise<Product> {
    const newProduct = {
      ...product,
      id: this.data.nextProductId++
    };
    this.data.products.push(newProduct);
    await this.saveData();
    return newProduct;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.data.users.find(u => u.email === email);
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.data.users.find(u => u.id === id);
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    return this.data.users.find(u => u.googleId === googleId);
  }

  async getUserByInstagramId(instagramId: string): Promise<User | undefined> {
    return this.data.users.find(u => u.instagramId === instagramId);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = {
      ...user,
      id: this.data.nextUserId++,
      createdAt: new Date(),
    };
    this.data.users.push(newUser);
    await this.saveData();
    return newUser;
  }
}

export const storage = new JsonStorage();