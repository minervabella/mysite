import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function WhatsAppChat() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const whatsappNumber = "918109603285"; 
  const message = "Hi! I have a question about your products.";

  const handleClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to contact us via WhatsApp.",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Button 
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 hover:bg-green-600 h-14 w-14 shadow-lg"
    >
      <SiWhatsapp className="h-6 w-6 text-white" />
    </Button>
  );
}