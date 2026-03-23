"use client"

import React, { useState, useEffect } from "react"
import { X, User, Sparkles, ArrowLeft, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

type Step = "role" | "details" | "otp"

const LeadsPopup = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [step, setStep] = useState<Step>("role")
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [otp, setOtp] = useState("")
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0)
    // OTP backend base URL (requested: NEXT_PUBLIC_BACKEND_URL_2_0).
    // Fallback to NEXT_PUBLIC_BACKEND_URL in case 2_0 is not configured.
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || process.env.NEXT_PUBLIC_BACKEND_URL
    // During testing, we often don't want the modal suppressed by persisted flags.
    // Set NEXT_PUBLIC_LEADS_POPUP_USE_STORAGE="true" to re-enable storage-based suppression.
    const useStorageFlags = process.env.NEXT_PUBLIC_LEADS_POPUP_USE_STORAGE === "true"

    useEffect(() => {
        const isSubmitted = localStorage.getItem("leads_popup_submitted")
        const isDismissed = sessionStorage.getItem("leads_popup_dismissed")

        // Always respect "submitted" so the popup won't appear again after success.
        if (isSubmitted) return
        // Optionally respect "dismissed" only when explicitly enabled (useful for testing).
        if (useStorageFlags && isDismissed) return

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 60000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isVisible) return
        if (resendCountdown <= 0) return

        const interval = setInterval(() => {
            setResendCountdown((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(interval)
    }, [isVisible, resendCountdown])

    const handleClose = () => {
        setIsVisible(false)
        setStep("role")
        setSelectedRole(null)
        setName("")
        setEmail("")
        setMobile("")
        setOtp("")
        setResendCountdown(0)
        if (useStorageFlags) sessionStorage.setItem("leads_popup_dismissed", "true")
    }

    const handleSelection = (role: string) => {
        setSelectedRole(role)
        setStep("details")
    }

    const handleBackToRoles = () => {
        setStep("role")
        setSelectedRole(null)
        setResendCountdown(0)
    }

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedName = name.trim()
        const trimmedEmail = email.trim()
        const digitsOnly = mobile.replace(/\D/g, "")

        if (!trimmedName) {
            toast.error("Please enter your name.")
            return
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        if (!emailOk) {
            toast.error("Please enter a valid email address.")
            return
        }
        if (digitsOnly.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number.")
            return
        }

        const sendOtp = async () => {
            setIsSendingOtp(true)
            try {
                if (!backendUrl) {
                    toast.error("Backend URL is missing.")
                    return
                }

                const phone = `+91${digitsOnly}`
                const response = await fetch(`${backendUrl}/users/assessmentPortalLead/sendOtp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: trimmedEmail,
                        phone
                    })
                })

                if (!response.ok) {
                    const data = await response.json().catch(() => null)
                    toast.error(data?.message || "Failed to send OTP.")
                    return
                }

                setOtp("")
                setStep("otp")
                setResendCountdown(30)
                toast.success("OTP sent!", {
                    description: "Enter the 6-digit OTP to confirm.",
                    icon: <Sparkles className="w-4 h-4 text-orange-500" />
                })
            } catch (err: any) {
                toast.error(err?.message || "Error sending OTP.")
            } finally {
                setIsSendingOtp(false)
            }
        }

        void sendOtp()
    }

    const onMobileChange = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 10)
        setMobile(digits)
    }

    const handleBackToDetails = () => {
        setStep("details")
        setOtp("")
        setResendCountdown(0)
    }

    const handleOtpChange = (value: string) => {
        setOtp(value.replace(/\D/g, "").slice(0, 6))
    }

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedName = name.trim()
        const trimmedEmail = email.trim()
        const digitsOnly = mobile.replace(/\D/g, "")
        const fullMobile = `+91${digitsOnly}`
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP.")
            return
        }

        setIsVerifyingOtp(true)
        try {
            if (!backendUrl) {
                toast.error("Backend URL is missing.")
                return
            }

            const submitResp = await fetch(`${backendUrl}/users/submitLead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    otp,
                    mobile: fullMobile,
                    name: trimmedName,
                    email: trimmedEmail,
                    role: selectedRole
                })
            })

            const submitData = await submitResp.json().catch(() => null)
            if (!submitResp.ok || submitData?.success === false) {
                toast.error(submitData?.message || "Failed to submit lead.")
                return
            }

            setIsVisible(false)
            setStep("role")
            setSelectedRole(null)
            setName("")
            setEmail("")
            setMobile("")
            setOtp("")
            // Persist success so the popup doesn't show next time.
            localStorage.setItem("leads_popup_submitted", "true")
            toast.success("Verified!", {
                description: `Thanks! Your details are submitted as a ${selectedRole ?? "visitor"}.`,
                icon: <Sparkles className="w-4 h-4 text-orange-500" />
            })
        } catch (err: any) {
            toast.error(err?.message || "Error verifying OTP.")
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    return (
        <>
            {isVisible ? (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/40">
                    <div className="relative w-full max-w-[360px] bg-white/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 pb-2 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                {step !== "role" && (
                                    <button
                                        type="button"
                                        onClick={step === "details" ? handleBackToRoles : handleBackToDetails}
                                        className="p-1.5 -ml-1 hover:bg-black/5 rounded-full transition-colors shrink-0"
                                        aria-label="Back to role selection"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                                    </button>
                                )}
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 min-w-0">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                                    <span className="truncate">
                                        {step === "role"
                                            ? "You are a..."
                                            : step === "details"
                                              ? "Your details"
                                              : "Verify OTP"}
                                    </span>
                                </h2>
                            </div>
                            <button onClick={handleClose} className="p-1.5 hover:bg-black/5 rounded-full transition-colors shrink-0">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Step: role or contact form */}
                        <div className="p-5 pt-2">
                            {step === "role" ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 mb-4 px-1">Choose one to continue</p>
                                    {["Job seeker", "Recruiter", "Company"].map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleSelection(role)}
                                            className="w-full flex items-center justify-between p-3.5 bg-white/50 hover:bg-orange-500 hover:text-white rounded-2xl border border-gray-100 hover:border-orange-400 transition-all font-semibold text-gray-700 shadow-sm group"
                                        >
                                            {role}
                                            <User className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            ) : step === "details" ? (
                                <form onSubmit={handleDetailsSubmit} className="space-y-3">
                                    {selectedRole && (
                                        <p className="text-xs text-gray-500 px-1 -mt-1">
                                            Selected: <span className="font-medium text-gray-700">{selectedRole}</span>
                                        </p>
                                    )}
                                    <div>
                                        <label htmlFor="leads-name" className="sr-only">Name</label>
                                        <input
                                            id="leads-name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3.5 py-3 rounded-2xl border border-gray-100 bg-white/80 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <label htmlFor="leads-email" className="sr-only">Email</label>
                                        <input
                                            id="leads-email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-gray-100 bg-white/80 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <label htmlFor="leads-mobile" className="sr-only">Mobile number</label>
                                        <input
                                            id="leads-mobile"
                                            type="tel"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            placeholder="10-digit mobile"
                                            value={mobile}
                                            onChange={(e) => onMobileChange(e.target.value)}
                                            maxLength={10}
                                            className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-gray-100 bg-white/80 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSendingOtp}
                                        className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSendingOtp ? "Sending OTP..." : "Submit"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleOtpSubmit} className="space-y-3">
                                    <p className="text-sm text-gray-500 mb-1 px-1">
                                        Enter the 6-digit OTP sent to your mobile and email.
                                    </p>
                                    <div>
                                        <label htmlFor="leads-otp" className="sr-only">OTP</label>
                                        <input
                                            id="leads-otp"
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => handleOtpChange(e.target.value)}
                                            maxLength={6}
                                            className="w-full px-3.5 py-3 rounded-2xl border border-gray-100 bg-white/80 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isVerifyingOtp || otp.length !== 6}
                                        className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={isSendingOtp || isVerifyingOtp || resendCountdown > 0}
                                        onClick={async () => {
                                            const digitsOnly = mobile.replace(/\D/g, "")
                                            const trimmedEmail = email.trim()
                                            if (digitsOnly.length !== 10 || !trimmedEmail) {
                                                toast.error("Enter valid mobile and email first.")
                                                return
                                            }
                                            setIsSendingOtp(true)
                                            try {
                                                if (!backendUrl) {
                                                    toast.error("Backend URL is missing.")
                                                    return
                                                }

                                                const phone = `+91${digitsOnly}`
                                                const response = await fetch(`${backendUrl}/users/assessmentPortalLead/resendOtp`, {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        email: trimmedEmail,
                                                        phone
                                                    })
                                                })

                                                if (!response.ok) {
                                                    const data = await response.json().catch(() => null)
                                                    toast.error(data?.message || "Failed to resend OTP.")
                                                    return
                                                }
                                                setOtp("")
                                                setResendCountdown(30)
                                                toast.success("OTP resent.")
                                            } catch (err: any) {
                                                toast.error(err?.message || "Error resending OTP.")
                                            } finally {
                                                setIsSendingOtp(false)
                                            }
                                        }}
                                        className="w-full py-2.5 rounded-2xl border border-gray-200 bg-white/30 hover:bg-white/50 text-gray-700 font-semibold text-sm shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {resendCountdown > 0 ? `Resend OTP (${resendCountdown}s)` : "Resend OTP"}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Decorative footer spacer */}
                        <div className="h-4" />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default LeadsPopup
