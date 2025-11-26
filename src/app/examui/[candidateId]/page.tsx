'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const ASSESSMENT_DURATION = 30 * 60; // 30 minutes in seconds

export default function AssessmentExam() {
  const router = useRouter();
  const searchParams = useParams();
  const candidateId = searchParams.candidateId; // Correctly get from query params
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(ASSESSMENT_DURATION);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionNav, setShowQuestionNav] = useState(false);

  useEffect(() => {
    if (!candidateId) {
      router.push('/'); // Redirect if no candidateId
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exam/questions/${candidateId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch questions');
        }
        setQuestions(data.questions || []);
        setAnswers(Array(data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load questions');
        // Optionally redirect or show a retry option
        // router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [candidateId, router]);

  useEffect(() => {
    if (questions.length === 0 || isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions.length, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    if (currentIndex < newAnswers.length) {
      newAnswers[currentIndex] = e.target.value;
      setAnswers(newAnswers);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (submitLoading || questions.length === 0) return;

    setSubmitLoading(true);
    try {
      const submitData = answers.map((ans, idx) => ({ questionIndex: idx, answer: ans }));
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exam/submit/${candidateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answers }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      console.log('Submitted answers:', data);
      router.push('/success');
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setSubmitLoading(false);
    }
  };

  const navigateToQuestion = (index: number) => {
    if (index !== currentIndex && index < questions.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const timeProgress = (timeLeft / ASSESSMENT_DURATION) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-base sm:text-xl">Loading assessment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-red-400 text-sm sm:text-xl p-4 bg-red-500/20 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 p-3 sm:p-4 md:p-6 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="w-12 h-8 sm:w-16 sm:h-12 bg-white rounded-sm flex-shrink-0">
              <img src='/images/logo.png' alt="EarlyJobs Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">EarlyJobs Assessment</h1>
            </div>
          </div>
          
          {/* Timer */}
          <div className="relative w-full sm:w-auto">
            <div className="bg-black/30 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke={timeLeft < 300 ? "#ef4444" : "#f97316"}
                      strokeWidth="2"
                      strokeDasharray={`${timeProgress}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${timeLeft < 300 ? 'bg-red-400' : 'bg-orange-400'} animate-pulse`}></div>
                  </div>
                </div>
                <div className="flex-1 sm:flex-none">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Time Remaining</div>
                  <div className={`text-lg sm:text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-orange-400'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-gray-400">Progress</span>
            <span className="text-xs sm:text-sm text-orange-400">{currentIndex + 1} of {questions.length}</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 gap-4 sm:gap-6 overflow-hidden">
          {/* Question Navigator - Mobile Toggle Button */}
          <button
            onClick={() => setShowQuestionNav(!showQuestionNav)}
            className="lg:hidden bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-3 flex items-center justify-between text-white"
          >
            <span className="text-sm font-medium">Questions ({currentIndex + 1}/{questions.length})</span>
            <svg className={`w-5 h-5 transition-transform ${showQuestionNav ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Question Navigator */}
          <div className={`${showQuestionNav ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 max-h-[40vh] lg:max-h-[74vh] overflow-y-auto`}>
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              Questions
            </h2>
            <div className="space-y-1.5 sm:space-y-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigateToQuestion(index);
                    setShowQuestionNav(false);
                  }}
                  className={`
                    cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 group
                    ${currentIndex === index 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/25' 
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm sm:text-base font-medium ${currentIndex === index ? 'text-orange-300' : 'text-gray-300'}`}>
                      Question {index + 1}
                    </span>
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      {answers[index] && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      <div className={`
                        w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs
                        ${currentIndex === index 
                          ? 'border-orange-400 text-orange-400' 
                          : answers[index] 
                            ? 'border-green-400 bg-green-400/20 text-green-400' 
                            : 'border-gray-600 text-gray-600'
                        }
                      `}>
                        {answers[index] ? '✓' : index + 1}
                      </div>
                    </div>
                  </div>
                  {answers[index] && (
                    <div className="text-xs text-green-400 mt-1 opacity-80">Completed</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 max-h-[50vh] sm:max-h-[60vh] lg:max-h-[74vh] overflow-y-auto">
            <div className={`transition-all duration-200 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                    <span className="text-white font-bold text-xs sm:text-sm">{currentIndex + 1}</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                </div>
                <h2 
                  className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed whitespace-pre-line"
>
  {questions[currentIndex] || 'Question not loaded'}
</h2>
              </div>
              
              <div className="relative">
               <textarea
  value={answers[currentIndex] || ''}
  onChange={handleAnswerChange}
                  className="w-full h-48 sm:h-64 md:h-80 bg-black/30 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-sm sm:text-base text-white placeholder-gray-400 resize-none focus:outline-none focus:border-orange-400 focus:shadow-lg focus:shadow-orange-500/25 transition-all duration-300 backdrop-blur-sm"
  placeholder="Begin your response here..."
  disabled={submitLoading}
  // 🔒 prevent pasting
  onPaste={(e) => e.preventDefault()}
  // 🔒 prevent dropping text
  onDrop={(e) => e.preventDefault()}
  // 🔒 prevent drag from inserting
  onDragOver={(e) => e.preventDefault()}
/>

                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs text-gray-400">
                  {answers[currentIndex]?.length || 0} characters
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div className="text-xs sm:text-sm text-gray-400 order-2 sm:order-1">
                  Auto-save enabled • Last saved: just now
                </div>
                <button
                  onClick={handleNext}
                  disabled={submitLoading}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 order-1 sm:order-2"
                >
                  <span className="flex items-center justify-center">
                    {submitLoading ? 'Submitting...' : (currentIndex === questions.length - 1 ? 'Submit Assessment' : 'Continue')}
                    {!submitLoading && (
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}