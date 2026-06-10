"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#293C4B]/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-start gap-5">
          <span className="text-[#EC8644] text-xs font-mono font-medium mt-0.5 w-5 shrink-0 opacity-60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[#293C4B] text-base sm:text-lg font-semibold leading-snug group-hover:text-[#EC8644] transition-colors">
            {item.question}
          </span>
        </span>
        <span className="shrink-0 text-[#9CADB7] group-hover:text-[#EC8644] transition-colors">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-[#9CADB7] text-sm sm:text-base leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section id="faq" className="bg-[#F4F3EF] py-16 sm:py-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-6 h-[2px] bg-[#EC8644]" />
            <span className="text-[#EC8644] text-xs font-medium tracking-[0.22em] uppercase">
              Questions
            </span>
          </div>
          <h2
            className="font-[var(--font-zuume)] font-black text-[#293C4B] tracking-tight leading-none mb-14"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            FAQ
          </h2>

          {/* Rows */}
          <div>
            {items.map((item, i) => (
              <FAQRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
