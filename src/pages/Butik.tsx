import { Layout } from "@/components/Layout";
import { ShoppingBag } from "lucide-react";

export default function Butik() {
  return (
    <Layout>
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">Butiken öppnar snart</h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Vi planerar att erbjuda böcker, andaktsföremål och annat material som kan stödja ditt 
          andliga liv. Håll utkik – butiken öppnar inom kort!
        </p>
      </div>
    </Layout>
  );
}
