"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
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
            <Compass className="w-8 h-8 text-[#FF4D00]" />
          </div>
        </motion.div>

        {/* 404 large text */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="text-[80px] md:text-[120px] font-display font-medium leading-none tracking-tighter mb-4"
        >
          404
        </motion.h1>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#FF4D00] mb-6"
        >
          Not Found
        </motion.p>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="text-white/50 font-medium leading-relaxed mb-10"
        >
          This page doesn&apos;t exist yet. The Route hasn&apos;t reached here.
        </motion.p>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF4D00]/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
