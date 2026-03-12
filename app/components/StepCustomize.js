"use client";

import Image from "next/image";
import {
  Download,
  Briefcase,
  RefreshCw,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StepCustomize({
  selectedTemplate,
  selectedJob,
  setSelectedJob,
  customDetails,
  setCustomDetails,
  isGenerating,
  handleDownload,
  previewRef,
  goToStep,
}) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-1 flex h-[calc(100vh-73px)] overflow-hidden"
    >
      {/* ── Sidebar ── */}
      <aside className="w-[380px] bg-white border-r border-gray-200 overflow-y-auto hidden lg:flex flex-col custom-scrollbar">
        {/* Form Fields */}
        <div className="p-5 space-y-6 flex-1">
          {/* Template Preview Card */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5 block">
              Selected Template
            </label>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={`/template/${selectedTemplate}`}
                fill
                className="object-cover"
                alt="Selected template"
                unoptimized
              />
            </div>
            <button
              onClick={() => goToStep(1)}
              className="text-xs text-orange-600 hover:text-orange-500 mt-2.5 font-semibold transition-colors inline-flex items-center gap-1"
            >
              Change template
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Display Title */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              Display Title
            </label>
            <input
              type="text"
              value={selectedJob?.title || ""}
              onChange={(e) =>
                setSelectedJob({ ...selectedJob, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-slate-300"
              placeholder="e.g. Senior Developer"
            />
          </div>

          {/* Title Color */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Title Color
            </label>
            <div className="flex gap-2">
              {[
                {
                  value: "black",
                  label: "Black",
                  bg: "bg-black",
                  ring: "ring-gray-400",
                },
                {
                  value: "white",
                  label: "White",
                  bg: "bg-white",
                  ring: "ring-gray-300",
                },
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setCustomDetails({
                      ...customDetails,
                      titleColor: color.value,
                    })
                  }
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    customDetails.titleColor === color.value
                      ? "border-orange-500 ring-2 ring-orange-500/30 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-white text-slate-600 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full ${color.bg} border border-gray-300 ring-1 ${color.ring}`}
                  />
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              Salary Range
            </label>
            <input
              type="text"
              value={customDetails.salary}
              onChange={(e) =>
                setCustomDetails({ ...customDetails, salary: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="e.g. 40,000 - 60,000"
            />
          </div>

          {/* Work Mode & Job Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Work Mode
              </label>
              <input
                type="text"
                value={customDetails.location}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    location: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="On Site"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Job Type
              </label>
              <input
                type="text"
                value={customDetails.jobType}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    jobType: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Full-time"
              />
            </div>
          </div>

          {/* Shift */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Shift
            </label>
            <input
              type="text"
              value={customDetails.shift}
              onChange={(e) =>
                setCustomDetails({ ...customDetails, shift: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="Day Shift"
            />
          </div>

          {/* Apply By */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Apply By
            </label>
            <input
              type="text"
              value={customDetails.applyBy}
              onChange={(e) =>
                setCustomDetails({ ...customDetails, applyBy: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="10 FEB 2026"
            />
          </div>
        </div>
      </aside>

      {/* ── Preview Area ── */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto bg-gray-100 py-10">
        <div className="relative">
          <div
            className="shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden bg-white"
            style={{ width: "800px", height: "800px" }}
            ref={previewRef}
          >
            <div className="w-full h-full relative font-sans overflow-hidden bg-white">
              <div className="relative w-full h-full">
                {selectedTemplate && (
                  <Image
                    src={`/template/${selectedTemplate}`}
                    fill
                    className="absolute inset-0 object-cover"
                    alt="Template Background"
                    priority
                    unoptimized
                  />
                )}

                {/* Main Content Container */}
                <div className="absolute inset-0 flex flex-col justify-between py-16 z-10 w-full">
                  {/* Hero Section */}
                  <div className="px-16">
                    {/* We are Hiring (Static) */}
                    <div className="leading-none mb-8 mt-16">
                      <h2 className="text-[40px] font-medium text-black">
                        We are
                      </h2>
                      <h1
                        className="text-[100px] font-bold tracking-tight"
                        style={{
                          color: customDetails.titleColor || "black",
                          lineHeight: "0.9",
                        }}
                      >
                        Hiring
                      </h1>
                    </div>

                    {/* Position Label */}
                    <p className="text-2xl text-gray-700 font-medium mb-1">
                      Position:
                    </p>

                    {/* Job Title */}
                    <div className="flex items-center gap-3 mb-5 max-w-md">
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: customDetails.titleColor || "black" }}
                      >
                        {selectedJob?.title}
                      </h3>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-4 mt-2">
                      {[customDetails.jobType, customDetails.shift]
                        .filter(Boolean)
                        .map((badge, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-2 bg-white/95 border border-gray-100/50 rounded-full text-[14px] font-semibold text-gray-800 tracking-wide"
                          >
                            {badge
                              .replace(/&amp;/g, "&")
                              .replace(/\s*\(.*?\)/g, "")
                              .trim()}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Footer Info Overlay */}
                  <div className="flex flex-col gap-4 w-[55%] px-16 mb-18">
                    {/* Salary */}
                    <div className="pl-4 py-2 bg-linear-to-r from-white/95 via-white/80 to-transparent">
                      <p className="text-[16px] text-gray-700 font-semibold">
                        Salary Range:
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[24px] text-orange-500 font-bold">
                          {customDetails.salary
                            ? customDetails.salary
                                .replace(/\s*\(?negotiable\)?/gi, "")
                                .trim() || "Negotiable"
                            : "Negotiable"}
                        </span>
                      </div>
                    </div>

                    {/* Apply By */}
                    <div className="pl-4 py-2 bg-linear-to-r from-white/95 via-white/80 to-transparent">
                      <p className="text-[16px] text-gray-700 font-semibold">
                        Apply By:
                      </p>
                      <div className="text-[24px] text-orange-500 font-bold">
                        {customDetails.applyBy}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button Moved Below Canvas */}
        <div className="mt-8 w-[800px]">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-4 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
          >
            {isGenerating ? (
              <RefreshCw className="h-6 w-6 animate-spin" />
            ) : (
              <Download className="h-6 w-6" />
            )}
            {isGenerating
              ? "Generating High-Quality Poster..."
              : "Download High-Quality Poster"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
