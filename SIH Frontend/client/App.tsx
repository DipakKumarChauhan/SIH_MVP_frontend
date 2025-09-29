import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "@/components/layout/AppLayout";
import Trains from "@/pages/Trains";
import Platform from "@/pages/Platform";
import Stations from "@/pages/Stations";
import Optimize from "@/pages/Optimize";
import Conflicts from "@/pages/Conflicts";
import Simulations from "@/pages/Simulations";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/optimize" element={<Optimize />} />
            <Route path="/conflicts" element={<Conflicts />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
