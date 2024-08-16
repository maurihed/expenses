import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Expenses } from "@/pages";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "./App.css";
library.add(fas);
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider className="h-full">
                <Expenses />
            </NextUIProvider>
        </QueryClientProvider>
    );
}

export default App;
