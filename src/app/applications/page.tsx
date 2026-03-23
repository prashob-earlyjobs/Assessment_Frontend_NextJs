import { Suspense } from "react";
import ApplicationsV2Client from "../components/pages/ApplicationsV2Client";

export default function ApplicationsV2Page() {
  return (
    <Suspense fallback={null}>
      <ApplicationsV2Client />
    </Suspense>
  );
}

