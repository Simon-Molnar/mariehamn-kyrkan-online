import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Mariehamns katolska församling</h3>
            <p className="text-sm text-muted-foreground">
              S:t Görans kyrka är den katolska församlingen på Åland. Vi tillhör{" "}
              <a
                href="https://katolinen.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                Helsingfors katolska stift
              </a>{" "}
              och den världsvida katolska kyrkan.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                Östra Esplanadgatan 6, 22100 Mariehamn
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+3581812345" className="hover:text-primary">+358 18 12345</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@mariehamnskatolskaforsamling.ax" className="hover:text-primary">
                  info@mariehamnskatolskaforsamling.ax
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Snabblänkar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/gudstjanster" className="hover:text-primary">Gudstjänster</Link></li>
              <li><Link to="/sakrament" className="hover:text-primary">Sakrament</Link></li>
              <li><Link to="/bli-katolik" className="hover:text-primary">Bli katolik</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mariehamns katolska församling. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
