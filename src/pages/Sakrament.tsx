import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sakrament = [
  {
    namn: "Dopet",
    beskrivning: "Dopet är porten till det kristna livet och inlemmandet i kyrkan. Genom dopet blir vi befriade från synden och pånyttfödda som Guds barn.",
  },
  {
    namn: "Konfirmationen",
    beskrivning: "Konfirmationen fullbordar dopets nåd och stärker den troende med den helige Andes gåvor för att vittna om Kristus i världen.",
  },
  {
    namn: "Eukaristin",
    beskrivning: "Eukaristin, den heliga mässan, är kyrkans hjärta. I eukaristin tar vi emot Kristi kropp och blod under brödets och vinets gestalter.",
  },
  {
    namn: "Bikten",
    beskrivning: "I botens sakrament möter vi Guds barmhärtighet. Genom bekännelse och ånger tar vi emot Guds förlåtelse och försonas med kyrkan.",
  },
  {
    namn: "De sjukas smörjelse",
    beskrivning: "De sjukas smörjelse ger tröst, frid och styrka åt den som är allvarligt sjuk eller åldrad, och förenar deras lidande med Kristi.",
  },
  {
    namn: "Vigningens sakrament",
    beskrivning: "Genom vigningens sakrament kallas män till tjänst som diakoner, präster eller biskopar för att leda, undervisa och helga Guds folk.",
  },
  {
    namn: "Äktenskapet",
    beskrivning: "Äktenskapets sakrament förenar man och kvinna i ett livslångt förbund av kärlek och trohet, öppet för att ta emot barn.",
  },
];

export default function Sakrament() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Sakramenten</h1>
          <p className="mb-8 text-muted-foreground">
            Sakramenten är heliga tecken instiftade av Kristus, genom vilka Guds nåd verkar i våra liv.
          </p>

          <div className="space-y-4">
            {sakrament.map((s, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h2 className="mb-2 text-xl font-semibold">{s.namn}</h2>
                  <p className="text-muted-foreground">{s.beskrivning}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-primary/5 p-6 text-center">
            <p className="mb-3 text-muted-foreground">
              Vill du veta mer om sakramenten eller förbereda dig för att ta emot ett sakrament?
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
