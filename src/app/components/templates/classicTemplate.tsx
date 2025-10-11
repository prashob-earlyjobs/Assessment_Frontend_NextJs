import React from 'react';
import { Badge } from "../../components/ui/badge";
import { Mail, MapPin, PhoneCallIcon, User2, School, Briefcase, Award } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface WorkExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}



interface Extracurricular {
  activity: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  certifications: string[];
  projects: Project[];
  achievements: Achievement[];
  extracurriculars: Extracurricular[];
}

interface ClassicTemplateProps {
  data: ResumeData;
  isGeneratingPDF: boolean;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, isGeneratingPDF }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-gray-800 print:p-0 print:m-0">
      {/* Header with Name, Position */}
      <header className="mb-8 text-center pb-6">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo.fullName || 'Christopher Johnson'}</h1>
        <p className="text-xl text-gray-600 mt-2">{data.workExperience[0]?.position || 'Sales Manager'}</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 print:flex-row print:gap-8">
        {/* Left Sidebar for Details, Skills, Projects, Achievements, Certifications */}
        <aside className="w-full lg:w-3/7 bg-background p-5 print:w-3/7 print:bg-white print:shadow-none border-r-2 border-gray-800 space-y-6">
          {/* Details (Always Rendered) */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Details</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p className='flex items-center'><PhoneCallIcon className="mr-1 h-4" /><span className={isGeneratingPDF ? 'mb-[1rem]' : ''}> {data.personalInfo.phone || '(650) 917-0247'}</span></p>
              <p className='flex items-center'><Mail className="mr-1 h-4" /><span className={isGeneratingPDF ? 'mb-[1rem]' : ''}> {data.personalInfo.email || 'ab@gmail.com'}</span></p>
              <p className='flex items-center'><MapPin className="mr-1 h-4" /><span className={isGeneratingPDF ? 'mb-[1rem]' : ''}> {data.personalInfo.location || 'San Francisco'}</span></p>
            </div>
          </section>

          {/* Links (Conditionally Rendered) */}
          {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.website) && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Links</h2>
              <div className="flex flex-wrap gap-2">
                {data.personalInfo.linkedin && (
                  <a href={data.personalInfo.linkedin} className="text-blue-600 hover:text-blue-800">
                    LinkedIn
                  </a>
                )}
                {data.personalInfo.github && (
                  <a href={data.personalInfo.github} className="text-blue-600 hover:text-blue-800">
                    GitHub
                  </a>
                )}
                {data.personalInfo.website && (
                  <a href={data.personalInfo.website} className="text-blue-600 hover:text-blue-800">
                    Website
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Skills (Conditionally Rendered) */}
          {data.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="text-gray-700 text-sm   rounded">
                    ● {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects (Conditionally Rendered) */}
          {data.projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-900">{project.name || 'Project Name'}</h3>
                  <p className="text-gray-600 text-sm">{project.description || 'Project description here'}</p>
                  <p className="text-gray-500 text-sm">Technologies: {project.technologies || 'N/A'}</p>
                  {project.link && (
                    <p className="text-sm"><a href={project.link} className="underline text-blue-600 hover:text-blue-800">View Project</a></p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements (Conditionally Rendered) */}
          {data.achievements?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">Achievements</h2>
              {data.achievements.map((achievement, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700"><strong>{achievement.title || 'Achievement Title'}</strong> - {achievement.description || 'Description'} ({achievement.date || 'Date'})</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications (Conditionally Rendered) */}
          {data.certifications?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2 flex items-center">
                 Certifications
              </h2>
              {data.certifications.map((certification, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-800">
                    ● {certification || 'Certification Title'}
                  </p>
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Right Main Content for Summary, Work Experience, Education, Extracurriculars */}
        <main className="w-full lg:w-4/7 space-y-6 print:w-4/7">
          {/* Professional Summary (Conditionally Rendered) */}
          {data.professionalSummary && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 flex items-center"><User2 className='inline-block mr-2 h-4'/><span className={isGeneratingPDF ? 'mb-[1rem]' : ''}> Professional Summary</span></h2>
              <p className="text-gray-700 leading-relaxed">
                {data.professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience (Conditionally Rendered) */}
          {data.workExperience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 flex items-center"><Briefcase className='inline-block mr-2 h-4'/> <span className={isGeneratingPDF ? 'mb-[1rem]' : ''}>Work Experience</span></h2>
              {data.workExperience.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{job.position || 'Sales Manager'}</h3>
                      <p className="text-gray-600">{job.company || 'Google, New York, NY'}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{job.startDate || 'Nov 2020'} - {job.endDate || 'Present'}</span>
                  </div>
                  <ul className="text-gray-700 mt-2 ml-4 space-y-1">
                    {job.description.map((desc, i) => desc && <li key={i} className="text-sm">{desc}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Education (Conditionally Rendered) */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 flex items-center"><School className='inline-block mr-2 h-4'/><span className={isGeneratingPDF ? 'mb-[1rem]' : ''} >Education</span> </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600">{edu.degree || 'B.A. Economics'} {edu.field && `in ${edu.field}`}</p>
                      <p className="text-gray-500 text-sm">{edu.school || 'Columbia University, New York, NY'}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{edu.startDate || 'Sep 2014'} - {edu.endDate || 'May 2018'}</span>
                  </div>
                  {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Extracurriculars (Conditionally Rendered) */}
          {data.extracurriculars?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 flex items-center"><Award className='inline-block mr-2 h-4'/><span className={isGeneratingPDF ? 'mb-[1rem]' : ''}>Extracurriculars</span></h2>
              {data.extracurriculars.map((extracurricular, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700"><strong>{extracurricular.activity || 'Activity Title'}</strong> - {extracurricular.role || 'Role'} ({extracurricular.startDate || 'Start Date'} - {extracurricular.endDate || 'End Date'})</p>
                  <p className="text-gray-600">{extracurricular.description || 'Description'}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClassicTemplate;