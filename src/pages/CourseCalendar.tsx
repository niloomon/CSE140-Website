/**
 * CourseCalendar.tsx - Course Calendar Page Component
 *
 * Quarter-specific dates and live calendar links are kept in Canvas.
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Calendar as CalendarIcon } from 'lucide-react';

const CourseCalendar = () => {
  return (
    <>
      <Navbar />

      <HeroSection
        title="Course Calendar"
        subtitle="CSE 140 - Artificial Intelligence"
        icon={<CalendarIcon className="h-12 w-12 text-blue-600" />}
      />

      <div className="bg-white pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Current Calendar</h2>
            <p className="text-gray-700 leading-relaxed">
              The live course calendar, deadlines, and schedule updates are posted in Canvas for the active quarter.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseCalendar;
