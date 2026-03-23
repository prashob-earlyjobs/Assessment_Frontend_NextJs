import { Suspense } from "react";
import TrackApplicationClient from "../../components/pages/TrackApplicationClient";

export default function TrackApplicationPage() {
  return (
    <Suspense fallback={null}>
      <TrackApplicationClient />
    </Suspense>
  );
}

