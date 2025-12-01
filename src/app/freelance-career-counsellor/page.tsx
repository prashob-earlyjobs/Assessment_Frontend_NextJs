"use client";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle2, Users, TrendingUp, Award, Briefcase, Clock } from "lucide-react";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";


const Index = () => {
  const handleApplyClick = () => {
    window.location.href = "mailto:partnerships@earlyjobs.ai?subject=Career Counsellor Application";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {/* <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <img  src="/images/logo.png"  alt="EarlyJobs" className="h-10" />
        </div>
      </nav> */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero bg-[var(--earlyjobs-orange)]/4">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="max-w-2xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground text-[var(--earlyjobs-text)]/80">
                Become an <span className="text-[var(--earlyjobs-orange)]">EarlyJobs</span>
                <span className="block text-primary">
                  Certified Career Counsellor
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Help students become job-ready through AI-driven insights and structured mentorship —
                whether you already work with colleges or are just starting your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[var(--earlyjobs-orange)] hover:bg-[var(--earlyjobs-orange)]/90 text-lg px-8 py-6 shadow-strong transition-all hover:scale-105 text-white"
                  onClick={handleApplyClick}
                >
                  Apply to Join the Network
                </Button>
                <p className="text-sm text-muted-foreground self-center">
                  No fees. Limited onboarding slots.
                </p>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src="/images/freelanceCareerhero.png" 
                  alt="Career counsellors mentoring students" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              India doesn't need more degrees — it needs clarity.
            </h2>
            <p className="text-xl text-[var(--earlyjobs-text)]/60 leading-relaxed">
              Every year, millions of graduates enter the job market unsure of their real readiness.
              Colleges try. Recruiters want proof. Students remain uncertain.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: TrendingUp, title: "AI-based job readiness assessments" },
                { icon: Users, title: "Mock interview analytics" },
                { icon: Award, title: "A national network of trained counsellors" }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center shadow-soft hover:shadow-medium transition-all">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium text-card-foreground">{item.title}</p>
                </Card>
              ))}
            </div>
            <p className="text-xl text-foreground leading-relaxed pt-8">
              So students gain confidence, colleges gain visibility, and counsellors lead transformation where it matters — on the ground.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-20 md:py-32 bg-secondary/30 bg-[var(--earlyjobs-text)]/4">
        <div className="container mx-auto px-4 ">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Built for counsellors at every stage.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
              <h3 className="text-2xl font-bold mb-6 text-primary">If you're experienced:</h3>
              <ul className="space-y-4">
                {[
                  "Already work with colleges",
                  "Want to offer measurable outcomes",
                  "Prefer partnership over selling",
                  "Looking to expand without extra workload"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
              <h3 className="text-2xl font-bold mb-6 text-[var(--earlyjobs-orange)]">If you're starting out:</h3>
              <ul className="space-y-4">
                {[
                  "Passion for guiding students",
                  "Need structure, tools, and credibility",
                  "No college network required",
                  "Want a clear path to grow"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[var(--earlyjobs-orange)] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <p className="text-center text-xl text-[var(--earlyjobs-text)]/60 mt-12 italic">
            The model adapts to your background — not the other way around.
          </p>
        </div>
      </section>

      {/* What You Will Do Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Your role as an <span className="text-[var(--earlyjobs-orange)]">EarlyJobs</span> Career Counsellor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, text: "Conduct student awareness sessions" },
              { icon: TrendingUp, text: "Support AI readiness assessments" },
              { icon: Briefcase, text: "Collaborate with placement cells" },
              { icon: Award, text: "Build verified student talent pools" },
              { icon: Users, text: "Help identify campus ambassadors" }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 shadow-soft hover:shadow-medium transition-all">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <p className="text-lg text-card-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-[var(--earlyjobs-text)]/60 inline-flex items-center gap-2">
              <Clock className="w-5 h-5" />
              You choose your pace — field, online, or both.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 md:py-32 bg-gradient-hero bg-[var(--earlyjobs-orange)]/4">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            You focus on engagement. We power everything else.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[
              "Official EarlyJobs certification",
              "Ready-to-use workshop content & scripts",
              "Dashboard and reporting access",
              "Student engagement and activation toolkit",
              "Dedicated regional support",
              "No fees. No exclusivity. No hidden commitments."
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 shadow-medium hover:shadow-strong transition-all">
                <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
                <p className="text-lg text-card-foreground font-medium">{benefit}</p>
              </Card>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-[var(--earlyjobs-text)]/2  shadow-medium">
              <p className="text-lg font-semibold text-foreground">For experienced counsellors:</p>
              <p className="text-muted-foreground mt-2">Add AI-driven outcomes to existing college relationships.</p>
            </Card>
            <Card className="p-6 bg-[var(--earlyjobs-orange)]/10 shadow-medium">
              <p className="text-lg font-semibold text-foreground">For new counsellors:</p>
              <p className="text-muted-foreground mt-2">Start confidently with structured guidance.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Earning & Growth Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--earlyjobs-text)]/90">
            A performance-based model designed for sustainability.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
              <h3 className="text-3xl font-bold text-primary mb-4">30%</h3>
              <p className="text-lg text-[var(--earlyjobs-text)]/60">of every paid assessment completed is credited to you</p>
            </Card>
            <Card className="p-8 shadow-medium hover:shadow-strong transition-all">
              <h3 className="text-3xl font-bold text-[var(--earlyjobs-orange)] mb-4">₹3,000–₹5,000</h3>
              <p className="text-lg text-[var(--earlyjobs-text)]/60">per college onboarding</p>
            </Card>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 shadow-soft">
              <p className="text-lg text-[var(--earlyjobs-text)]/60">✓ Recurring student activation potential</p>
            </Card>
            <Card className="p-6 shadow-soft">
              <p className="text-lg text-[var(--earlyjobs-text)]/60">✓ Flexible hours — work alongside your current commitments</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Simple onboarding. Clear steps.
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { step: "1", text: "Submit application" },
              { step: "2", text: "Attend a short orientation" },
              { step: "3", text: "Receive toolkit & certification" },
              { step: "4", text: "Activate your first college or student group" },
              { step: "5", text: "Start earning through assessments & engagements" }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 shadow-medium hover:shadow-strong transition-all hover:translate-x-2">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--earlyjobs-text)]/60 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <p className="text-xl text-card-foreground font-medium">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-xl text-muted-foreground mt-12">
            Average activation timeline: <span className="font-bold text-foreground">7–14 days</span>
          </p>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to explore this opportunity?
            </h2>
            <p className="text-xl leading-relaxed">
              We are curating limited counsellors across regions to maintain quality and support.
            </p>
            <p className="text-2xl font-semibold">
              No fees. No obligation.<br />
              Just a conversation to understand alignment.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 shadow-strong hover:scale-105 transition-all"
              onClick={handleApplyClick}
            >
              Apply Now — Takes 2 Minutes
            </Button>
            <p className="text-sm opacity-90">
              You will receive a confirmation within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
