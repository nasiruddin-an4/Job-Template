"use client";

import { Briefcase, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepSelectPosition({
  jobs,
  selectedJob,
  selectJob,
  onNext,
  onBack,
  canProceed,
}) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-1 flex flex-col"
    >
      <div className="max-w-5xl w-full mx-auto px-6 py-6 flex-1">
        <div className="text-center mb-2">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Select a Position
          </h2>
          <p className="text-slate-400 text-lg">
            Pick the job you want to create a poster for
          </p>
        </div>

        {/* Count bar */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-slate-500 font-medium">
            {jobs.length} open positions
          </p>
          {selectedJob && (
            <span className="text-sm text-orange-600 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              {selectedJob.title}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <button
                key={job.id}
                onClick={() => selectJob(job)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-200 border group relative overflow-hidden ${
                  isSelected
                    ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                    : "border-gray-200 bg-white hover:border-orange-200 hover:shadow-md hover:shadow-gray-100"
                }`}
              >
                {/* Selection indicator bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-500"
                      : "bg-transparent group-hover:bg-orange-200"
                  }`}
                />

                <div className="flex items-start gap-4 pl-2">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-500"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-[15px] mb-2 line-clamp-2 leading-snug ${
                        isSelected ? "text-orange-900" : "text-slate-800"
                      }`}
                    >
                      {job.title}
                    </p>

                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {job.company_id}
                      </span>
                      {job.department && (
                        <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          {job.department}
                        </span>
                      )}
                      {job.employment_type && (
                        <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                          {job.employment_type}
                        </span>
                      )}
                      {job.vacancies > 0 && (
                        <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                          {job.vacancies}{" "}
                          {job.vacancies === 1 ? "vacancy" : "vacancies"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checkmark */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? "bg-orange-500 scale-100"
                        : "bg-gray-100 scale-90 group-hover:scale-100 group-hover:bg-gray-200"
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 backdrop-blur-xl p-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-slate-600 font-medium rounded-md transition-all flex items-center gap-2 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-md transition-all flex items-center gap-2 active:scale-95"
          >
            Next: Customize
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
