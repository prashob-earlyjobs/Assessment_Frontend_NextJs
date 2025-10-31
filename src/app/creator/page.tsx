"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../components/services/apiinterseptor";
import { useUser } from "../context";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import { getAssessmentsByUserId, getTransactions } from "../components/services/servicesapis";
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
  _id: string;
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
  const [assessments, setAssessments] = useState<CreatorAssessmentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userCredentials?._id) return;
        setLoading(true);
        setError(null);

        const [assessmentsRes, transactionsRes] = await Promise.all([
          getAssessmentsByUserId(userCredentials._id),
          getTransactions(userCredentials._id),
        ]);

        const takenList: CreatorAssessmentItem[] = (assessmentsRes?.data || []).map((a: any) => ({
          _id: a._id,
          title: a.title,
          category: a.category,
          takenAt: a.createdAt,
          status: a.status,
        }));
        setAssessments(takenList);

        const txs: any[] = transactionsRes?.data?.transactions || [];
        const totalPaymentsReceived = txs
          .filter((t) => (t.transactionStatus || '').toLowerCase() === 'success')
          .reduce((sum, t) => sum + (Number(t.transactionAmount || t.amount || 0) || 0), 0);
        const totalEarnings = totalPaymentsReceived; // adjust if different on backend

        setStats({
          totalAssessmentsTaken: takenList.length,
          totalEarnings,
          totalPaymentsReceived,
        });
      } catch (err) {
        setError("Failed to load creator dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userCredentials?._id]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
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
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => handleCopy(typeof window !== 'undefined' ? window.location.href : '')}
            title="Copy dashboard link"
          >
            <Copy className="h-4 w-4 mr-2" /> Copy invitation link
          </Button>
        </div>

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
                  <p className="text-sm text-gray-600">Total Assessments Taken</p>
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

            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Assessments Taken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessments.length === 0 ? (
                  <div className="text-gray-600">No assessments found.</div>
                ) : (
                  assessments.map((a) => (
                    <div key={a._id} className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{a.title}</p>
                        <p className="text-sm text-gray-600">{a.category || ""}</p>
                      </div>
                      <div className="text-right">
                        {a.status && (
                          <Badge variant="secondary" className="rounded-full">{a.status}</Badge>
                        )}
                        {a.takenAt && (
                          <p className="text-xs text-gray-500 mt-1">{new Date(a.takenAt).toLocaleDateString("en-IN", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        )}
                        <div className="mt-2">
                          <Button
                            variant="ghost"
                            className="h-8 px-2 text-gray-600 hover:text-gray-900"
                            onClick={() => handleCopy(`${typeof window !== 'undefined' ? window.location.origin : ''}/assessment/${a._id}`)}
                            title="Copy assessment link"
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy invitation link
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}


