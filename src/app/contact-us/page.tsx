"use client";

import React, { useState } from "react";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHT } from "../../constants/theme";
import HeaderV2 from "../components/v2/headerBlack/header.v2";

const ContactUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTitleInNavbar, setShowTitleInNavbar] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavbarV2 pageTitle="Contact Us" showPageTitle={showTitleInNavbar} />

      {/* Hero */}
      <HeaderV2 title="Contact Us" onScrollStateChange={(isScrolled) => setShowTitleInNavbar(isScrolled)} />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12 md:mb-16">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
              You Will Grow, You Will Succeed. We Promise That
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 md:mb-12">
              Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt ultrices. Diam convallis morbi pellentesque adipiscing
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Call for inquiry */}
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" style={{ color: PRIMARY_COLOR }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Call for inquiry</div>
                  <a
                    href="tel:+918217527926"
                    className="text-base md:text-lg font-normal text-black hover:opacity-80 transition-opacity"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    +91 8217527926
                  </a>
                </div>
              </div>

              {/* Send us email */}
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: PRIMARY_COLOR }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Send us email</div>
                  <a
                    href="mailto:info@earlyjobs.in"
                    className="text-base md:text-lg font-normal text-black hover:opacity-80 transition-opacity break-all"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    info@earlyjobs.in
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                >
                  <Clock className="w-5 h-5 md:w-6 md:h-6" style={{ color: PRIMARY_COLOR }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Opening hours</div>
                  <div className="text-base md:text-lg font-normal text-black">
                    Mon - Fri: 10AM - 10PM
                  </div>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                >
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" style={{ color: PRIMARY_COLOR }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Office</div>
                  <div className="text-base md:text-lg font-normal text-black leading-relaxed">
                    EarlyJobs, 53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div 
            className="rounded-xl md:rounded-2xl border-1 shadow-sm p-6 md:p-8"
            style={{ 
              borderColor: PRIMARY_COLOR,
              backgroundColor: 'rgba(240, 133, 4, 0.1)'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">Contact Info</h3>
            <p className="text-gray-600 mb-6 md:mb-8">
              Nibh dis faucibus proin lacus tristique
            </p>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                // TODO: wire to backend/email service
                await new Promise((r) => setTimeout(r, 600));
                setIsSubmitting(false);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-black">First Name</Label>
                  <Input id="firstName" placeholder="Your name" className="bg-white text-black placeholder:text-gray-500" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-black">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" className="bg-white text-black placeholder:text-gray-500" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Email Address</Label>
                <Input id="email" type="email" placeholder="Your E-mail address" className="bg-white text-black placeholder:text-gray-500" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-black">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  className="min-h-[140px] bg-white text-black placeholder:text-gray-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="text-white font-semibold rounded-lg px-6 py-2"
                style={{ backgroundColor: PRIMARY_COLOR }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 md:mt-16 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50 aspect-[16/9] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </main>

      {/* Company Logos Section */}
      <section className="bg-white border-t border-gray-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <div className="text-gray-400 text-xl md:text-2xl font-semibold opacity-60">Zoom</div>
            <div className="text-gray-400 text-xl md:text-2xl font-semibold opacity-60">Tinder</div>
            <div className="text-gray-400 text-xl md:text-2xl font-semibold opacity-60">Dribbble</div>
            <div className="text-gray-400 text-xl md:text-2xl font-semibold opacity-60">Asana</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;