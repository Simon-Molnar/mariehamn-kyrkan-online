import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { Session } from "@supabase/supabase-js";

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdmin(session.user.id);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdmin(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin(userId: string) {
    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    setIsAdmin(!!data);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Laddar...</p>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <AdminLogin />
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Du har inte administratörsbehörighet.</p>
          <button onClick={handleLogout} className="text-primary underline">
            Logga ut
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminDashboard onLogout={handleLogout} />
    </Layout>
  );
}
