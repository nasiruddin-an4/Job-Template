"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Briefcase,
  RefreshCw,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

const BANNER_SIZES = [{ id: "square", w: 1080, h: 1080, label: "Square" }];

/* ─────────────────────────────────────────────────────────────────────────────
   SQAURE POSTER (1080 x 1080)
   Used for Instagram posts and Facebook feed.
   ───────────────────────────────────────────────────────────────────────────── */
function SquarePoster({ selectedTemplate, customDetails, selectedJob }) {
  return (
    <div className="w-full h-full relative font-sans overflow-hidden bg-white">
      {selectedTemplate && (
        <Image
          src={`/template/${selectedTemplate}`}
          fill
          className="absolute inset-0 object-cover"
          alt="Square Background"
          priority
          unoptimized
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-between z-10 w-full py-16">
        <div className="px-16">
          <div className="leading-none mb-16 mt-24">
            <h2 className="font-medium text-black text-[45px]">We are</h2>
            <h1 className="font-bold tracking-tight text-black text-[130px] leading-[0.85]">
              Hiring
            </h1>
          </div>
          <p className="text-gray-700 font-medium text-[30px]">Position:</p>
          <div className="mt-1">
            <h3
              className={`font-bold text-[36px] leading-[1.3] max-w-[600px] ${customDetails.titleColor === "white" ? "text-white" : "text-black"}`}
            >
              {selectedJob?.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-[16px] mt-[16px]">
            {[customDetails.jobType, customDetails.shift]
              .filter(Boolean)
              .map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-white/95 border border-gray-100/50 rounded-full text-gray-800 tracking-wide shadow-sm px-4 py-1 text-2xl"
                >
                  {badge
                    .replace(/&amp;/g, "&")
                    .replace(/\s*\(.*?\)/g, "")
                    .trim()}
                </span>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-[55%] gap-4 px-16 mb-24">
          <div className="bg-linear-to-r from-white/95 via-white/85 to-transparent pl-4 py-2">
            <p className="text-gray-700 font-semibold text-[22px]">
              Salary Range:
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-brandOrange font-bold text-[40px]">
                {customDetails.salary
                  ? customDetails.salary
                      .replace(/\s*\(?negotiable\)?/gi, "")
                      .trim() || "Negotiable"
                  : "Negotiable"}
              </span>
            </div>
          </div>
          <div className="bg-linear-to-r from-white/95 via-white/85 to-transparent pl-4 py-2">
            <p className="text-gray-700 font-semibold text-[22px]">Apply By:</p>
            <div className="text-brandOrange font-bold text-[40px]">
              {customDetails.applyBy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosterContent({ selectedTemplate, customDetails, selectedJob }) {
  return (
    <SquarePoster
      selectedTemplate={selectedTemplate}
      customDetails={customDetails}
      selectedJob={selectedJob}
    />
  );
}

function SimpleFormatCard({
  size,
  selectedTemplate,
  customDetails,
  selectedJob,
}) {
  const displayWidth = 650;
  const scale = displayWidth / size.w;
  const previewHeight = size.h * scale;

  return (
    <div className="flex flex-col gap-4 shrink-0 transition-transform duration-300">
      <div className="flex items-center justify-between px-2">
        <span className="text-[12px] font-bold text-slate-400 capitalize">
          {size.label}
        </span>
      </div>
      <div
        className="bg-white overflow-hidden relative border border-gray-200"
        style={{ width: `${displayWidth}px`, height: `${previewHeight}px` }}
      >
        <div
          style={{
            width: `${size.w}px`,
            height: `${size.h}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <PosterContent
            size={size}
            selectedTemplate={selectedTemplate}
            customDetails={customDetails}
            selectedJob={selectedJob}
          />
        </div>
      </div>
    </div>
  );
}

export default function StepCustomize({
  selectedTemplate,
  selectedJob,
  setSelectedJob,
  customDetails,
  setCustomDetails,
  isGenerating,
  handleDownloadAll,
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
      <aside className="w-[380px] bg-white border-r border-gray-200 overflow-y-auto hidden lg:flex flex-col custom-scrollbar">
        <div className="p-5 space-y-6 flex-1">
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
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Title Color
            </label>
            <div className="flex gap-2">
              {[
                { v: "black", c: "bg-black" },
                { v: "white", c: "bg-white" },
              ].map((color) => (
                <button
                  key={color.v}
                  type="button"
                  onClick={() =>
                    setCustomDetails({ ...customDetails, titleColor: color.v })
                  }
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    customDetails.titleColor === color.v
                      ? "border-orange-500 ring-2 ring-orange-500/30 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full ${color.c} border border-gray-300`}
                  />
                  {color.v.charAt(0).toUpperCase() + color.v.slice(1)}
                </button>
              ))}
            </div>
          </div>

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
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none"
            />
          </div>

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
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none"
              />
            </div>
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
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none"
              />
            </div>
          </div>

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
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none"
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-slate-50 relative overflow-hidden">
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar py-2 px-5 flex justify-center items-center gap-4">
          {BANNER_SIZES.map((size) => (
            <SimpleFormatCard
              key={size.id}
              size={size}
              selectedTemplate={selectedTemplate}
              customDetails={customDetails}
              selectedJob={selectedJob}
            />
          ))}
        </div>
        <div className="fixed top-[-9999px] left-[-9999px]">
          <div
            ref={previewRef}
            style={{
              width: `${customDetails.bannerSize?.w || 1080}px`,
              height: `${customDetails.bannerSize?.h || 1080}px`,
            }}
          >
            <PosterContent
              size={customDetails.bannerSize || { w: 1080, h: 1080 }}
              selectedTemplate={selectedTemplate}
              customDetails={customDetails}
              selectedJob={selectedJob}
            />
          </div>
        </div>
        <div className="p-4 bg-white border-t border-gray-200 flex justify-center items-center shadow-2xl">
          <button
            onClick={handleDownloadAll}
            disabled={isGenerating}
            className="w-full max-w-sm bg-brandOrange hover:bg-brandOrange/80 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-4 text-2xl disabled:opacity-50 transition-all active:scale-95 shrink-0"
          >
            {isGenerating ? (
              <RefreshCw className="w-8 h-8 animate-spin" />
            ) : (
              <Download className="w-8 h-8" />
            )}
            {isGenerating ? "Exporting Banners..." : "Download Poster"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
