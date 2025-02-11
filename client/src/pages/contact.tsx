import { Card, CardContent } from "@/components/ui/card";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:lifestyle@minervabella.com" className="text-muted-foreground hover:text-primary">
                    lifestyle@minervabella.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <SiWhatsapp className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">Contact us on WhatsApp for quick responses</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <SiInstagram className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold mb-1">Instagram</h3>
                  <a href="https://instagram.com/minervabella" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    @minervabella
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    18, New Ashok Colony<br />
                    Morar, Gwalior<br />
                    Madhya Pradesh
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] md:h-full min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.7299356444447!2d78.2!3d26.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzAwLjAiTiA3OMKwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
