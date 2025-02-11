import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

// Middleware to check if user is admin
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user?.email === "admin@minervabella.com") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  });

  // Admin routes for managing products
  app.post("/api/products", isAdmin, async (req, res) => {
    try {
      const product = await storage.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}