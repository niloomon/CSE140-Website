/**
 * CourseCalendar.tsx - Course Calendar Page Component
 *
 * The "Current Calendar" box shows an embedded Google Doc.
 * ⬇️ EDIT src/data/course-calendar.json — not this file — to change what it shows.
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Calendar as CalendarIcon } from 'lucide-react';

import calendarData from '@/data/course-calendar.json';

/**
 * Turns an ordinary Google Docs link into one that can be embedded.
 * A link already ending in /preview or /pub is used as it is.
 */
const toEmbedUrl = (url: string): string => {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  if (/\/(preview|pub)(\?|$)/.test(trimmed)) return trimmed;

  const docMatch = trimmed.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch) return `https://docs.google.com/document/d/${docMatch[1]}/preview`;

  return trimmed;
};

const CourseCalendar = () => {
  const heading = calendarData.heading || 'Current Calendar';
  const embedUrl = toEmbedUrl(calendarData.embedUrl);
  const height = calendarData.height || 800;

  return (
    <>
      <Navbar />

      <HeroSection
        title="Course Calendar"
        subtitle="CSE 140 - Introduction to Artificial Intelligence"
        icon={<CalendarIcon className="h-12 w-12 text-blue-600" />}
      />

      <div className="bg-white pb-8">
        <div className="container mx-auto px-4 py-8">
          {embedUrl ? (
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">{heading}</h2>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <iframe
                  src={embedUrl}
                  title={heading}
                  loading="lazy"
                  className="w-full"
                  style={{ height: `${height}px`, border: 'none' }}
                />
              </div>
              <p className="mt-3 text-center text-sm text-gray-600">
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Open the calendar in a new tab
                </a>
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">{heading}</h2>
              <p className="leading-relaxed text-gray-700">{calendarData.fallbackText}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseCalendar;
