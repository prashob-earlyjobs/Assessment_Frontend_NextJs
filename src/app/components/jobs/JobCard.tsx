"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bookmark, Clock, Briefcase, IndianRupee, Calendar, MapPin } from "lucide-react";

interface JobCardProps {
  company: string;
  logo: string;
  title: string;
  jobType: string;
  min_salary: string;
  max_salary: string;
  salary_mode: string;
  min_experience: string;
  max_experience: string;
  location: string;
  skills?: string[];
  postedTime: string;
  onJobClick?: () => void;
}

const JobCard = ({
  company,
  logo,
  title,
  jobType,
  min_salary,
  max_salary,
  salary_mode,
  min_experience,
  max_experience,
  location,
  skills,
  postedTime,
  onJobClick,
}: JobCardProps) => {
  const hasMinExp = min_experience && min_experience !== "_";
  const hasMaxExp = max_experience && max_experience !== "_";
  const experienceDisplay =
    hasMinExp && hasMaxExp
      ? `${min_experience} - ${max_experience} Yrs`
      : hasMinExp
      ? `${min_experience} Yrs`
      : hasMaxExp
      ? `${max_experience} Yrs`
      : null;

  const formatRelativeTime = (dateString: string): string => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffInMs = now.getTime() - postedDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    } else if (diffInWeeks > 0) {
      return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    } else if (diffInDays > 0) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  const parseNumber = (value?: string | number | null): number | null => {
    if (value === null || value === undefined) {
      console.log("Value is null or undefined");
      return null;
    }

    if (typeof value === "number") {
      console.log("Value is already a number:", value);
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") {
      console.log("Value is not a string or number:", value);
      return null;
    }

    if (value.trim() === "") {
      console.log("Value is empty string");
      return null;
    }

    // Try to parse the string directly
    const num = parseFloat(value);

    return Number.isFinite(num) ? num : null;
  };

  const toLPA = (amount: number, mode?: string): number => {
    const yearly = mode?.toLowerCase() === "monthly" ? amount * 12 : amount;

    return yearly / 100000; // convert to lakhs per annum
  };

  const minParsed = parseNumber(min_salary);
  const maxParsed = parseNumber(max_salary);

  const minLpa = minParsed != null ? toLPA(minParsed, salary_mode) : null;
  const maxLpa = maxParsed != null ? toLPA(maxParsed, salary_mode) : null;

  const formatLpa = (v: number) => {
    const fixed = v >= 10 ? v.toFixed(0) : v.toFixed(1);
    return `${fixed}`;
  };

  const salaryDisplay =
    minLpa != null && maxLpa != null
      ? `${formatLpa(minLpa)} - ${formatLpa(maxLpa)}`
      : minLpa != null
      ? `${formatLpa(minLpa)}`
      : maxLpa != null
      ? `${formatLpa(maxLpa)}`
      : null;

  return (
    <Card
      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onJobClick}
    >
      <div className="flex gap-4">
        <img
          src={logo}
          alt={`${company} logo`}
          className="w-12 h-12 rounded object-contain bg-gray-50 p-1"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg text-earlyjobs-text hover:text-earlyjobs-orange transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{company}</p>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 mb-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {jobType}
            </span>
            {salaryDisplay && (
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {salaryDisplay} LPA
              </span>
            )}
            {experienceDisplay && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {experienceDisplay}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          </div>

          {skills && skills.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-earlyjobs-light-orange text-earlyjobs-orange border-earlyjobs-orange/20"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-600"
                >
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Posted {formatRelativeTime(postedTime)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
