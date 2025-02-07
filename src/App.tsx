import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bakery, Expenses, WorkoutPage } from "@/pages";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MobileLayout } from "./componets";
library.add(fas);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider className="h-full">
        <BrowserRouter>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/expenses" />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/bakery" element={<Bakery />} />
              <Route path="/workouts" element={<Navigate to="/workouts/mauricio" />} />
              <Route path="/workouts/:id" element={<WorkoutPage />} />
              <Route path="*" element={<Navigate to="/expenses" />} />
            </Routes>
          </MobileLayout>
        </BrowserRouter>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
