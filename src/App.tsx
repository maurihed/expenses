import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bakery, Expenses } from "@/pages";
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
      <NextUIProvider className="h-full dark text-foreground bg-background">
        <BrowserRouter>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/expenses" />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/bakery" element={<Bakery />} />
              <Route path="*" element={<Navigate to="/expenses" />} />
            </Routes>
          </MobileLayout>
        </BrowserRouter>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
