/**
 * CourseMaterial.tsx - Course Material Page Component
 * 
 * This page displays a table of all lecture slides available for download.
 * Features:
 * - Module numbers and topics
 * - Availability status for each lecture
 * - Responsive table design
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/ui/card';
import { BookOpen, Download, Eye } from 'lucide-react';

type SlideEntry = {
  number: number;
  topic: string;
  pdf: string;
};

type SlideSection = {
  title: string;
  description: string;
  data: SlideEntry[];
  columnLabel?: string;
  isCheatSheet?: boolean;
};

const getDownloadUrl = (url: string): string => {
  return url;
};

/**
 * CourseMaterial Component
 * 
 * Displays a table of lecture slides with:
 * - Module numbers
 * - Lecture topics
 * - View and download links
 */
const CourseMaterial = () => {
  // Lecture data - array of all lectures with module numbers and topics
  const lectureSlides: SlideEntry[] = [
    { number: 0, topic: 'Intro', pdf: '#' },
    { number: 0, topic: 'Intelligent Agents', pdf: '#' },
    { number: 1, topic: 'Blind Search', pdf: '#' },
    { number: 1, topic: 'Heuristic Search', pdf: '#' },
    { number: 2, topic: 'Constraint Satisfaction Problems', pdf: '#' },
    { number: 3, topic: 'Adversarial Search', pdf: '#' },
    { number: 4, topic: 'MDP-Value/Policy Iteration', pdf: '#' },
    { number: 4, topic: 'Reinforcement Learning', pdf: '#' },
    { number: 4, topic: 'Q Learning', pdf: '#' },
    { number: 5, topic: 'Logic Slides I', pdf: '#' },
    { number: 5, topic: 'Logic Slides II', pdf: '#' },
    { number: 6, topic: 'Probability', pdf: '#' },
    { number: 6, topic: 'Bayes Nets', pdf: '#' }
  ];

  const discussionSlides: SlideEntry[] = [
    { number: 1, topic: 'Search Algorithms', pdf: '#' },
    { number: 2, topic: 'Search Agents', pdf: '#' },
    { number: 3, topic: 'MultiAgent Pacman', pdf: '#' },
    { number: 4, topic: 'MultiAgent Pacman', pdf: '#' },
    { number: 5, topic: 'Value Iteration and Q Learning - 1', pdf: '#' },
    { number: 6, topic: 'Value Iteration and Q Learning - 2', pdf: '#' },
  ];

  const supplementaryNotes: SlideEntry[] = [
    { number: 3, topic: 'Practice Alpha-Beta Pruning', pdf: 'https://schaerli.org/info2/abTreePractice/' },
    { number: 4, topic: 'Approximate Q-Learning', pdf: 'https://forns.lmu.build/classes/spring-2020/cmsi-432/lecture-11-2.html' },
    { number: 4, topic: 'MDP and Reinforcement Learning Summary', pdf: '#' },
    { number: 4, topic: 'P3 Compendium', pdf: '#' },
    { number: 5, topic: 'Knowledge Representation and Logical Agents Summary', pdf: '#' },
    { number: 6, topic: 'Bayes and Probabilistic Reasoning Summary', pdf: '#' },
    { number: 6, topic: 'D-Seperation Notes', pdf: '#' },
  ];

  const cheatSheets: SlideEntry[] = [
    { number: 0, topic: 'Quiz 12', pdf: '#' },
    { number: 0, topic: 'Quiz 34', pdf: '#' },
    { number: 0, topic: 'Quiz 56', pdf: '#' },
    { number: 0, topic: 'Final Exam', pdf: '#' },
  ];

  const slideSections: SlideSection[] = [
    {
      title: 'Lecture Slides',
      description: 'Lecture decks are posted in Canvas for the active quarter.',
      data: lectureSlides,
    },
    {
      title: 'Discussion Slides',
      description: 'Discussion materials are posted in Canvas for the active quarter.',
      data: discussionSlides,
      columnLabel: 'Discussion',
    },
    {
      title: 'Supplementary Material',
      description: 'Reference material to reinforce core concepts and refresh prerequisites.',
      data: supplementaryNotes,
    },
    {
      title: 'Cheat Sheet',
      description: 'Reference sheets for quizzes and exams are posted in Canvas when available.',
      data: cheatSheets,
      isCheatSheet: true,
    },
  ];

  return (
    <>
      {/* Navigation bar */}
      <Navbar />
      
      {/* Hero section with book icon */}
      <HeroSection
        title="Course Material"
        subtitle="Download lecture slides, discussion slides and supplementary materials"
        icon={<BookOpen className="h-12 w-12 text-blue-600" />}
      />
      
      {/* Main content area */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 pb-16 space-y-12">
          {slideSections.map((section) => (
            <section key={section.title}>
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-gray-600 mt-2">{section.description}</p>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                      <tr>
                        {!section.isCheatSheet && (
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32 whitespace-nowrap bg-gray-100">
                            {section.columnLabel ?? 'Module'}
                          </th>
                        )}
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-100">
                          {section.isCheatSheet ? 'Cheat Sheet' : 'Topic'}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-32 bg-gray-100">
                          PDF
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {section.data.map((entry, index) => {
                        const isAvailable = entry.pdf !== '#';
                        return (
                        <tr key={`${section.title}-${index}`} className="hover:bg-gray-50 transition-colors">
                          {!section.isCheatSheet && (
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {`${section.columnLabel ?? 'Module'} ${entry.number}`}
                            </td>
                          )}
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {entry.topic}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {isAvailable ? (
                              <div className="flex items-center justify-center gap-4">
                                <a
                                  href={entry.pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </a>
                                {!(section.title === 'Supplementary Material' && (index === 0 || index === 1)) && (
                                  <>
                                    <span className="text-gray-300">|</span>
                                    <a
                                      href={getDownloadUrl(entry.pdf)}
                                      download
                                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                    >
                                      <Download className="h-4 w-4" />
                                      Download
                                    </a>
                                  </>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Canvas</span>
                            )}
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default CourseMaterial;
