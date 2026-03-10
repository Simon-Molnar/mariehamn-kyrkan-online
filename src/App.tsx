import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Gudstjanster from "./pages/Gudstjanster";
import Sakrament from "./pages/Sakrament";
import Verksamhet from "./pages/Verksamhet";
import Butik from "./pages/Butik";
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import BliKatolik from "./pages/BliKatolik";
import Nyheter from "./pages/Nyheter";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gudstjanster" element={<Gudstjanster />} />
          <Route path="/sakrament" element={<Sakrament />} />
          <Route path="/verksamhet" element={<Verksamhet />} />
          <Route path="/butik" element={<Butik />} />
          <Route path="/om-oss" element={<OmOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/bli-katolik" element={<BliKatolik />} />
          <Route path="/nyheter" element={<Nyheter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
