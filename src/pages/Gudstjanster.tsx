import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Filter } from "lucide-react";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Kategori = Database["public"]["Enums"]["gudstjanst_kategori"];

const kategorier: { value: Kategori | "alla"; label: string }[] = [
  { value: "alla", label: "Alla" },
  { value: "söndagsmässa", label: "Söndagsmässa" },
  { value: "vardagsmässa", label: "Vardagsmässa" },
  { value: "andakt", label: "Andakt" },
  { value: "högtid", label: "Högtid" },
];

export default function Gudstjanster() {
  const [filter, setFilter] = useState<Kategori | "alla">("alla");

  const { data: services, isLoading } = useQuery({
    queryKey: ["gudstjanster", filter],
    queryFn: async () => {
      let query = supabase
        .from("gudstjanster")
        .select("*")
        .gte("datum", new Date().toISOString().split("T")[0])
        .order("datum", { ascending: true })
        .order("tid", { ascending: true });

      if (filter !== "alla") {
        query = query.eq("kategori", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Gudstjänster</h1>
          <p className="mb-8 text-muted-foreground">
            Välkommen att fira mässa med oss i S:t Görans kyrka.
          </p>

          {/* Ordinarie tider */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Ordinarie mässtider</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Söndagsmässa</p>
                    <p className="text-sm text-muted-foreground">Söndagar kl 10:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Vardagsmässa</p>
                    <p className="text-sm text-muted-foreground">Onsdagar kl 18:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {kategorier.map((kat) => (
              <Button
                key={kat.value}
                variant={filter === kat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(kat.value)}
              >
                {kat.label}
              </Button>
            ))}
          </div>

          {/* Services list */}
          {isLoading ? (
            <p className="text-muted-foreground">Laddar gudstjänster...</p>
          ) : services && services.length > 0 ? (
            <div className="space-y-3">
              {services.map((s) => (
                <Card key={s.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                      <span className="text-xs font-medium uppercase">
                        {format(parseISO(s.datum), "MMM", { locale: sv })}
                      </span>
                      <span className="text-lg font-bold leading-none">
                        {format(parseISO(s.datum), "d")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{s.typ}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(s.datum), "EEEE", { locale: sv })} kl {s.tid.slice(0, 5)}
                      </p>
                      {s.notering && (
                        <p className="mt-1 text-xs text-muted-foreground italic">{s.notering}</p>
                      )}
                    </div>
                    <span className="hidden rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground sm:inline-block">
                      {s.kategori}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Inga kommande gudstjänster hittades.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
