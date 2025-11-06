"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../components/services/apiinterseptor";
import { useUser } from "../context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import { getReferredUsers, getReferredTransactions } from "../components/services/servicesapis";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CreatorStatsResponse {
  success: boolean;
  data: {
    totalAssessmentsTaken: number;
    totalEarnings: number;
    totalPaymentsReceived: number;
  };
}

interface CreatorAssessmentItem {
  userId: string;
  title: string;
  category?: string;
  takenAt?: string;
  status?: string;
}

export default function CreatorDashboardPage() {
  const router = useRouter();
  const { userCredentials } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssessmentsTaken: 0,
    totalEarnings: 0,
    totalPaymentsReceived: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const baseCoupon = `EJ${(userCredentials?.userId || '').slice(-6).toUpperCase()}`;
  const coupon5 = `${baseCoupon}5`;
  const coupon10 = `${baseCoupon}10`;
  const coupon15 = `${baseCoupon}15`;
  const [selectedDiscount, setSelectedDiscount] = useState<5 | 10 | 15>(5);
  const currentCoupon = selectedDiscount === 5 ? coupon5 : selectedDiscount === 10 ? coupon10 : coupon15;
  const inviteLink = `https://earlyjobs.ai/signup?ref=${userCredentials?.userId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userCredentials?.userId) return;
        setLoading(true);
        setError(null);

        const [transactionsRes, candidatesRes] = await Promise.all([
          getReferredTransactions({
            userId: userCredentials.userId,
            page: 1,
            limit: 100,
          }),
          getReferredUsers({
            userId: userCredentials.userId,
            role: 'candidate',
            page: 1,
            limit: 100,
          }),
        ]);

        // Candidates list - already filtered by backend
        try {
          if (candidatesRes?.success && candidatesRes?.data?.users) {
            setCandidates(candidatesRes.data.users.slice(0, 5));
          } else {
            setCandidates([]);
          }
        } catch (e) {
          // ignore candidates fetch errors here
          setCandidates([]);
        }

        
        // Transactions - already filtered by backend
        const allTransactions: any[] = transactionsRes?.data?.transactions || transactionsRes?.data || [];
        const txs = allTransactions;
        
        const totalPaymentsReceived = txs
          .filter((t) => (t.transactionStatus || '').toLowerCase() === 'success')
          .reduce((sum, t) => sum + (Number(t.transactionAmount || t.amount || 0) || 0), 0);
        const totalEarnings = totalPaymentsReceived; // adjust if different on backend

        setStats({
          totalAssessmentsTaken: txs.length,
          totalEarnings,
          totalPaymentsReceived,
        });

        setTransactions(txs);
      } catch (err) {
        setError("Failed to load creator dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userCredentials?.userId]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const generateAssessmentSlug = (title: string) => {
    if (!title) return "assessment";
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const getProfileUrl = (candidate: any) => {
    const nameSlug = generateSlug(candidate?.name || "candidate");
    const assessmentSlug = generateAssessmentSlug(candidate?.firstAssessmentTitle || "assessment");
    const candidateId = candidate?._id || candidate?.userId;
    return `/browse-interviewed-candidates/${nameSlug}-${assessmentSlug}/${candidateId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hi {(userCredentials?.name?.split?.(" ")[0]) || "Creator"} 👋, your dashboard
            </h2>
            <p className="text-lg text-gray-600">Overview of your assessments and earnings.</p>
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm">
              <span className="font-medium">Coupon:</span>
              <span className="font-semibold">{currentCoupon}</span>
              <button
                onClick={() => handleCopy(currentCoupon)}
                className="ml-1 text-orange-700 hover:text-orange-900"
                title="Copy coupon code"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
              <span className="mx-1 text-orange-300">|</span>
              <div className="flex items-center gap-1">
                <button
                  className={`px-2 py-0.5 rounded-full text-xs ${selectedDiscount === 5 ? 'bg-orange-600 text-white' : 'hover:bg-orange-100'}`}
                  onClick={() => setSelectedDiscount(5)}
                  title="Select 5%"
                >5%</button>
                <button
                  className={`px-2 py-0.5 rounded-full text-xs ${selectedDiscount === 10 ? 'bg-orange-600 text-white' : 'hover:bg-orange-100'}`}
                  onClick={() => setSelectedDiscount(10)}
                  title="Select 10%"
                >10%</button>
                <button
                  className={`px-2 py-0.5 rounded-full text-xs ${selectedDiscount === 15 ? 'bg-orange-600 text-white' : 'hover:bg-orange-100'}`}
                  onClick={() => setSelectedDiscount(15)}
                  title="Select 15%"
                >15%</button>
              </div>
            </div>
          
          </div> */}
        </div>

        <Card className="border-0  mb-8">
          <CardHeader>
            <CardTitle>Invite Students</CardTitle>
            <CardDescription>
              Share this link with potential students to invite them to sign up.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1 bg-white font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  toast.success('Link copied to clipboard!');
                }}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-3xl border-0 shadow-lg animate-pulse">
                <CardContent className="p-6 h-24" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-2xl p-4">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="rounded-3xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalAssessmentsTaken}</p>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalEarnings.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600">Total Payments Received</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalPaymentsReceived.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            
          </>
        )}
        <div className="mt-8">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>People & Payments</CardTitle>
              <CardDescription>Browse candidates and view your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="candidates" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-50 rounded-2xl">
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="candidates" className="mt-4 space-y-3">
                  {candidates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-white to-orange-50">
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <span className="text-3xl">👥</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">No candidates yet</h4>
                      <p className="text-gray-600 max-w-md">Invite students to take assessments and you'll see their profiles here.</p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(inviteLink);
                            toast.success('Invite link copied');
                          }}
                          className="rounded-2xl"
                        >
                          <Copy className="h-4 w-4 mr-2" /> Copy invite link
                        </Button>
                      </div>
                    </div>
                  ) : (
                    candidates.map((c) => {
                      const initials = (c?.name || 'NA')
                        .split(' ')
                        .map((w: string) => w.charAt(0))
                        .join('')
                        .toUpperCase()
                        .slice(0, 2);
                      const profileUrl = getProfileUrl(c);
                      return (
                        <div key={c?._id} className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                              {c?.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
                              ) : (
                                initials
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{c?.name || 'Unnamed Candidate'}</p>
                              <p className="text-sm text-gray-600">{(c?.role || '').toString().replace(/^./, (ch: string) => ch.toUpperCase())}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="h-8 px-2 text-gray-600 hover:text-gray-900"
                            onClick={() => router.push(profileUrl)}
                            title="View candidate profile"
                          >
                            <Copy className="h-4 w-4 mr-1" /> View
                          </Button>
                        </div>
                      );
                    })
                  )}
                </TabsContent>
                <TabsContent value="transactions" className="mt-4 space-y-3">
                  {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-white to-orange-50">
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                        <span className="text-3xl">💳</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">No transactions yet</h4>
                      <p className="text-gray-600 max-w-md">Once students purchase assessments through your links, transactions will appear here.</p>
                      <div className="mt-4">
                        <Button
                          onClick={() => window.location.reload()}
                          className="rounded-2xl bg-orange-600 hover:bg-orange-700"
                        >
                          Refresh
                        </Button>
                      </div>
                    </div>
                  ) : (
                    transactions.slice(0, 10).map((t) => (
                      <div key={t?.userId || `${t.transactionId}-${t.createdAt}`} className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">₹{Number(t.transactionAmount || t.amount || 0).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{new Date(t.createdAt || t.date || Date.now()).toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${String(t.transactionStatus || '').toLowerCase() === 'success' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {(t.transactionStatus || t.status || 'Unknown').toString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}


