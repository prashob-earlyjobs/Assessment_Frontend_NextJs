"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* New to GetWork Section */}
      {/* <Card className="p-6 text-center">
        <h3 className="font-semibold text-lg mb-2">New to EarlyJobs.ai?</h3>
        <Button className="w-full mb-4 bg-earlyjobs-navy hover:bg-earlyjobs-navy/90">
          Upload Resume
        </Button>
        <p className="text-sm text-gray-600">Connect with Hiring Experts</p>
      </Card> */}
      <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
              <div className="text-center">
                <h3 className="font-semibold text-earlyjobs-text mb-3">
                  Want to prove your skills?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Take our EarlyJobs Assessments and boost your chances of getting hired!
                </p>
                <Button 
                  className="bg-white hover:bg-gray-50 font-medium px-6 py-2 border-2 border-earlyjobs-orange"
                  style={{ color: '#ff6b35' }}
                  onClick={() => router.push('/assessments')}
                >
                  Get Assessments
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm mt-6">
              <div className="text-center">
                <h3 className="font-semibold text-earlyjobs-text mb-3">
                  New to EarlyJobs.ai?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Use our AI Resume Builder to create a professional resume and increase your chances of landing your dream job!
                </p>
                <Button 
                  className="bg-white hover:bg-gray-50 font-medium px-6 py-2 border-2 border-earlyjobs-orange"
                  style={{ color: '#ff6b35' }}
                  onClick={() => router.push('/airesume')}
                >
                  Create AI Resume
                </Button>
              </div>
            </div>

      {/* Launch Your Career Section */}
      <Card className="p-6 text-center">
        <h3 className="font-semibold text-lg mb-2">Launch Your Career</h3>
        <p className="text-sm text-gray-600 mb-4">
          with EarlyJobs.ai OneApp<br />
          Search, find, apply and track for the<br />
          latest job on the go!
        </p>
        
        {/* Mobile App Illustration */}
        <div className="mb-4">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <div className="text-4xl">📱</div>
          </div>
        </div>
        
        <Input 
          placeholder="Email ID or Phone Number" 
          className="mb-3"
        />
        
        <Button className="w-full mb-4 bg-earlyjobs-navy hover:bg-earlyjobs-navy/90">
          Share App Link
        </Button>
        
        {/* QR Code Section */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <QrCode className="w-16 h-16" />
          </div>
          <p className="text-xs text-gray-600">
            Scan QR<br />
            Available on<br />
            both iOS &<br />
            Android
          </p>
        </div>
      </Card>

      {/* Related Search Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Related Search</h3>
        <div className="space-y-2 text-sm">
          <div className="text-blue-600 hover:underline cursor-pointer">
            Software Engineering Jobs In Ahmedabad
          </div>
          <div className="text-blue-600 hover:underline cursor-pointer">
            Software Engineering Jobs In Mohali
          </div>
          <div className="text-blue-600 hover:underline cursor-pointer">
            Software Engineering Jobs In Sonipat
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
