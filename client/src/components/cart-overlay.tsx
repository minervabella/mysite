import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart";
import { useQuery } from "@tanstack/react-query";
import { type Product } from "@shared/schema";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";

interface CartOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function CartOverlay({ open, onClose }: CartOverlayProps) {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { data: products } = useQuery<Product[]>({ 
    queryKey: ["/api/products"],
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!products) return null;

  const cartProducts = items.map((item) => ({
    product: products.find((p) => p.id === item.productId)!,
    quantity: item.quantity,
  }));

  const total = cartProducts.reduce(
    (sum, { product, quantity }) => sum + parseFloat(product.price) * quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to proceed with checkout",
        variant: "destructive",
      });
      onClose();
      setLocation("/auth");
      return;
    }
    setCheckoutOpen(true);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We'll process your order soon.",
    });
    clearCart();
    setCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-grow my-4">
            {cartProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${product.price} × {quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              disabled={cartProducts.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Please use the following UPI ID to complete your payment:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-lg font-mono select-all">9004603285@ptsbi</p>
              <p className="text-sm text-muted-foreground mt-2">
                Amount to pay: ${total.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                1. Open your UPI app (GPay, PhonePe, etc.)
              </p>
              <p className="text-sm text-muted-foreground">
                2. Send payment to the UPI ID above
              </p>
              <p className="text-sm text-muted-foreground">
                3. Click "Complete Order" after payment
              </p>
            </div>
            <Button className="w-full" onClick={handlePaymentComplete}>
              Complete Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}