"use client";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Bookmark, Clock, Briefcase, IndianRupee, Calendar, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import { EARLYJOBS_ORANGE, EARLYJOBS_LIGHT_ORANGE, TEXT_PRIMARY, BORDER_COLOR } from "../../../../constants/theme";

interface JobCardProps {
  company: string;
  brandName?: string;
  logo: string;
  title: string;
  employmentType: string;
  workType?: string;
  min_salary?: string | number;
  max_salary?: string | number;
  salary_mode?: string;
  min_experience?: string;
  max_experience?: string;
  location: string;
  skills?: string[];
  postedTime: string;
  onJobClick?: () => void;
}

const JobCard = ({
  company,
  brandName,
  logo,
  title,
  employmentType,
  workType,
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
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Normalize employmentType and workType for display
  const normalizeEmploymentType = (type: string): string => {
    switch (type.toLowerCase()) {
      case "full-time":
      case "permanent employment (full-time)":
        return "Full Time";
      case "part-time":
        return "Part Time";
      case "internship":
        return "Internship";
      case "contract":
        return "Contract";
      case "freelance":
        return "Freelance";
      default:
        return type;
    }
  };

  const normalizeWorkType = (type?: string): string => {
    if (!type) return "Not Specified";
    switch (type.toLowerCase()) {
      case "on-site":
        return "On-site";
      case "remote":
        return "Remote";
      case "hybrid":
        return "Hybrid";
      default:
        return type;
    }
  };

  // Experience display logic
  const experienceDisplay =
  min_experience != null && max_experience != null
    ? `${min_experience} - ${max_experience} Yrs`
    : min_experience != null
    ? `${min_experience} Yrs`
    : max_experience != null
    ? `${max_experience} Yrs`
    : null;

  // Salary display logic
  const parseNumber = (value?: string | number): number | null => {
    if (value === undefined || value === null) return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value !== "string" || value.trim() === "") return null;
    const num = parseFloat(value);
    return Number.isFinite(num) ? num : null;
  };

  const toLPA = (amount: number, mode?: string): number => {
    const yearly = mode?.toLowerCase() === "monthly" ? amount * 12 : amount;
    return yearly / 100000;
  };

  const formatLpa = (value: number): string => {
    return value >= 10 ? value.toFixed(0) : value.toFixed(1);
  };

  const minParsed = parseNumber(min_salary);
  const maxParsed = parseNumber(max_salary);

  const minLpa = minParsed != null ? toLPA(minParsed, salary_mode) : null;
  const maxLpa = maxParsed != null ? toLPA(maxParsed, salary_mode) : null;

  const salaryDisplay =
    minLpa != null && maxLpa != null
      ? `${formatLpa(minLpa)} - ${formatLpa(maxLpa)} LPA`
      : minLpa != null
      ? `${formatLpa(minLpa)} LPA`
      : maxLpa != null
      ? `${formatLpa(maxLpa)} LPA`
      : null;

  // Format posted time
  const formatRelativeTime = (dateString: string): string => {
    try {
      const now = new Date();
      const postedDate = new Date(dateString);
      if (isNaN(postedDate.getTime())) return "Not Disclosed";

      const diffInMs = now.getTime() - postedDate.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);

      if (diffInMonths > 0) {
        return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;
      } else if (diffInWeeks > 0) {
        return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;
      } else if (diffInDays > 0) {
        return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
      } else if (diffInHours > 0) {
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
      } else if (diffInMinutes > 0) {
        return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
      } else {
        return "Just now";
      }
    } catch {
      return "Not Disclosed";
    }
  };

  // Handle bookmark toggle
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card
      className="p-6 shadow-none hover:shadow-sm transition-shadow cursor-pointer border-[0.5px]"
      style={{ borderColor: `${BORDER_COLOR}80` }}
      onClick={onJobClick}
      role="article"
      aria-label={`Job listing for ${title} at ${brandName }`}
    >
      <div className="flex flex-col gap-4">
        {/* Posted Time Pill */}
        <div>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {formatRelativeTime(postedTime)}
          </span>
        </div>

        {/* Top Box: Logo, Title, Company, and Bookmark */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
    
            <img
              src={logo || "/images/company_placeholder.png"}
              alt={`${brandName } logo`}
              className="w-12 h-12 rounded object-contain bg-gray-50 p-1"
              onError={(e) => (e.currentTarget.src = "/images/logo.png")}
            />
            <div className="flex-1">
              <h3 
                className="font-semibold text-lg transition-colors mb-1"
                style={{ color: TEXT_PRIMARY }}
                onMouseEnter={(e) => e.currentTarget.style.color = EARLYJOBS_ORANGE}
                onMouseLeave={(e) => e.currentTarget.style.color = TEXT_PRIMARY}
              >
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{brandName }</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark job"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Bottom Box: Job Details */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" style={{ color: EARLYJOBS_ORANGE }} />
              {normalizeEmploymentType(employmentType)}
            </span>
            {workType && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" style={{ color: EARLYJOBS_ORANGE }} />
                {normalizeWorkType(workType)}
              </span>
            )}
            {salaryDisplay && (
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" style={{ color: EARLYJOBS_ORANGE }} />
                {salaryDisplay}
              </span>
            )}
            {experienceDisplay && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" style={{ color: EARLYJOBS_ORANGE }} />
                {experienceDisplay}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: EARLYJOBS_ORANGE }} />
              {location}
            </span>
          </div>

          {skills && skills.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  style={{
                    backgroundColor: EARLYJOBS_LIGHT_ORANGE,
                    color: EARLYJOBS_ORANGE,
                    borderColor: `${EARLYJOBS_ORANGE}33`
                  }}
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;