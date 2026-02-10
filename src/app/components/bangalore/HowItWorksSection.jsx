import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { UserPlus, FileText, Users, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Sign Up",
      description: "Register through our Bangalore franchise portal with your details and preferences.",
      color: "blue"
    },
    {
      icon: FileText,
      step: "02", 
      title: "Submit Profile",
      description: "Upload your resume or post your job requirements with detailed specifications.",
      color: "green"
    },
    {
      icon: Users,
      step: "03",
      title: "Get Matched",
      description: "Our AI matches you with the best opportunities, followed by interviews and placements.",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Localized 3-Step Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures quick and effective connections between talent and opportunities in Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <Card className={`w-full bg-white border border-orange-200 shadow-md hover:shadow-lg transition-shadow duration-300 ${step.color === 'blue' ? 'hover:bg-blue-50' : step.color === 'green' ? 'hover:bg-green-50' : 'hover:bg-purple-50'}`}>
                <CardHeader className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${step.color === 'blue' ? 'bg-blue-100' : step.color === 'green' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    <step.icon className={`w-6 h-6 ${step.color === 'blue' ? 'text-blue-600' : step.color === 'green' ? 'text-green-600' : 'text-purple-600'}`} />
                  </div>
                  <div className={`text-sm font-semibold ${step.color === 'blue' ? 'text-blue-600' : step.color === 'green' ? 'text-green-600' : 'text-purple-600'} mb-2`}>
                    Step {step.step}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </CardContent>
              </Card>
              
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;