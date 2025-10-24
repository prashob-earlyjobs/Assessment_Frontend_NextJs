"use client";

import { Card } from "./card";

interface ShimmerProps {
  className?: string;
}

export const Shimmer = ({ className = "" }: ShimmerProps) => {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`} />
  );
};

export const JobCardShimmer = () => {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        {/* Top Box: Logo, Title, Company */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Company Logo Shimmer */}
            <Shimmer className="w-12 h-12 rounded" />
            
            <div className="flex-1">
              {/* Job Title Shimmer */}
              <Shimmer className="h-6 w-3/4 mb-2 rounded" />
              {/* Company Name Shimmer */}
              <Shimmer className="h-4 w-1/2 rounded" />
            </div>
          </div>
          
          {/* Bookmark Button Shimmer */}
          <Shimmer className="w-8 h-8 rounded" />
        </div>

        {/* Bottom Box: Job Details */}
        <div className="flex flex-col gap-3">
          {/* Job Details Row */}
          <div className="flex flex-wrap gap-4">
            <Shimmer className="h-4 w-20 rounded" />
            <Shimmer className="h-4 w-16 rounded" />
            <Shimmer className="h-4 w-24 rounded" />
            <Shimmer className="h-4 w-18 rounded" />
            <Shimmer className="h-4 w-28 rounded" />
          </div>

          {/* Skills Shimmer */}
          <div className="flex gap-2">
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-20 rounded-full" />
            <Shimmer className="h-6 w-14 rounded-full" />
          </div>

          {/* Posted Time Shimmer */}
          <Shimmer className="h-4 w-32 rounded" />
        </div>
      </div>
    </Card>
  );
};

export const JobCardsShimmer = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardShimmer key={index} />
      ))}
    </div>
  );
};
