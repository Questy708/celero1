"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error("Application error:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#FF4D00]/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[#FF4D00]" />
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#FF4D00] mb-6"
        >
          Error
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4"
        >
          Something went wrong
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="text-white/50 font-medium leading-relaxed mb-8"
        >
          {isDev
            ? error.message || "An unexpected error occurred."
            : "An unexpected error occurred. Please try again."}
        </motion.p>

        {/* Error digest (for production debugging) */}
        {error.digest && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="font-mono text-[10px] text-white/20 mb-8"
          >
            Ref: {error.digest}
          </motion.p>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
