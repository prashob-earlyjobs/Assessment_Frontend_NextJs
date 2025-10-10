import React from 'react';
import { Badge } from "../../components/ui/badge";
import { Mail,MapPin, PhoneCallIcon ,Github, Linkedin, Globe} from 'lucide-react';


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
  projects: Project[];
  achievements: Achievement[];
  extracurriculars: Extracurricular[];
}

interface MinimalTemplateProps {
  data: ResumeData;
  isGeneratingPDF?: boolean;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, isGeneratingPDF }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800">
      <header className="border-b border-gray-300 pb-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black">{data.personalInfo.fullName || 'John Doe'}</h1>
            <p className="text-lg text-black mt-1">
              {data.workExperience[0]?.position || 'Student'}
            </p>
            <div className="flex items-center space-x-6 text-sm mt-3 text-black opacity-90">
              <span>{data.personalInfo.email || 'johndoe68@gmail.com'}</span>
              <span>{data.personalInfo.phone || '123456789'}</span>
              <span>{data.personalInfo.location}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-black opacity-90 items-center">
              {data.personalInfo.linkedin && (
                <a href={data.personalInfo.linkedin} className="flex items-center">
                  <Linkedin className="mr-1 h-4 inline" />
                  <span className={isGeneratingPDF ? 'mb-[1rem]' : ''}>{data.personalInfo.linkedin.slice(28)}</span>
                </a>
              )}
              {data.personalInfo.website && (
                <a href={data.personalInfo.website} className="flex items-center">
                  <Globe className="mr-1 h-4 inline" />
                  <span className={isGeneratingPDF ? 'mb-[1rem]' : ''}>View Website</span>
                </a>
              )}
              {data.personalInfo.github && (
                <a href={data.personalInfo.github} className="flex items-center">
                  <Github className="mr-1 h-4 inline" />
                  <span className={isGeneratingPDF ? 'mb-[1rem]' : ''}>{data.personalInfo.github.slice(19)}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
        </section>
      )}

      {data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Work Experience</h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.position || 'Software Developer Intern'}</h3>
                  <p className="text-black font-medium">{job.company || 'Company Name'}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {job.startDate && job.endDate
                    ? `${job.startDate} - ${job.endDate}`
                    : job.startDate || job.endDate || 'Present'}
                </span>
              </div>
              {job.description.some(desc => desc.trim()) && (
                <ul className="text-gray-700 text-sm leading-relaxed pl-5">
                  {job.description.map((desc, i) => desc.trim() && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-black font-medium">{edu.school}</p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-gray-500 text-sm">
                  {edu.startDate && edu.endDate
                    ? `${edu.startDate} - ${edu.endDate}`
                    : edu.startDate || edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-900">{project.name || 'Project Name'}</h3>
                {project.link && (
                  <a href={project.link} className="text-black font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                )}
              </div>
              {project.technologies && (
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Technologies:</span> {project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Achievements</h2>
          {data.achievements.map((achievement, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-700">
                ● {achievement.title} ({achievement.date}): {achievement.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {data.extracurriculars.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 mb-4">Extracurricular Activities</h2>
          {data.extracurriculars.map((extra, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{extra.activity} - {extra.role}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{extra.description}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {extra.startDate && extra.endDate
                    ? `${extra.startDate} - ${extra.endDate}`
                    : extra.startDate || extra.endDate || 'Present'}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;