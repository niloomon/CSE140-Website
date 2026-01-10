/**
 * Home.tsx - Home Page Component
 * 
 * This is the main landing page for the CSE 140 course website.
 * Features:
 * - Interactive 3D hero section with Spline animation
 * - Spotlight hover effect
 * - Embedded Google Doc content
 * - Responsive design for mobile and desktop
 */

import React, { Suspense, lazy, useState, useRef, useCallback, useEffect } from 'react'
// Framer Motion imports - for animations and interactive effects
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useIframePreloader } from '@/hooks/use-iframe-preloader'
import { IframeSkeleton } from '@/components/ui/iframe-skeleton'
// Import Canvas course data (fetched at build time)
import canvasStaffData from '@/data/canvas-staff.json'

// Lazy load Spline 3D library - improves initial page load performance
const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * Utility function for combining class names
 * Filters out falsy values and joins remaining classes with spaces
 */
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Spotlight Component Props
 * Creates an interactive spotlight effect that follows mouse movement
 */
type SpotlightProps = {
  className?: string; // Additional CSS classes
  size?: number; // Size of the spotlight in pixels
  springOptions?: SpringOptions; // Framer Motion spring animation options
};

/**
 * Spotlight Component
 * 
 * Creates an animated spotlight effect that follows the mouse cursor.
 * Uses Framer Motion springs for smooth animation.
 * Only visible when hovering over the parent element.
 */
export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  // Refs and state for tracking element and hover state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  // Spring animations for smooth mouse tracking
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  // Transform mouse coordinates to CSS position values (centered on cursor)
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () =>
        setIsHovered(false)
      );
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-zinc-50 via-zinc-100 to-zinc-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}

/**
 * SplineScene Component Props
 */
interface SplineSceneProps {
  scene: string; // URL to the Spline 3D scene file
  className?: string; // Additional CSS classes
}

/**
 * SplineScene Component
 * 
 * Wraps the Spline 3D component with Suspense for lazy loading.
 * Shows a loading spinner while the 3D scene loads.
 */
function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      // Loading fallback - spinner shown while 3D scene loads
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      {/* Spline 3D scene - interactive 3D animation */}
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}

/**
 * Interactive3D Component Props
 */
interface Interactive3DProps {
  className?: string; // Additional CSS classes
}

/**
 * Interactive3D Component
 * 
 * Main hero section with 3D Spline animation.
 * Features:
 * - Different layouts for mobile and desktop
 * - Welcome message and course description
 * - Interactive 3D scene
 * - Spotlight hover effect
 * - Smooth entrance animations
 */
function Interactive3D({ className }: Interactive3DProps) {
  return (
    <div className={cn("w-full bg-white dark:bg-black relative overflow-hidden", className)}>
      
      {/* Mobile Hero Section - Stacked layout (text on top, 3D scene below) */}
      <div className="md:hidden relative z-10 max-w-[1600px] mx-auto px-4 pt-8 pb-0">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="w-full h-auto bg-black/[0.96] relative overflow-hidden border-gray-200 dark:border-gray-700 mb-0">
            <Spotlight />
            <div className="flex flex-col h-full">
              {/* Text content - Top on mobile */}
              <div className="flex-1 p-6 relative z-10 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-3">
                  {canvasStaffData.course_name}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                  This course introduces the foundations of Artificial Intelligence, focusing on how intelligent agents reason, learn, and make decisions. Students will study core AI techniques including search, constraint satisfaction, probabilistic reasoning, decision-making under uncertainty, game playing, and reinforcement learning. Emphasis is placed on both theory and practical implementation through Python-based programming assignments. By the end of the course, students will be able to design, analyze, and evaluate AI systems for solving complex computational problems in dynamic environments.
                </p>
              </div>

              {/* 3D content - Bottom on mobile */}
              <div className="relative w-full h-[300px]">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Desktop Hero Section - Side-by-side layout (text on left, 3D scene on right) */}
      {/* Full viewport height minus navbar height */}
      <div className="hidden md:block h-[calc(100vh-6rem)] relative px-8 pt-8">
        <motion.div 
          className="h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden border-gray-200 dark:border-gray-700">
            <Spotlight />
            <div className="flex h-full">
              {/* Text content - Left on desktop */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                  {canvasStaffData.course_name}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  This course introduces the foundations of Artificial Intelligence, focusing on how intelligent agents reason, learn, and make decisions. Students will study core AI techniques including search, constraint satisfaction, probabilistic reasoning, decision-making under uncertainty, game playing, and reinforcement learning. Emphasis is placed on both theory and practical implementation through Python-based programming assignments. By the end of the course, students will be able to design, analyze, and evaluate AI systems for solving complex computational problems in dynamic environments.
                </p>
              </div>

              {/* 3D content - Right on desktop */}
              <div className="flex-1 relative">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


/**
 * GoogleDocEmbed Component
 * 
 * Displays a Google Doc in an embedded iframe with loading state.
 * Matches the styling pattern used in CourseCalendar and other pages.
 */
const GoogleDocEmbed = () => {
  const GOOGLE_DOC_URL = 'https://docs.google.com/document/d/1Ppt5T9w8sUsd-aUSZ9rcst4KtCdgOcg6NuV6-tWE814/edit?tab=t.0';
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-white pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Iframe container - fixed height for proper display */}
        <div className="w-full relative" style={{ height: '1200px' }}>
          {/* Loading skeleton - only shown if iframe is actually loading */}
          {isLoading && (
            <div className="absolute inset-0 z-10">
              <IframeSkeleton height="1200px" text="Loading Syllabus..." />
            </div>
          )}
          
          {/* Embedded Google Doc - loads immediately, shows course document */}
          <iframe
            ref={iframeRef}
            src={GOOGLE_DOC_URL}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title="Course Document"
            loading="eager"
            onLoad={handleIframeLoad}
            style={{ 
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Home Component (Main Page Component)
 * 
 * This is the main component exported as the home page.
 * It combines:
 * - Navigation bar
 * - Interactive 3D hero section
 * - Google Doc embedded content
 * - Footer
 * - Preloads Google Docs calendars in the background
 */
const Home = () => {
  // Preload Google Docs iframes when home page loads
  useIframePreloader();

  return (
    <>
      {/* Navigation bar - sticky at top */}
      <Navbar />
      
      {/* Interactive 3D hero section with welcome message */}
      <Interactive3D />
      
      {/* Google Doc embedded content */}
      <GoogleDocEmbed />
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home;