import type { Metadata } from "next";
import HuntloApp from "../../../EJhunter/src/App";
import Footer from "../components/pages/footer";

export const metadata: Metadata = {
  title: "Huntlo — AI Hiring That Gets Replies",
  description:
    "Huntlo finds, reaches, and engages the right candidates automatically, so you get responses and move to interviews faster.",
};

export default function HuntloPage() {
  return (
    <>
      <HuntloApp />
      <Footer />
    </>
  );
}

