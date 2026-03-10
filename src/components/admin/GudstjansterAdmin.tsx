import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Kategori = Database["public"]["Enums"]["gudstjanst_kategori"];
type Gudstjanst = Database["public"]["Tables"]["gudstjanster"]["Row"];

const emptyForm = { datum: "", tid: "", typ: "", kategori: "söndagsmässa" as Kategori, celebrant: "", notering: "" };

export function GudstjansterAdmin() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-gudstjanster"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gudstjanster").select("*").order("datum", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        datum: form.datum,
        tid: form.tid,
        typ: form.typ,
        kategori: form.kategori,
        celebrant: form.celebrant || null,
        notering: form.notering || null,
      };
      if (editId) {
        const { error } = await supabase.from("gudstjanster").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gudstjanster").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gudstjanster"] });
      toast.success(editId ? "Gudstjänst uppdaterad" : "Gudstjänst skapad");
      resetForm();
    },
    onError: () => toast.error("Något gick fel"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gudstjanster").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gudstjanster"] });
      toast.success("Gudstjänst borttagen");
    },
    onError: () => toast.error("Något gick fel"),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditId(null);
    setOpen(false);
  }

  function startEdit(g: Gudstjanst) {
    setForm({
      datum: g.datum,
      tid: g.tid,
      typ: g.typ,
      kategori: g.kategori,
      celebrant: g.celebrant || "",
      notering: g.notering || "",
    });
    setEditId(g.id);
    setOpen(true);
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex justify-end">
        <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); setOpen(o); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" />Ny gudstjänst</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Redigera gudstjänst" : "Ny gudstjänst"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Datum</Label>
                  <Input type="date" value={form.datum} onChange={(e) => setForm({ ...form, datum: e.target.value })} required />
                </div>
                <div>
                  <Label>Tid</Label>
                  <Input type="time" value={form.tid} onChange={(e) => setForm({ ...form, tid: e.target.value })} required />
                </div>
              </div>
              <div>
                <Label>Typ</Label>
                <Input value={form.typ} onChange={(e) => setForm({ ...form, typ: e.target.value })} required placeholder="T.ex. Söndagsmässa" />
              </div>
              <div>
                <Label>Kategori</Label>
                <Select value={form.kategori} onValueChange={(v) => setForm({ ...form, kategori: v as Kategori })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="söndagsmässa">Söndagsmässa</SelectItem>
                    <SelectItem value="vardagsmässa">Vardagsmässa</SelectItem>
                    <SelectItem value="andakt">Andakt</SelectItem>
                    <SelectItem value="högtid">Högtid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Celebrant (valfritt)</Label>
                <Input value={form.celebrant} onChange={(e) => setForm({ ...form, celebrant: e.target.value })} />
              </div>
              <div>
                <Label>Notering (valfritt)</Label>
                <Textarea value={form.notering} onChange={(e) => setForm({ ...form, notering: e.target.value })} />
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
                <TableHead>Datum</TableHead>
                <TableHead>Tid</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>{g.datum}</TableCell>
                  <TableCell>{g.tid}</TableCell>
                  <TableCell>{g.typ}</TableCell>
                  <TableCell>{g.kategori}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(g)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(g.id)}>
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
