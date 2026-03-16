"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import { Layout, RefreshCw, Check, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { parseJobDescription } from "./utils";

import StepChooseTemplate from "./components/StepChooseTemplate";
import StepSelectPosition from "./components/StepSelectPosition";
import StepCustomize from "./components/StepCustomize";

const STEPS = [
  { id: 1, label: "Choose Template" },
  { id: 2, label: "Select Position" },
  { id: 3, label: "Customize & Download" },
];

export default function JobPosterGenerator() {
  const [step, setStep] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customDetails, setCustomDetails] = useState({
    salary: "",
    location: "",
    jobType: "",
    shift: "",
    deadline: "",
    applyBy: "",
    titleColor: "black",
    bannerSize: { id: "square", w: 1080, h: 1080, label: "Square" },
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  /* ── Fetch Data ── */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [jobsRes, templatesRes] = await Promise.all([
        axios.get("/api/jobs"),
        axios.get("/api/templates"),
      ]);
      setJobs(jobsRes.data.jobs || []);
      setTemplates(templatesRes.data.templates || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Select a Job ── */
  const selectJob = (job) => {
    setSelectedJob(job);
    const parsed = parseJobDescription(job.description);
    setCustomDetails((prev) => ({
      salary: parsed.salary || "Negotiable",
      location: parsed.location || "On Site",
      jobType: parsed.jobType || "Full-time",
      shift: parsed.shift || "Day Shift",
      deadline: parsed.deadline || "Not Specified",
      applyBy: "10 FEB 2026",
      titleColor: prev.titleColor || "black",
      bannerSize: prev.bannerSize || { id: "square", w: 1080, h: 1080, label: "Square" },
    }));
  };

  /* ── Download Poster ── */
  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const bSize = customDetails.bannerSize || { w: 1080, h: 1080 };
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.95,
        pixelRatio: bSize.w / 800,
        canvasWidth: bSize.w,
        canvasHeight: bSize.h,
      });
      const link = document.createElement("a");
      link.download = `job-poster-${selectedJob?.title
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Could not generate image", err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ── Download All Sizes ── */
  const handleDownloadAll = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    const sizes = [
      { id: "square", w: 1080, h: 1080, label: "Square" },
      { id: "vertical", w: 1440, h: 2560, label: "Vertical" },
      { id: "portrait", w: 1440, h: 1800, label: "Portrait" },
      { id: "landscape", w: 2400, h: 1260, label: "Landscape" },
    ];

    try {
      for (const size of sizes) {
        // Temporarily update state to trigger re-render for this size
        setCustomDetails((prev) => ({ ...prev, bannerSize: size }));
        
        // Wait for a small frame to ensure React re-renders the canvas height
        await new Promise((resolve) => setTimeout(resolve, 500));

        const dataUrl = await toPng(previewRef.current, {
          quality: 0.95,
          pixelRatio: size.w / 800,
          canvasWidth: size.w,
          canvasHeight: size.h,
        });

        const link = document.createElement("a");
        link.download = `job-poster-${size.id}-${selectedJob?.title
          .replace(/\s+/g, "-")
          .toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Could not generate all images", err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ── Can Proceed? ── */
  const canProceed = () => {
    if (step === 1) return !!selectedTemplate;
    if (step === 2) return !!selectedJob;
    return true;
  };

  /* ─────────────────── LOADING ─────────────────── */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
          <p className="text-zinc-400 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  /* ─────────────────── MAIN ─────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
      {/* ── Top Bar ── */}
      <header className="bg-white backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layout className="h-5 w-5 text-brandOrange" />
            <h1 className="text-lg font-bold">Betopia Job Poster Generator</h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s.id < step) setStep(s.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    step === s.id
                      ? "bg-orange-600 text-white"
                      : step > s.id
                        ? "bg-orange-100 text-orange-600 cursor-pointer hover:bg-orange-200"
                        : "bg-gray-100 text-zinc-400"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > s.id
                        ? "bg-orange-500 text-white"
                        : step === s.id
                          ? "bg-white/20"
                          : "bg-gray-200"
                    }`}
                  >
                    {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <ChevronRight
                    className={`w-4 h-4 ${
                      step > s.id ? "text-orange-500" : "text-zinc-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Content Area ── */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepChooseTemplate
              templates={templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              onNext={() => canProceed() && setStep(2)}
              canProceed={canProceed()}
            />
          )}

          {step === 2 && (
            <StepSelectPosition
              jobs={jobs}
              selectedJob={selectedJob}
              selectJob={selectJob}
              onNext={() => canProceed() && setStep(3)}
              onBack={() => setStep(1)}
              canProceed={canProceed()}
            />
          )}

          {step === 3 && (
            <StepCustomize
              selectedTemplate={selectedTemplate}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              customDetails={customDetails}
              setCustomDetails={setCustomDetails}
              isGenerating={isGenerating}
              handleDownload={handleDownload}
              handleDownloadAll={handleDownloadAll}
              previewRef={previewRef}
              goToStep={setStep}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
