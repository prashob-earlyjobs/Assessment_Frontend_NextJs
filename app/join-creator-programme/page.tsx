import type { Metadata } from "next";
import { JoinCreatorProgramme } from "@/components/join-creator-programme/page";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/join-creator-programme",
  title: "Join EarlyJobs Creator Programme | Earn & Create Impact",
  description:
    "Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.",
  ogTitle: "Join EarlyJobs Creator Programme | Earn & Create Impact",
  ogDescription:
    "Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.",
  image: "/assets/creator_programme.jpg",
  imageAlt: "Join Creator Programme | EarlyJobs",
  twitterTitle: "Join EarlyJobs Creator Programme | Earn & Create Impact",
  twitterDescription:
    "Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.",
});

export default function Page() {
  return <JoinCreatorProgramme />;
}
