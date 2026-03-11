import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Kontakt() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Kontakt</h1>
          <p className="mb-8 text-muted-foreground">
            Vi ser fram emot att höra från dig. Tveka inte att ta kontakt!
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Kontaktuppgifter</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Adress</p>
                      <p className="text-sm text-muted-foreground">
                        Östra Esplanadgatan 6<br />22100 Mariehamn, Åland
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+3581812345" className="hover:text-primary">+358 18 12345</a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">E-post</p>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:info@mariehamnskatolskaforsamling.ax" className="hover:text-primary">
                          info@mariehamnskatolskaforsamling.ax
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Öppettider</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Kyrkan</p>
                      <p className="text-sm text-muted-foreground">
                        Öppen i samband med gudstjänster
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">Själavårdssamtal</p>
                      <p className="text-sm text-muted-foreground">
                        Prästen finns tillgänglig för samtal. Kontakta oss för att boka en tid.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <div className="mt-8 overflow-hidden rounded-lg border">
            <iframe
              title="S:t Görans kyrka, Mariehamn"
              src="https://maps.google.com/maps?q=60.0969,19.9348&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
