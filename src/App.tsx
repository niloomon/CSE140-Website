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
import { BrowserRouter, Routes, Route } from "react-router-dom"; // For client-side routing
import { ThemeProvider } from "next-themes"; // For theme management

// Page Component Imports
import Home from "./pages/Home";
import CourseCalendar from "./pages/CourseCalendar";
import TeachingStaff from "./pages/TeachingStaff";
import CourseMaterial from "./pages/CourseMaterial";
import Projects from "./pages/Projects";
import ScrollToTop from "./components/ScrollToTop";

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Wraps the entire application with necessary providers:
 * - QueryClientProvider: Enables React Query for data fetching
 * - ThemeProvider: Manages theme (currently forced to light mode)
 * - TooltipProvider: Enables tooltip functionality across the app
 * - BrowserRouter: Enables client-side routing
 * 
 * Defines all application routes:
 * - "/" - Home page (Home)
 * - "/course-calendar" - Course calendar page
 * - "/teaching-staff" - Teaching staff information page
 * - "/course-material" - Lecture slides page
 * - "/projects" - Course projects page
 */
const App = () => {
  // Get base URL - use build-time value, but allow runtime detection for GitHub Pages
  let routerBase = import.meta.env.BASE_URL ?? "/";
  
  // Runtime detection: Always try to detect the correct base path from the URL
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const buildBase = routerBase;
    const knownRoutes = ['course-calendar', 'teaching-staff', 'course-material', 'projects'];
    
    // Extract path segments
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // Strategy 1: If pathname starts with a segment that's not a known route, it's likely the repo name
    if (firstSegment && !knownRoutes.includes(firstSegment)) {
      const detectedBase = `/${firstSegment}/`;
      // Use detected base if:
      // - Build base is "/" (root) but we're clearly in a subdirectory, OR
      // - The detected base matches what we expect from the build
      if (buildBase === "/" || pathname.startsWith(detectedBase)) {
        routerBase = detectedBase;
        console.log(`Detected base path from URL: ${detectedBase}`);
      }
    }
    
    // Strategy 2: If we're at root but build expects a base, check if we should use root
    if (pathname === "/" || pathname === "/index.html") {
      // If we're at root but build has a base, we might be on a user page
      // Keep the build base in this case
    }
    
    // Ensure base ends with / if not root
    if (routerBase !== "/" && !routerBase.endsWith("/")) {
      routerBase = routerBase + "/";
    }
    
    // Debug logging
    console.log('=== App Initialization ===');
    console.log('Build-time BASE_URL:', buildBase);
    console.log('Detected router basename:', routerBase);
    console.log('Current pathname:', pathname);
    console.log('Current URL:', window.location.href);
    console.log('Path segments:', segments);
  } else {
    // Server-side: ensure base ends with /
    if (routerBase !== "/" && !routerBase.endsWith("/")) {
      routerBase = routerBase + "/";
    }
  }

  // Add a visible test element to verify React is rendering
  const testElement = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 99999,
      fontSize: '12px'
    }}>
      React is rendering! Base: {routerBase} | Path: {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
        <TooltipProvider>
          {testElement}
          {/* Toast notification components for user feedback */}
          <Toaster />
          <Sonner />
          
          {/* Router setup - handles all page navigation */}
          <BrowserRouter basename={routerBase}>
            {/* Scroll to top on route change */}
            <ScrollToTop />
            <Routes>
              {/* Home page - Course overview and information */}
              <Route path="/" element={<Home />} />
              
              {/* Calendar page - Course schedule and important dates */}
              <Route path="/course-calendar" element={<CourseCalendar />} />
              
              {/* Teaching staff page - Instructor, TAs, and tutors information */}
              <Route path="/teaching-staff" element={<TeachingStaff />} />
              
              {/* Lecture slides page - Downloadable lecture materials */}
              <Route path="/course-material" element={<CourseMaterial />} />
              
              {/* Projects page - Course programming assignments */}
              <Route path="/projects" element={<Projects />} />
              
              {/* Catch-all route for debugging - shows what route matched */}
              <Route path="*" element={
                <div style={{ 
                  padding: '40px', 
                  textAlign: 'center',
                  background: 'white',
                  minHeight: '100vh',
                  color: 'black'
                }}>
                  <h1 style={{ color: 'red', fontSize: '24px', marginBottom: '20px' }}>
                    ⚠️ Route Not Found
                  </h1>
                  <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <p><strong>Current Pathname:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</p>
                    <p><strong>Router Basename:</strong> {routerBase}</p>
                    <p><strong>Full URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
                    <p><strong>Build-time BASE_URL:</strong> {import.meta.env.BASE_URL || 'Not set'}</p>
                    <hr style={{ margin: '20px 0' }} />
                    <p><a href={routerBase === "/" ? "/" : routerBase} style={{ color: 'blue', textDecoration: 'underline' }}>
                      → Go to Home ({routerBase === "/" ? "/" : routerBase})
                    </a></p>
                  </div>
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;