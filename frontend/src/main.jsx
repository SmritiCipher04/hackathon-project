console.log("main.jsx executing v=2");
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const queryClient = new QueryClient();

console.log("ReactDOM.createRoot calling with App component...");
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
