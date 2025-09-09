import { Badge } from "../../components/ui/badge";
import {
  Users,
  Briefcase,
  Laptop,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle,
  Star,
  Building2,
} from "lucide-react";
import { Card } from "../ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-orange-500 text-orange-500"
          >
            About EarlyJobs Mohali
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered,{" "}
            <span className="text-orange-500">Human-Backed</span> Recruitment
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            EarlyJobs is an innovative recruitment platform that supports the
            industrial and educational strengths of Mohali, including IT,
            biotech, and manufacturing sectors. Our local franchise provides
            personalized support and deep understanding of the regional job
            market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: "Local Expertise",
              desc: "Deep understanding of Mohali's business ecosystem",
            },
            {
              icon: Users,
              title: "Community Focus",
              desc: "Supporting local talent and businesses",
            },
            {
              icon: CheckCircle,
              title: "Proven Results",
              desc: "500+ successful placements this year",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <item.icon className="w-10 h-10 text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;