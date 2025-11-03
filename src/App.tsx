import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import MoodStep from "./pages/checkin/MoodStep";
import SleepStep from "./pages/checkin/SleepStep";
import JournalStep from "./pages/checkin/JournalStep";
import CheckinResults from "./pages/CheckinResults";
import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ExerciseDetail from "./pages/ExerciseDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/ejercicio/:slug" element={<ExerciseDetail />} />
          <Route path="/checkin/mood" element={<MoodStep />} />
          <Route path="/checkin/sleep" element={<SleepStep />} />
          <Route path="/checkin/journal" element={<JournalStep />} />
          <Route path="/checkin-results" element={<CheckinResults />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ejercicio/:id" element={<ExerciseDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
