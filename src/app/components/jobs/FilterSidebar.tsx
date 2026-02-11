"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Search, ChevronDown, MapPin } from "lucide-react";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_DARK,
  PRIMARY_COLOR_LIGHT,
  BORDER_COLOR,
  BG_WHITE,
} from "../../../constants/theme";

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
  category: string[];
  setCategory: (value: string[]) => void;
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
  category,
  setCategory,
}: FilterSidebarProps) => {
  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>(employmentType);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(workType);
  const [selectedExperienceRanges, setSelectedExperienceRanges] = useState<string[]>(experienceRange);
  const [selectedDatePosted, setSelectedDatePosted] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  // Salary slider state
  const [salarySliderValue, setSalarySliderValue] = useState<number[]>([0, 9999]);
  const [tempSalaryRange, setTempSalaryRange] = useState<number[]>([0, 9999]);

  // Job title search state
  const [jobTitleSearch, setJobTitleSearch] = useState(title || searchInput || "");

  // Mock counts for each option (in real app, these would come from API)
  const getCount = () => 10;

  const employmentTypes = [
    { id: "full-time", label: "Full Time" },
    { id: "part-time", label: "Part Time" },
    { id: "freelance", label: "Freelance" },
    { id: "seasonal", label: "Seasonal" },
    { id: "fixed-price", label: "Fixed-Price" },
  ];

  const workTypes = [
    { id: "on-site", label: "On-site" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const experienceLevels = [
    { id: "no-experience", label: "No-experience" },
    { id: "fresher", label: "Fresher" },
    { id: "intermediate", label: "Intermediate" },
    { id: "expert", label: "Expert" },
  ];

  const datePostedOptions = [
    { id: "all", label: "All" },
    { id: "last-hour", label: "Last Hour" },
    { id: "last-24-hours", label: "Last 24 Hours" },
    { id: "last-7-days", label: "Last 7 Days" },
    { id: "last-30-days", label: "Last 30 Days" },
  ];

  const categories = [
    "All Categories",
    "Commerce",
    "Telecommunications",
    "Hotels & Tourism",
    "Education",
    "Financial Services",
    "Aviation",
    "Banking",
    "Insurance",
    "Oil And Gas",
    "Retail",
    "Consumer Goods",
    "Manufacturing",
    "Information Technology",
    "Health Care",
    "BPO",
    "ITES",
    "Entertainment",
    "Finance",
    "Textile",
    "Media and news",
    "Food processing",
    "Hospitality",
    "Construction",
    "Law",
    "Advertising",
    "E-commerce",
    "Other",
  ];

  const tags = [
    "engineering",
    "design",
    "ui/ux",
    "marketing",
    "management",
    "soft",
    "construction",
  ];

  // Sync local state with parent state
  useEffect(() => {
    setSelectedCategories(category);
  }, [category]);

  useEffect(() => {
    setSelectedEmploymentTypes(employmentType);
  }, [employmentType]);

  useEffect(() => {
    setSelectedWorkTypes(workType);
  }, [workType]);

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

  // Handle experience selection
  const handleExperienceChange = (expId: string, checked: boolean) => {
    const updatedRanges = checked
      ? [...selectedExperienceRanges, expId]
      : selectedExperienceRanges.filter((id) => id !== expId);
    setSelectedExperienceRanges(updatedRanges);
    setExperienceRange(updatedRanges);
  };

  // Handle category selection
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter((name) => name !== categoryName);
    setSelectedCategories(updatedCategories);
    setCategory(updatedCategories);
  };

  // Handle date posted selection
  const handleDatePostedChange = (dateId: string, checked: boolean) => {
    const updatedDates = checked
      ? [...selectedDatePosted, dateId]
      : selectedDatePosted.filter((id) => id !== dateId);
    setSelectedDatePosted(updatedDates);
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle salary slider change
  const handleSalarySliderChange = (value: number[]) => {
    setTempSalaryRange(value);
  };

  // Apply salary range
  const handleApplySalary = () => {
    setSalarySliderValue(tempSalaryRange);
    // Convert to salary range format expected by parent
    const rangeString = `${tempSalaryRange[0]}-${tempSalaryRange[1]}`;
    setSalaryRange([rangeString]);
  };

  // Handle job title search
  const handleJobTitleChange = (value: string) => {
    setJobTitleSearch(value);
    setTitle(value);
    setSearchInput(value);
  };

  return (
    <Card 
      className="rounded-lg border shadow-sm p-4"
      style={{ 
        backgroundColor: `${PRIMARY_COLOR_LIGHT}4D`, // 30% opacity (4D in hex = ~30%)
        borderColor: BORDER_COLOR
      }}
    >
      <div className="space-y-6">
        {/* Search by Job Title */}
                <div>
          <h3 className="text-base font-bold text-black mb-3">Search by Job Title</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Job title or company"
              className="pl-10 rounded-lg"
              style={{
                backgroundColor: BG_WHITE,
                borderColor: BORDER_COLOR
              }}
              value={jobTitleSearch}
              onChange={(e) => handleJobTitleChange(e.target.value)}
            />
            </div>
        </div>

          {/* Location */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Location</h3>
                <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
              placeholder="Choose city"
              className="pl-10 pr-10 rounded-lg"
              style={{
                backgroundColor: BG_WHITE,
                borderColor: BORDER_COLOR
              }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
          </div>

        {/* Category */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Category</h3>
          <div className="space-y-2">
                {(isCategoriesExpanded ? categories : categories.slice(0, 5)).map((cat) => (
              <div key={cat} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={(checked) => handleCategoryChange(cat, checked as boolean)}
                      className="border-[#F08504] data-[state=checked]:bg-[#F08504] data-[state=checked]:border-[#F08504] data-[state=checked]:text-white"
                    />
                    <label htmlFor={`category-${cat}`} className="text-sm text-gray-700 cursor-pointer">
                      {cat}
                    </label>
                </div>
                <span className="text-sm text-gray-500">{getCount()}</span>
                  </div>
                ))}
                {categories.length > 5 && (
                  <Button
                className="w-full text-white text-sm rounded-lg mt-2"
                style={{ backgroundColor: PRIMARY_COLOR }}
                    onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                  >
                {isCategoriesExpanded ? "Show Less" : "Show More"}
                  </Button>
                )}
              </div>
          </div>

        {/* Job Type */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Job Type</h3>
          <div className="space-y-2">
                {employmentTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedEmploymentTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleEmploymentTypeChange(type.id, checked as boolean)}
                      className="border-[#F08504] data-[state=checked]:bg-[#F08504] data-[state=checked]:border-[#F08504] data-[state=checked]:text-white"
                    />
                    <label htmlFor={type.id} className="text-sm text-gray-700 cursor-pointer">
                      {type.label}
                    </label>
                  </div>
                <span className="text-sm text-gray-500">{getCount()}</span>
              </div>
            ))}
          </div>
          </div>

        {/* Experience Level */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Experience Level</h3>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id={level.id}
                    checked={selectedExperienceRanges.includes(level.id)}
                    onCheckedChange={(checked) => handleExperienceChange(level.id, checked as boolean)}
                    className="border-[#F08504] data-[state=checked]:bg-[#F08504] data-[state=checked]:border-[#F08504] data-[state=checked]:text-white"
                  />
                  <label htmlFor={level.id} className="text-sm text-gray-700 cursor-pointer">
                    {level.label}
                    </label>
                  </div>
                <span className="text-sm text-gray-500">{getCount()}</span>
              </div>
            ))}
          </div>
          </div>

        {/* Date Posted */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Date Posted</h3>
          <div className="space-y-2">
            {datePostedOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                    id={option.id}
                    checked={selectedDatePosted.includes(option.id)}
                    onCheckedChange={(checked) => handleDatePostedChange(option.id, checked as boolean)}
                    className="border-[#F08504] data-[state=checked]:bg-[#F08504] data-[state=checked]:border-[#F08504] data-[state=checked]:text-white"
                  />
                  <label htmlFor={option.id} className="text-sm text-gray-700 cursor-pointer">
                    {option.label}
                    </label>
                  </div>
                <span className="text-sm text-gray-500">{getCount()}</span>
              </div>
            ))}
          </div>
          </div>

        {/* Salary */}
          <div>
          <h3 className="text-base font-bold text-black mb-3">Salary</h3>
          <div className="space-y-4">
            <div className="px-1">
              <Slider
                range
                min={0}
                max={9999}
                step={100}
                value={tempSalaryRange}
                onChange={(value) => handleSalarySliderChange(Array.isArray(value) ? value : [value])}
                trackStyle={[
                  { backgroundColor: PRIMARY_COLOR, height: 6 },
                  { backgroundColor: PRIMARY_COLOR, height: 6 },
                ]}
                handleStyle={[
                  {
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 3,
                    width: 20,
                    height: 20,
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    marginTop: -7,
                  },
                  {
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 3,
                    width: 20,
                    height: 20,
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    marginTop: -7,
                  },
                ]}
                railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
                activeDotStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 2 }}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium text-black">
                Salary: ${tempSalaryRange[0].toLocaleString()} - ${tempSalaryRange[1].toLocaleString()}
              </span>
            <Button
                className="text-white text-sm rounded-lg px-5 py-1.5 font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: PRIMARY_COLOR }}
                onClick={handleApplySalary}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-base font-bold text-black mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "text-white"
                    : "text-gray-700"
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag)
                    ? PRIMARY_COLOR
                    : PRIMARY_COLOR_LIGHT,
                }}
              >
                {tag}
              </button>
                ))}
              </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterSidebar;
