import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GudstjansterAdmin } from "./GudstjansterAdmin";
import { NyheterAdmin } from "./NyheterAdmin";
import { LogOut } from "lucide-react";

interface Props {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin</h1>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logga ut
        </Button>
      </div>

      <Tabs defaultValue="gudstjanster">
        <TabsList>
          <TabsTrigger value="gudstjanster">Gudstjänster</TabsTrigger>
          <TabsTrigger value="nyheter">Nyheter</TabsTrigger>
        </TabsList>
        <TabsContent value="gudstjanster">
          <GudstjansterAdmin />
        </TabsContent>
        <TabsContent value="nyheter">
          <NyheterAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
