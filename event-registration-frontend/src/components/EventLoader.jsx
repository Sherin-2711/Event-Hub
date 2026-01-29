import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const EventLoader = ({ isOpen, message = "Processing..." }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* 2. Main Card - Original Color Theme applied to Glass Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-purple-300 to-purple-500 shadow-2xl"
          >
            {/* Glossy Overlay (Shine effect) */}
            <div className="absolute inset-0 bg-white/10" />
            
            {/* Ambient Background Orbs for depth */}
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-900/10 blur-3xl" />

            <div className="relative flex flex-col items-center justify-center px-8 py-12">
              
              {/* 3. The Central Loader Complex */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Outer pulsing glow */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-white/40 blur-xl"
                />

                {/* Outer Ring - White/Transparent */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute h-24 w-24 rounded-full border border-dashed border-purple-900/20"
                />

                {/* Middle Ring - Deep Purple */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute h-20 w-20 rounded-full border-t-2 border-r-2 border-purple-900/60"
                />

                {/* Inner Icon Container */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative z-10 rounded-full bg-white/20 p-3 shadow-sm border border-white/30 backdrop-blur-sm"
                >
                  {/* Original Deep Purple Icon Color */}
                  <Loader2 className="h-8 w-8 text-purple-900" strokeWidth={2.5} />
                </motion.div>
                
                {/* Floating Particles - Deep Purple */}
                <Sparkles className="absolute -top-4 -right-4 h-5 w-5 animate-pulse text-white opacity-80" />
                <Sparkles className="absolute -bottom-2 -left-6 h-4 w-4 animate-pulse text-purple-900 opacity-40 delay-700" />
              </div>

              {/* 4. Text Content - Original Deep Purple Text */}
              <div className="text-center">
                <motion.h3 
                  className="mb-1 text-xl font-bold tracking-wide text-purple-900 drop-shadow-sm"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {message}
                </motion.h3>
                
                {/* Loading Dots */}
                <p className="flex items-center justify-center gap-1 text-sm text-purple-900/70 font-medium">
                  Please wait
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                  >.</motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, times: [0, 0.5, 1] }}
                  >.</motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, times: [0, 0.5, 1] }}
                  >.</motion.span>
                </p>
              </div>

              {/* Progress Bar Decoration */}
              <div className="mt-6 h-1.5 w-32 overflow-hidden rounded-full bg-black/5">
                <motion.div
                  className="h-full bg-purple-900"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventLoader;