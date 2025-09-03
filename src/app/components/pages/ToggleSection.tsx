import { useState } from "react";
import { cn } from "../../lib/utils";
import { Briefcase, FileText, User, Search, Building, Award } from "lucide-react";
import AIResume from "./ResumePage";
import Assessments from "./AssessmentsDup";
import ApplyJobs from "./ApplyJob";

type ToggleOption = "apply" | "assessments" | "resume";

const ToggleSection = () => {
  const [activeSection, setActiveSection] = useState<ToggleOption>("apply");

  const toggleOptions = [
    { id: "apply" as const, label: "Apply Job", icon: Briefcase },
    { id: "assessments" as const, label: "Assessments", icon: Award },
    { id: "resume" as const, label: "Resume Builder", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "apply":
        return (
          <ApplyJobs />
        );
        
      case "assessments":
        return (
          <Assessments />
        );
        
      case "resume":
        return (
          <AIResume />
        );
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Toggle Switches */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-2 rounded-lg flex space-x-2">
            {toggleOptions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-300 font-medium",
                  activeSection === id
                    ? "bg-orange-500 text-white shadow-xl"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default ToggleSection;