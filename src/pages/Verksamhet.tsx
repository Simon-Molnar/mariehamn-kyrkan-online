import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Coffee, Music, Heart, GraduationCap } from "lucide-react";

const aktiviteter = [
  {
    namn: "Söndagsskola",
    beskrivning: "Undervisning för barn i den katolska tron med lek, berättelser och kreativa aktiviteter. Hålls under söndagsmässan.",
    icon: GraduationCap,
  },
  {
    namn: "Ungdomsgrupp",
    beskrivning: "Gemenskap och trosfördjupning för ungdomar. Vi träffas regelbundet för samtal, aktiviteter och bön.",
    icon: Users,
  },
  {
    namn: "Bibelstudium",
    beskrivning: "Gemensam läsning och reflektion kring Guds ord. Öppet för alla oavsett förkunskaper.",
    icon: BookOpen,
  },
  {
    namn: "Kyrkkaffe",
    beskrivning: "Efter söndagsmässan samlas vi för kaffe och gemenskap i församlingssalen. Alla är välkomna!",
    icon: Coffee,
  },
  {
    namn: "Kyrkokör",
    beskrivning: "Vår kör sjunger vid gudstjänster och högtider. Nya medlemmar välkomnas varmt – inga förkunskaper krävs.",
    icon: Music,
  },
  {
    namn: "Diakoni",
    beskrivning: "Församlingens diakonala arbete sträcker sig till att hjälpa behövande i samhället genom praktiskt stöd och medmänsklighet.",
    icon: Heart,
  },
];

export default function Verksamhet() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Verksamhet</h1>
          <p className="mb-8 text-muted-foreground">
            Församlingens verksamhet erbjuder gemenskap och möjligheter att växa i tro för alla åldrar.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {aktiviteter.map((a, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6">
                  <a.icon className="mb-3 h-7 w-7 text-primary" />
                  <h2 className="mb-2 text-lg font-semibold">{a.namn}</h2>
                  <p className="text-sm text-muted-foreground">{a.beskrivning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
