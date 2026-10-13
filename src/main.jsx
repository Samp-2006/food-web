// main.jsx
// PURPOSE: The entry point. It puts our <App /> inside the <div id="root"> in index.html.
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
