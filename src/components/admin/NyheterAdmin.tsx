import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Nyhet = Database["public"]["Tables"]["nyheter"]["Row"];

const emptyForm = { titel: "", innehall: "", publicerad: "" };

export function NyheterAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-nyheter"],
    queryFn: async () => {
      const { data, error } = await supabase.from("nyheter").select("*").order("publicerad", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        titel: form.titel,
        innehall: form.innehall,
        publicerad: form.publicerad,
      };
      if (editId) {
        const { error } = await supabase.from("nyheter").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("nyheter").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-nyheter"] });
      toast.success(editId ? "Nyhet uppdaterad" : "Nyhet skapad");
      resetForm();
    },
    onError: () => toast.error("Något gick fel"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("nyheter").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-nyheter"] });
      toast.success("Nyhet borttagen");
    },
    onError: () => toast.error("Något gick fel"),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditId(null);
    setOpen(false);
  }

  function startEdit(n: Nyhet) {
    setForm({ titel: n.titel, innehall: n.innehall, publicerad: n.publicerad });
    setEditId(n.id);
    setOpen(true);
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex justify-end">
        <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); setOpen(o); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" />Ny nyhet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Redigera nyhet" : "Ny nyhet"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div>
                <Label>Titel</Label>
                <Input value={form.titel} onChange={(e) => setForm({ ...form, titel: e.target.value })} required />
              </div>
              <div>
                <Label>Publiceringsdatum</Label>
                <Input type="date" value={form.publicerad} onChange={(e) => setForm({ ...form, publicerad: e.target.value })} required />
              </div>
              <div>
                <Label>Innehåll</Label>
                <Textarea rows={6} value={form.innehall} onChange={(e) => setForm({ ...form, innehall: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Sparar..." : "Spara"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Laddar...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Publicerad</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((n) => (
                <TableRow key={n.id}>
                  <TableCell>{n.titel}</TableCell>
                  <TableCell>{n.publicerad}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(n)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(n.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
