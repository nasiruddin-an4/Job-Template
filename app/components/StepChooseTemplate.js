"use client";

import Image from "next/image";
import { ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function StepChooseTemplate({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  onNext,
  canProceed,
}) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-1 flex flex-col"
    >
      <div className="max-w-6xl w-full mx-auto px-6 pt-6 flex-1">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold mb-1">Choose a Template</h2>
          <p className="text-zinc-400 text-lg">
            Select a background design for your job poster
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((temp) => (
            <button
              key={temp}
              onClick={() => setSelectedTemplate(temp)}
              className={`group relative rounded-2xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-[1.03] ${
                selectedTemplate === temp
                  ? "border-orange-500 shadow-2xl shadow-orange-500/20 ring-2 ring-orange-500/30"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="relative aspect-square w-full bg-zinc-800">
                <Image
                  src={`/template/${temp}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={temp}
                  unoptimized
                />
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    selectedTemplate === temp
                      ? "bg-orange-500/10"
                      : "bg-black/0 group-hover:bg-black/20"
                  }`}
                />

                {/* Selected Checkmark */}
                {selectedTemplate === temp && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="p-3 bg-zinc-900/90 backdrop-blur">
                <p className="text-xs font-semibold text-zinc-300 truncate">
                  {temp.replace(/-/g, " ").replace(".png", "")}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 backdrop-blur-xl p-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-gray-300 text-white rounded-md transition-all flex items-center gap-2 active:scale-95"
          >
            Next: Select Position
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
