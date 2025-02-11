import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export function WhatsAppChat() {
  const whatsappNumber = "+919876543210"; // Replace with actual WhatsApp number
  const message = "Hi! I have a question about your products.";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button 
        size="lg"
        className="rounded-full bg-green-500 hover:bg-green-600 h-14 w-14 shadow-lg"
      >
        <SiWhatsapp className="h-6 w-6 text-white" />
      </Button>
    </a>
  );
}
