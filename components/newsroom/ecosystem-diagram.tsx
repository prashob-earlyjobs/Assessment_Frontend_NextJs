import { NewsroomVisual } from "@/components/newsroom/visual";

export function NewsroomEcosystemDiagram() {
  return (
    <NewsroomVisual
      src="/newsroom/talent-network.jpg"
      alt="EarlyJobs talent network connecting employers, recruiters, partners, and job seekers"
      priority
      aspect="square"
      className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
    />
  );
}
