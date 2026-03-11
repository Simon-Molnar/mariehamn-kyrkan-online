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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.5!2d19.9348!3d60.0969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468ae6e5a3c5a6f7%3A0x1234567890abcdef!2s%C3%96stra+Esplanadgatan+6%2C+22100+Mariehamn!5e0!3m2!1ssv!2sfi!4v1"
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
