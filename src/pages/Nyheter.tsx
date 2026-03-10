import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";

export default function Nyheter() {
  const { data: nyheter, isLoading } = useQuery({
    queryKey: ["nyheter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nyheter")
        .select("*")
        .order("publicerad", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Nyheter</h1>
          <p className="mb-8 text-muted-foreground">
            Aktuellt från Mariehamns katolska församling.
          </p>

          {isLoading ? (
            <p className="text-muted-foreground">Laddar nyheter...</p>
          ) : nyheter && nyheter.length > 0 ? (
            <div className="space-y-6">
              {nyheter.map((n) => (
                <Card key={n.id}>
                  <CardContent className="p-6">
                    <p className="mb-1 text-sm text-muted-foreground">
                      {format(parseISO(n.publicerad), "d MMMM yyyy", { locale: sv })}
                    </p>
                    <h2 className="mb-3 text-xl font-semibold">{n.titel}</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{n.innehall}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Inga nyheter just nu.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
