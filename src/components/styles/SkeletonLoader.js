// src/style/SkeletonLoader.js
import React from "react";
import { motion } from "framer-motion";

/**
 * Animated Skeleton Block — reusable shimmer placeholder
 * You can pass custom width, height, and shape via Tailwind classes.
 */
export const SkeletonBlock = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        repeat: Infinity,
        duration: 1.6,
        ease: "easeInOut",
      }}
      style={{ width: "50%" }}
    />
  </div>
);

/**
 * Example Skeleton Layout for dashboards
 * You can reuse this or make custom layouts by mixing <SkeletonBlock />
 */
export const SkeletonDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <SkeletonBlock className="h-6 w-48 mb-3" />
          <SkeletonBlock className="h-4 w-32" />
        </div>
        <SkeletonBlock className="h-10 w-40" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-6 w-16" />
          </div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 border bg-white rounded-lg space-y-4 shadow">
            <div className="flex items-center space-x-3">
              <SkeletonBlock className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            </div>
            <SkeletonBlock className="h-4 w-20 mt-2" />
            <SkeletonBlock className="h-3 w-36" />
            <SkeletonBlock className="h-3 w-24" />
            <div className="flex justify-end space-x-2 pt-3 border-t">
              <SkeletonBlock className="h-5 w-12 rounded" />
              <SkeletonBlock className="h-5 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
