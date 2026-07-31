/**
 * Home.tsx - Home Page Component
 *
 * Main landing page for the CSE 140 course website.
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import canvasStaffData from '@/data/canvas-staff.json';

const courseDescription =
  'This course introduces the foundations of Artificial Intelligence, focusing on how intelligent agents reason, learn, and make decisions. Students will study core AI techniques including search, constraint satisfaction, probabilistic reasoning, decision-making under uncertainty, game playing, and reinforcement learning. Emphasis is placed on both theory and practical implementation through Python-based programming assignments.';

const Hero = () => (
  <section className="bg-white">
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
          CSE 140
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-950 mb-6">
          {canvasStaffData.course_name}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {courseDescription}
        </p>
      </div>
    </div>
  </section>
);

const CourseInfoNotice = () => (
  <div className="bg-white pb-10">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Quarter-Specific Information</h2>
        <p className="text-gray-700 leading-relaxed">
          The syllabus, staff contact information, office hours, course calendar, and live discussion links
          are provided through Canvas for enrolled students.
        </p>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseInfoNotice />
      <Footer />
    </>
  );
};

export default Home;
