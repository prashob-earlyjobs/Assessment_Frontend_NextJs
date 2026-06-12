import { notFound } from "next/navigation";
import { fetchHrRecruiterWebinarData } from "../components/services/hrRecruiterWebinarApi";
import HrRecruiterInternWebinarClient from "./HrRecruiterInternWebinarClient";

export default async function HrRecruiterInternWebinarPage() {
  const data = await fetchHrRecruiterWebinarData();

  if (!data) {
    notFound();
  }

  return <HrRecruiterInternWebinarClient data={data} />;
}
