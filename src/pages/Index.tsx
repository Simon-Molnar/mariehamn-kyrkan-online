import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church, BookOpen, Users, Heart, CalendarDays, ArrowRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import heroImage from "@/assets/hero-church.jpg";

const quickLinks = [
  { to: "/gudstjanster", label: "Gudstjänster", icon: CalendarDays, desc: "Se kommande mässor och andakter" },
  { to: "/sakrament", label: "Sakrament", icon: Church, desc: "Kyrkans sju sakrament" },
  { to: "/verksamhet", label: "Verksamhet", icon: Users, desc: "Aktiviteter och grupper" },
  { to: "/bli-katolik", label: "Bli katolik", icon: BookOpen, desc: "Vägen in i kyrkan" },
];

export default function Index() {
  const { data: nextService } = useQuery({
    queryKey: ["next-gudstjanst"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("gudstjanster")
        .select("*")
        .gte("datum", today)
        .order("datum", { ascending: true })
        .order("tid", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mariehamns katolska församling
          </h1>
          <p className="mb-2 text-lg text-primary font-medium">S:t Görans kyrka</p>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Välkommen till den katolska gemenskapen på Åland. Vi firar mässa, delar tron och 
            bygger gemenskap i Kristi kärlek.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/gudstjanster">Se gudstjänster</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Next service */}
      {nextService && (
        <section className="border-y bg-primary/5 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Nästa gudstjänst
            </p>
            <h2 className="mb-2 text-2xl font-semibold">{nextService.typ}</h2>
            <p className="text-muted-foreground">
              {format(parseISO(nextService.datum), "EEEE d MMMM yyyy", { locale: sv })} kl {nextService.tid.slice(0, 5)}
            </p>
            {nextService.notering && (
              <p className="mt-1 text-sm text-muted-foreground italic">{nextService.notering}</p>
            )}
            <Button asChild variant="link" className="mt-2">
              <Link to="/gudstjanster">Alla gudstjänster <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      )}

      {/* Quick links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-semibold">Utforska församlingen</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <link.icon className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="mb-1 text-lg font-semibold">{link.label}</h3>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
