import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Minerva Bella offers exclusive collection of ladies handbags that blend style with sophistication.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary">
                  Return & Exchange Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:lifestyle@minervabella.com" className="text-muted-foreground hover:text-primary">
                  lifestyle@minervabella.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/minervabella" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                  <SiInstagram className="h-4 w-4" />
                  @minervabella
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <address className="text-sm text-muted-foreground not-italic">
              18, New Ashok Colony<br />
              Morar, Gwalior<br />
              Madhya Pradesh
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Minerva Bella. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/minervabella" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <SiInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
