import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CartOverlay } from "./cart-overlay";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Minerva Bella
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Link href="/auth">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>

        <CartOverlay open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </header>
  );
}