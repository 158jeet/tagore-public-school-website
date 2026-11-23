"use client";

export function PrintChecklistButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold print:hidden"
    >
      Print this checklist
    </button>
  );
}
