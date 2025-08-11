import Link from "next/link";
import { Upload, Plus, FileText, Sparkles, Download, Zap } from "lucide-react";
import { ReactNode } from "react";
import Header from "./header";

// Define interfaces for component props
interface ButtonProps {
  children: ReactNode;
  className?: string;
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

// Define Button component
const Button: React.FC<ButtonProps> = ({ children, className }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
  >
    {children}
  </button>
);

// Define Card component
const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`rounded-lg bg-white shadow-md ${className}`}>
    {children}
  </div>
);

// Define CardHeader component
const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Define CardContent component
const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Define CardTitle component
const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

// Define CardDescription component
const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

export default function AiResumeDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-25 to-white">
      <Header />
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-40 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent whitespace-nowrap">
              AI Resume Builder
            </h1>
           
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 ">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Perfect Resume in
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Minutes
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Build professional resumes with AI assistance, beautiful templates,
            and instant PDF downloads. Get hired faster with our modern resume
            builder.
          </p>

          {/* Feature highlights */}
          <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Professional Templates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-green-500" />
              <span>Instant PDF Export</span>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Upload Existing Resume Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Upload Existing Resume
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Have a resume already? Upload it and we'll extract your
                information automatically using AI parsing.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    PDF Support
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    DOCX Support
                  </span>
                </div>
                <Link href="/builder?mode=upload" passHref>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Upload & Parse Resume
                    <Upload className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Create New Resume Card */}
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Create New Resume
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Start fresh with our guided builder. Get AI suggestions and
                choose from beautiful templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    AI Assistance
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Live Preview
                  </span>
                </div>
                <Link href="/resumeBuilder" passHref>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Building Resume
                    <Plus className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose EarlyJobs?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">
                Smart suggestions for professional summaries and job
                descriptions
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Beautiful Templates
              </h4>
              <p className="text-gray-600 text-sm">
                Choose from modern, ATS-friendly resume templates
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Instant Export
              </h4>
              <p className="text-gray-600 text-sm">
                Download your perfect resume as a high-quality PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}