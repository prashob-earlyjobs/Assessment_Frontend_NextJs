"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Sparkles } from "lucide-react"
import { toast } from "sonner"

const LeadsPopup = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const isSubmitted = localStorage.getItem("leads_popup_submitted")
        const isDismissed = sessionStorage.getItem("leads_popup_dismissed")

        if (isSubmitted || isDismissed) return

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 60000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        sessionStorage.setItem("leads_popup_dismissed", "true")
    }

    const handleSelection = (role: string) => {
        setIsVisible(false)
        localStorage.setItem("leads_popup_submitted", "true")
        toast.success("Thank you for your response!", {
            description: `We've noted that you are a ${role}.`,
            icon: <Sparkles className="w-4 h-4 text-orange-500" />
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-[360px] bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 pb-2">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                You are a...
                            </h2>
                            <button onClick={handleClose} className="p-1.5 hover:bg-black/5 rounded-full transition-colors">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="p-5 pt-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-2"
                            >
                                <p className="text-sm text-gray-500 mb-4 px-1">Choose one to continue</p>
                                {["Job seeker", "Recruiters", "Companies"].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => handleSelection(role)}
                                        className="w-full flex items-center justify-between p-3.5 bg-white/50 hover:bg-orange-500 hover:text-white rounded-2xl border border-gray-100 hover:border-orange-400 transition-all font-semibold text-gray-700 shadow-sm group"
                                    >
                                        {role}
                                        <User className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </motion.div>
                        </div>

                        {/* Decorative footer spacer */}
                        <div className="h-4" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default LeadsPopup
