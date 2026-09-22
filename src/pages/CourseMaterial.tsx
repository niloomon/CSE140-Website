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
import courseMaterials from '@/data/course-materials.json';

// ⬇️ ALL THE CONTENT OF THIS PAGE LIVES IN src/data/course-materials.json
//    Add or change a slide link there. You do not need to edit this file.

type SlideEntry = {
  number: number;
  topic: string;
  link: string;
  viewOnly?: boolean;
  hidden?: boolean;
};

type SlideSection = {
  title: string;
  description: string;
  items: SlideEntry[];
  columnLabel?: string;
  isCheatSheet?: boolean;
  emptyLabel?: string;
  folderLink?: string;
  folderLinkLabel?: string;
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
  // Every row shown on this page comes from src/data/course-materials.json
  const slideSections = courseMaterials.sections as SlideSection[];

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
                {section.folderLink && (
                  <a
                    href={section.folderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    <Eye className="h-4 w-4" />
                    {section.folderLinkLabel ?? 'Open the folder'}
                  </a>
                )}
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
                      {section.items.filter((entry) => !entry.hidden).map((entry, index) => {
                        const isAvailable = Boolean(entry.link) && entry.link !== '#';
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
                                  href={entry.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </a>
                                {!entry.viewOnly && (
                                  <>
                                    <span className="text-gray-300">|</span>
                                    <a
                                      href={getDownloadUrl(entry.link)}
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
                              <span className="text-sm text-gray-500">{section.emptyLabel ?? 'Canvas'}</span>
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
