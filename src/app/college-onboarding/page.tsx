"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  officialAddress: z.string().min(5, "Address must be at least 5 characters"),
  cityState: z.string().min(2, "City & State is required"),
  repName: z.string().min(2, "Representative name is required"),
  repDesignation: z.string().min(2, "Designation is required"),
  repEmail: z.string().email("Invalid email address"),
  repPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  spocName: z.string().min(2, "SPOC name is required"),
  spocRole: z.string().min(2, "Role/Designation is required"),
  spocEmail: z.string().email("Invalid email address"),
  spocPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  studentCount: z.string().min(1, "Number of students is required"),
  preferredMode: z.enum(["online", "offline", "hybrid"]),
  infrastructure: z.array(z.string()).optional(),
  otherInfrastructure: z.string().optional(),
});

const infrastructureOptions = [
  { label: "Seminar Hall", value: "Seminar Hall" },
  { label: "Computer Lab", value: "Computer Lab" },
  { label: "Projector/AV Setup", value: "Projector/AV Setup" },
];

const CollegeOnboarding = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeName: "",
      officialAddress: "",
      cityState: "",
      repName: "",
      repDesignation: "",
      repEmail: "",
      repPhone: "",
      spocName: "",
      spocRole: "",
      spocEmail: "",
      spocPhone: "",
      studentCount: "",
      preferredMode: "online",
      infrastructure: [],
      otherInfrastructure: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      // Prepare data for SheetDB (wrap in 'data' key as per SheetDB API)
      const response = await fetch("https://sheetdb.io/api/v1/4hrb2ntfsdxyp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-full mx-auto">
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <span className="text-4xl">🎓</span>
              EarlyJobs – College Partnership Form
            </CardTitle>
            <CardDescription className="text-orange-100 text-lg">
              Thank you for choosing to partner with EarlyJobs to boost placements and career readiness at your institution.<br/>
              Please help us with a few details so we can set up everything smoothly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-2xl font-bold text-green-600 mb-2">Thank you!</div>
                <div className="text-lg text-gray-600">Your form has been submitted successfully. Our team will connect with your placement cell soon.</div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Institution Information */}
                  <div className="space-y-6">
                    <h2 className="font-bold text-xl text-orange-700 flex items-center gap-3">
                      <span className="text-2xl">🏫</span>
                      Institution Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField 
                        name="collegeName" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">College/University Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="Enter your institution name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="cityState" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">City & State</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="e.g., Mumbai, Maharashtra"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                    <FormField 
                      name="officialAddress" 
                      control={form.control} 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Official Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="h-24 border-orange-200 focus:border-orange-400 focus:ring-orange-400 resize-vertical"
                              placeholder="Enter complete official address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  </div>

                  {/* Authorized Representative */}
                  <div className="space-y-6">
                    <h2 className="font-bold text-xl text-orange-700 flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      Authorized Representative
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField 
                        name="repName" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="Enter representative's name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="repDesignation" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Designation</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="e.g., Placement Officer"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="repEmail" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="representative@college.edu"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="repPhone" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="+91 9876543210"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                  </div>

                  {/* Placement Cell Contact (SPOC) */}
                  <div className="space-y-6">
                    <h2 className="font-bold text-xl text-orange-700 flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      Placement Cell Contact (SPOC)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField 
                        name="spocName" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="Enter SPOC's name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="spocRole" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Role/Designation</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="e.g., Training & Placement Coordinator"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="spocEmail" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="spoc@college.edu"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="spocPhone" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="+91 9876543210"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                  </div>

                  {/* Student & Placement Readiness */}
                  <div className="space-y-6">
                    <h2 className="font-bold text-xl text-orange-700 flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      Student & Placement Readiness
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField 
                        name="studentCount" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Approx. Number of Eligible Students this year</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 text-lg"
                                placeholder="e.g., 450"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      <FormField 
                        name="preferredMode" 
                        control={form.control} 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">Preferred Mode for Sessions</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex gap-8 p-4 bg-orange-50 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="online" id="mode-online" className="border-orange-400" />
                                  <FormLabel htmlFor="mode-online" className="text-lg font-medium text-gray-700 cursor-pointer">Online</FormLabel>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="offline" id="mode-offline" className="border-orange-400" />
                                  <FormLabel htmlFor="mode-offline" className="text-lg font-medium text-gray-700 cursor-pointer">Offline</FormLabel>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="hybrid" id="mode-hybrid" className="border-orange-400" />
                                  <FormLabel htmlFor="mode-hybrid" className="text-lg font-medium text-gray-700 cursor-pointer">Hybrid</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                    <FormField 
                      name="infrastructure" 
                      control={form.control} 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Infrastructure Available (tick all that apply)</FormLabel>
                          <FormControl>
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg">
                              {infrastructureOptions.map(opt => (
                                <label key={opt.value} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-orange-100 hover:border-orange-200 cursor-pointer">
                                  <Checkbox
                                    checked={field.value?.includes(opt.value) || false}
                                    onCheckedChange={checked => {
                                      if (checked) field.onChange([...(field.value || []), opt.value]);
                                      else field.onChange((field.value || []).filter((v: string) => v !== opt.value));
                                    }}
                                    className="border-orange-400 data-[state=checked]:bg-orange-500"
                                  />
                                  <span className="text-gray-700 font-medium">{opt.label}</span>
                                </label>
                              ))}
                              <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-100 hover:border-orange-200 cursor-pointer col-span-2">
                                <Checkbox
                                  checked={!!form.watch("otherInfrastructure")}
                                  onCheckedChange={checked => {
                                    if (!checked) form.setValue("otherInfrastructure", "");
                                  }}
                                  className="border-orange-400 data-[state=checked]:bg-orange-500 mt-0.5"
                                />
                                <div className="flex-1">
                                  <span className="text-gray-700 font-medium block mb-1">Other Infrastructure:</span>
                                  <Input
                                    value={form.watch("otherInfrastructure") || ""}
                                    onChange={e => form.setValue("otherInfrastructure", e.target.value)}
                                    placeholder="Please specify any other available infrastructure"
                                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                  />
                                </div>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  </div>

             

                  <div className="pt-4 flex justify-center">
                    <Button type="submit" size="sm" className="mx-auto  bg-orange-500 text-white">Submit</Button>
                  </div>
                  
                  <div className="text-center pt-4">
                    <div className="text-sm text-gray-500 bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">📌</span>
                        Once you fill this form, our team will connect with your placement cell to plan the next steps.
                      </span>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeOnboarding;