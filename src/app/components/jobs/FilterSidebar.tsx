"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Filter, Search, ChevronDown, MapPin } from "lucide-react";

interface FilterSidebarProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  employmentType: string[];
  setEmploymentType: (value: string[]) => void;
  workType: string[];
  setWorkType: (value: string[]) => void;
  salaryRange: string[];
  setSalaryRange: (value: string[]) => void;
  experienceRange: string[];
  setExperienceRange: (value: string[]) => void;
}

const FilterSidebar = ({
  companyName,
  setCompanyName,
  location,
  setLocation,
  title,
  setTitle,
  searchInput,
  setSearchInput,
  employmentType,
  setEmploymentType,
  workType,
  setWorkType,
  salaryRange,
  setSalaryRange,
  experienceRange,
  setExperienceRange,
}: FilterSidebarProps) => {
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    { title: "Location", isOpen: true },
    { title: "Employment Type", isOpen: true },
    { title: "Work Type", isOpen: true },
    { title: "Salary Range", isOpen: true },
    { title: "Experience", isOpen: true },
  ]);

  // State for selected filters
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>(employmentType);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(workType);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>(salaryRange);
  const [selectedExperienceRanges, setSelectedExperienceRanges] = useState<string[]>(experienceRange);

  // Calculate total selected filters
  const totalSelectedFilters =
    selectedEmploymentTypes.length +
    selectedWorkTypes.length +
    selectedSalaryRanges.length +
    selectedExperienceRanges.length +
    (location ? 1 : 0);

  const toggleSection = (index: number) => {
    setFilterSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section))
    );
  };

  const employmentTypes = [
    { id: "full-time", label: "Full Time" },
    { id: "part-time", label: "Part Time" },
    { id: "internship", label: "Internship" },
    { id: "contract", label: "Contract" },
    { id: "freelance", label: "Freelance" },
  ];

  const workTypes = [
    { id: "on-site", label: "On-site" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const salaryRanges = [
    { id: "0-3", label: "0 - 3 LPA" },
    { id: "3-6", label: "3 - 6 LPA" },
    { id: "6-10", label: "6 - 10 LPA" },
    { id: "10+", label: "10+ LPA" },
  ];

  const experienceRanges = [
    { id: "0-2", label: "0 - 2 years" },
    { id: "2-5", label: "2 - 5 years" },
    { id: "5+", label: "5+ years" },
  ];

  // Sync local state with parent state
  useEffect(() => {
    setSelectedEmploymentTypes(employmentType);
  }, [employmentType]);

  useEffect(() => {
    setSelectedWorkTypes(workType);
  }, [workType]);

  useEffect(() => {
    setSelectedSalaryRanges(salaryRange);
  }, [salaryRange]);

  useEffect(() => {
    setSelectedExperienceRanges(experienceRange);
  }, [experienceRange]);

  // Handle employment type selection
  const handleEmploymentTypeChange = (employmentTypeId: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...selectedEmploymentTypes, employmentTypeId]
      : selectedEmploymentTypes.filter((id) => id !== employmentTypeId);
    setSelectedEmploymentTypes(updatedTypes);
    setEmploymentType(updatedTypes);
  };

  // Handle work type selection
  const handleWorkTypeChange = (workTypeId: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...selectedWorkTypes, workTypeId]
      : selectedWorkTypes.filter((id) => id !== workTypeId);
    setSelectedWorkTypes(updatedTypes);
    setWorkType(updatedTypes);
  };

  // Handle salary range selection
  const handleSalaryRangeChange = (salaryId: string, checked: boolean) => {
    const updatedRanges = checked
      ? [...selectedSalaryRanges, salaryId]
      : selectedSalaryRanges.filter((id) => id !== salaryId);
    setSelectedSalaryRanges(updatedRanges);
    setSalaryRange(updatedRanges);
  };

  // Handle experience selection
  const handleExperienceChange = (expId: string, checked: boolean) => {
    const updatedRanges = checked
      ? [...selectedExperienceRanges, expId]
      : selectedExperienceRanges.filter((id) => id !== expId);
    setSelectedExperienceRanges(updatedRanges);
    setExperienceRange(updatedRanges);
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter By</span>
          <Badge variant="secondary" className="ml-auto">{totalSelectedFilters}</Badge>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          {totalSelectedFilters > 0 ? (
            <div className="space-y-1">
              {location && <div> <MapPin className="w-4 h-4 text-gray-400 inline" /> {location}</div>}
              {selectedEmploymentTypes.length > 0 && (
                <div>
                  Employment Type:{" "}
                  {selectedEmploymentTypes
                    .map((id) => employmentTypes.find((t) => t.id === id)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {selectedWorkTypes.length > 0 && (
                <div>
                  Work Type:{" "}
                  {selectedWorkTypes
                    .map((id) => workTypes.find((t) => t.id === id)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {selectedSalaryRanges.length > 0 && (
                <div>
                  Salary:{" "}
                  {selectedSalaryRanges
                    .map((id) => salaryRanges.find((s) => s.id === id)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {selectedExperienceRanges.length > 0 && (
                <div>
                  Experience:{" "}
                  {selectedExperienceRanges
                    .map((id) => experienceRanges.find((e) => e.id === id)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
            </div>
          ) : (
            "No filters selected"
          )}
        </div>
      </Card>

      {/* Filter Sections */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Location */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium"
              onClick={() => toggleSection(0)}
            >
              Location
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterSections[0].isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {filterSections[0].isOpen && (
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search Location"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            )}
            <hr className="my-4 border-gray-200" />
          </div>

          {/* Employment Type */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium"
              onClick={() => toggleSection(1)}
            >
              Employment Type
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterSections[1].isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {filterSections[1].isOpen && (
              <div className="mt-2 space-y-2">
                {employmentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedEmploymentTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleEmploymentTypeChange(type.id, checked as boolean)}
                    />
                    <label htmlFor={type.id} className="text-sm text-gray-700 cursor-pointer">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-4 border-gray-200" />
          </div>

          {/* Work Type */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium"
              onClick={() => toggleSection(2)}
            >
              Work Type
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterSections[2].isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {filterSections[2].isOpen && (
              <div className="mt-2 space-y-2">
                {workTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedWorkTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleWorkTypeChange(type.id, checked as boolean)}
                    />
                    <label htmlFor={type.id} className="text-sm text-gray-700 cursor-pointer">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-4 border-gray-200" />
          </div>

          {/* Salary Range */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium"
              onClick={() => toggleSection(3)}
            >
              Salary Range
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterSections[3].isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {filterSections[3].isOpen && (
              <div className="mt-2 space-y-2">
                {salaryRanges.map((range) => (
                  <div key={range.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={range.id}
                      checked={selectedSalaryRanges.includes(range.id)}
                      onCheckedChange={(checked) => handleSalaryRangeChange(range.id, checked as boolean)}
                    />
                    <label htmlFor={range.id} className="text-sm text-gray-700 cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-4 border-gray-200" />
          </div>

          {/* Experience */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium"
              onClick={() => toggleSection(4)}
            >
              Experience
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterSections[4].isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {filterSections[4].isOpen && (
              <div className="mt-2 space-y-2">
                {experienceRanges.map((exp) => (
                  <div key={exp.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={exp.id}
                      checked={selectedExperienceRanges.includes(exp.id)}
                      onCheckedChange={(checked) => handleExperienceChange(exp.id, checked as boolean)}
                    />
                    <label htmlFor={exp.id} className="text-sm text-gray-700 cursor-pointer">
                      {exp.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

interface FilterSection {
  title: string;
  isOpen: boolean;
}

export default FilterSidebar;