/**
 * TeachingStaff.tsx - Teaching Staff Page Component
 *
 * Displays staff names without quarter-specific contact details.
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

import canvasStaffData from '@/data/canvas-staff.json';
import instructorBiosData from '@/data/instructor-bio.json';

type StaffMember = {
  name: string;
  title?: string;
  bio?: string;
  sections?: string;
  image?: string;
};

const fallbackInstructor: StaffMember = {
  name: 'Niloofar Montazeri',
  title: 'Assistant Teaching Professor',
  bio: 'My name is Niloofar Montazeri, and I am your instructor for CSE 140. I am an Assistant Teaching Professor at UC Santa Cruz, with previous experience teaching for seven years at UC Riverside. I hold a PhD in Computer Science from the University of Southern California, specializing in Human Language Technologies.',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
};

const getAvatarUrl = (name: string): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=400`;

const getInstructorInfo = (name: string): { bio: string; title: string } | null => {
  const bios = (instructorBiosData as any).instructor_bios || [];
  const matchedInfo = bios.find((bioEntry: any) =>
    bioEntry.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
  return matchedInfo ? { bio: matchedInfo.bio || '', title: matchedInfo.title || '' } : null;
};

const TeachingStaff = () => {
  const rawInstructors = (canvasStaffData as any).instructors
    ? (canvasStaffData as any).instructors
    : Array.isArray((canvasStaffData as any).instructor)
    ? (canvasStaffData as any).instructor
    : (canvasStaffData as any).instructor
    ? [(canvasStaffData as any).instructor]
    : [];

  const instructors: StaffMember[] = rawInstructors.length > 0
    ? rawInstructors.map((instructor: any) => {
        const instructorInfo = getInstructorInfo(instructor.name);
        return {
          name: instructor.name,
          title: instructorInfo?.title || undefined,
          bio: instructorInfo?.bio || 'Bio not available for this instructor.',
          image: getAvatarUrl(instructor.name),
        };
      })
    : [fallbackInstructor];

  const tas: StaffMember[] = ((canvasStaffData as any).tas || []).map((ta: any) => ({
    name: ta.name,
    sections: ta.sections || '',
    image: getAvatarUrl(ta.name),
  }));

  const tutors: StaffMember[] = ((canvasStaffData as any).tutors || []).map((tutor: any) => ({
    name: tutor.name,
    image: getAvatarUrl(tutor.name),
  }));

  return (
    <>
      <Navbar />

      <HeroSection
        title="Teaching Staff"
        subtitle="Meet your instructor, teaching assistants and tutors for CSE 140"
        icon={<Users className="h-12 w-12 text-blue-600" />}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {instructors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                {instructors.length === 1 ? 'Instructor' : 'Instructors'}
              </h2>

              {instructors.map((instructor, index) => (
                <Card key={instructor.name} className="p-8 mb-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex justify-center md:justify-start">
                      <img
                        src={index === 0 && instructor.image ? instructor.image : getAvatarUrl(instructor.name)}
                        alt={instructor.name}
                        className="w-52 h-52 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                      <p className="text-lg text-blue-600 mb-4">{instructor.title || '\u00A0'}</p>
                      <p className="text-gray-600 mb-6">{instructor.bio}</p>
                      <p className="text-sm text-gray-700">
                        Instructor contact information is available through Canvas.
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tas.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Teaching Assistants</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {tas.map((ta) => (
                  <Card key={ta.name} className="p-6 hover:shadow-lg transition-shadow w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                    <img
                      src={ta.image}
                      alt={ta.name}
                      className="w-full h-48 rounded-lg object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{ta.name}</h3>
                    {ta.sections && <p className="text-sm text-gray-700">{ta.sections}</p>}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tutors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Undergraduate Assistants</h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-[1608px] mx-auto">
                {tutors.map((tutor) => (
                  <Card key={tutor.name} className="p-6 hover:shadow-lg transition-shadow w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-sm">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-48 rounded-lg object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tutor.name}</h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Office Hours</h2>
            <p className="text-gray-700">
              The current office-hour schedule, meeting locations, and online meeting links are posted in Canvas.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeachingStaff;
