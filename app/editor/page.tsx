"use client";

import { Suspense } from "react";
import { EditorLayout } from "@/components/editor/EditorLayout";

function EditorPageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-page">
      <p className="text-text-secondary animate-pulse">Loading editor…</p>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<EditorPageFallback />}>
      <EditorLayout />
    </Suspense>
  );
}
