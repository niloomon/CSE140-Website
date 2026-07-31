/**
 * App.tsx - Main Application Component
 * 
 * This is the root component of the CSE 140 website application.
 * It sets up all the necessary providers and routing configuration.
 */

// UI Component Imports - Toast notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Third-party Library Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // For data fetching and caching
import { ThemeProvider } from "next-themes"; // For theme management
import { useEffect, useState } from "react";

// Page Component Imports
import Home from "./pages/Home";
import CourseCalendar from "./pages/CourseCalendar";
import TeachingStaff from "./pages/TeachingStaff";
import CourseMaterial from "./pages/CourseMaterial";
import Projects from "./pages/Projects";
import { getAppPath } from "./components/AppLink";

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Wraps the entire application with necessary providers:
 * - QueryClientProvider: Enables React Query for data fetching
 * - ThemeProvider: Manages theme (currently forced to light mode)
 * - TooltipProvider: Enables tooltip functionality across the app
 * - Local routing: Handles the small static site without an external router dependency
 * 
 * Defines all application routes:
 * - "/" - Home page (Home)
 * - "/course-calendar" - Course calendar page
 * - "/teaching-staff" - Teaching staff information page
 * - "/course-material" - Lecture slides page
 * - "/projects" - Course projects page
 */
const App = () => {
  const [path, setPath] = useState(() => getAppPath());

  useEffect(() => {
    const handleRouteChange = () => setPath(getAppPath());
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [path]);

  const routes: Record<string, JSX.Element> = {
    "/": <Home />,
    "/course-calendar": <CourseCalendar />,
    "/teaching-staff": <TeachingStaff />,
    "/course-material": <CourseMaterial />,
    "/projects": <Projects />,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
        <TooltipProvider>
          {/* Toast notification components for user feedback */}
          <Toaster />
          <Sonner />
          
          {routes[path] ?? <Home />}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
