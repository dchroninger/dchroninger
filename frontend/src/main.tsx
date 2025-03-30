import { StrictMode, useEffect, useState } from "react";
import "./styles/tailwind.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@context/theme";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const queryClient = new QueryClient();

  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? true
      : false,
  );

  const [systemTheme, setSystemTheme] = useState(
    localStorage.getItem("useSystemTheme") === "true" ? true : false,
  );

  // Synchronize with local storage changes
  useEffect(() => {
    if (systemTheme) {
      localStorage.removeItem("theme");
      localStorage.setItem("useSystemTheme", "true");
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    } else {
      localStorage.setItem("useSystemTheme", "false");
    }

    if (darkMode) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "black";
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#fafafa";
    }
  }, [darkMode, systemTheme]);

  return (
    <StrictMode>
      <ThemeProvider
        value={{ darkMode, setDarkMode, systemTheme, setSystemTheme }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
