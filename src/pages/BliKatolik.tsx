import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const perioder = [
  {
    namn: "Förkatekumenatet",
    beskrivning: "Den första tiden av utforskning och intresse. Du är välkommen att besöka mässan, ställa frågor och lära känna församlingen utan förpliktelser.",
  },
  {
    namn: "Katekumenatet",
    beskrivning: "En period av systematisk undervisning i den katolska tron. Du lär dig om Bibeln, kyrkans lära, sakramenten och det kristna livet.",
  },
  {
    namn: "Reningsperioden",
    beskrivning: "Den intensiva förberedelsen under fastetiden. Genom bön, reflektion och andliga övningar fördjupas din relation till Kristus och kyrkan.",
  },
  {
    namn: "Mystagogin",
    beskrivning: "Efter att du tagit emot sakramenten (dop, konfirmation och eukaristi) vid påskvakan, fortsätter du att fördjupas i trons mysterier och församlingslivet.",
  },
];

export default function BliKatolik() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Bli katolik</h1>
          <p className="mb-8 text-muted-foreground">
            Är du intresserad av den katolska tron? Vägen in i kyrkan kallas katekumenatet (RCIA) 
            och är en stegvis process av undervisning, bön och gemenskap.
          </p>

          <h2 className="mb-4 text-2xl font-semibold">Katekumenatets fyra perioder</h2>
          <div className="space-y-4">
            {perioder.map((p, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">{p.namn}</h3>
                      <p className="text-muted-foreground">{p.beskrivning}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-primary/5 p-6 text-center">
            <h2 className="mb-2 text-xl font-semibold">Är du intresserad?</h2>
            <p className="mb-4 text-muted-foreground">
              Kontakta oss för att ta det första steget. Du förbinder dig till ingenting – vi 
              samtalar gärna om tron och besvarar dina frågor.
            </p>
            <Button asChild>
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
