import { Layout } from "@/components/Layout";
import { ExternalLink } from "lucide-react";

export default function OmOss() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">Om oss</h1>
          <p className="mb-8 text-muted-foreground">
            Lär känna Mariehamns katolska församling och vår plats i den världsvida katolska kyrkan.
          </p>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">Vår historia</h2>
              <p className="text-muted-foreground">
                Mariehamns katolska församling har sina rötter i den katolska närvaron på Åland. 
                S:t Görans kyrka, belägen på Östra Esplanadgatan i Mariehamn, är centrum för 
                församlingens gudstjänstliv och gemenskap. Genom åren har församlingen vuxit och 
                blivit en mångkulturell mötesplats där troende från olika bakgrunder samlas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Helsingfors katolska stift</h2>
              <p className="text-muted-foreground">
                Vår församling tillhör Helsingfors katolska stift, som omfattar hela Finland. 
                Stiftet leds av en biskop och samordnar det katolska livet i landet. Genom stiftet 
                är vi förbundna med den världsvida katolska kyrkan under påvens ledning.
              </p>
              <a
                href="https://katolinen.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
              >
                Besök stiftets webbplats <ExternalLink className="h-4 w-4" />
              </a>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Vårt uppdrag</h2>
              <p className="text-muted-foreground">
                Vi strävar efter att vara en levande församling som firar liturgin, förkunnar 
                evangeliet och tjänar vår nästa. Genom sakramenten, undervisning och diakoni vill 
                vi vittna om Guds kärlek på Åland. Alla är välkomna att delta i vår gemenskap, 
                oavsett bakgrund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Gemenskap</h2>
              <p className="text-muted-foreground">
                I vår församling möts människor från olika länder och kulturer, förenade i den 
                katolska tron. Vi erbjuder aktiviteter för alla åldrar – från söndagsskola för de 
                yngsta till bibelstudium och kyrkokör för vuxna. Kyrkkaffe efter söndagsmässan ger 
                tillfälle att lära känna varandra.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
