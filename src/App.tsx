import { NextUIProvider } from "@nextui-org/react";
import { Expenses } from "@/pages";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "./App.css";
library.add(fas);

function App() {
    return (
        <NextUIProvider className="h-full">
            <Expenses />
        </NextUIProvider>
    );
}

export default App;
