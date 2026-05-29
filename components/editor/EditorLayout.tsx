"use client";

import { useMemo } from "react";
import { TopBar } from "./TopBar";
import { CategorySidebar } from "./CategorySidebar";
import { CharacterCanvas } from "@/components/canvas/CharacterCanvas";
import { CanvasControls } from "@/components/canvas/CanvasControls";
import { CacheDevTools } from "@/components/debug/CacheDevTools";
import { ControlPanel } from "./ControlPanel";
import { ExportDialog } from "./ExportDialog";
import { useCharacterStore } from "@/lib/stores/character-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { getCategories, getTemplatesForCategory } from "@/lib/templates/registry";
import { useOnboarding } from "@/lib/utils/use-onboarding";
import { OnboardingTooltip } from "./OnboardingTooltip";
import type { CategoryId } from "@/lib/templates/schema";

// Static imports ensure template definitions are registered at module load
import "@/lib/templates/definitions/cartoon-base-a";
import "@/lib/templates/definitions/fantasy-knight";

function OnboardingOverlay() {
  const { isActive, currentStep, step, totalSteps, next, dismiss, hydrated } =
    useOnboarding();

  if (!isActive || !currentStep || step === null) return null;

  return (
    <OnboardingTooltip
      step={currentStep}
      currentIndex={step}
      totalSteps={totalSteps}
      onNext={next}
      onDismiss={dismiss}
    />
  );
}

export function EditorLayout() {
  const selectedCategory = useCharacterStore((s) => s.categoryId);
  const selectedTemplate = useCharacterStore((s) => s.templateId);
  const selectCategory = useCharacterStore((s) => s.selectCategory);
  const selectTemplate = useCharacterStore((s) => s.selectTemplate);

  const isSidebarOpen = useUIStore((s) => s.isCategorySidebarOpen);
  const isControlsOpen = useUIStore((s) => s.isControlPanelOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const toggleControlPanel = useUIStore((s) => s.toggleControlPanel);

  // Derive data from template registry
  const categories = useMemo(() => getCategories(), []);

  const templates = useMemo(
    () => getTemplatesForCategory((selectedCategory ?? "cartoon") as CategoryId),
    [selectedCategory]
  );

  // Map registry data to component props
  const sidebarCategories = useMemo(
    () =>
      categories.map((c) => ({
        id: c.id,
        label: c.label,
        count: c.templateIds.length,
      })),
    [categories]
  );

  const sidebarTemplates = useMemo(
    () =>
      templates.map((t) => ({
        id: t.id,
        label: t.name,
        thumbnail: t.thumbnailSvg ?? t.id,
      })),
    [templates]
  );

  const effectiveCategory =
    selectedCategory && categories.find((c) => c.id === selectedCategory)
      ? selectedCategory
      : "cartoon";

  const effectiveTemplate =
    selectedTemplate && templates.find((t) => t.id === selectedTemplate)
      ? selectedTemplate
      : templates.length > 0
        ? templates[0].id
        : "base-a";

  return (
    <div className="flex min-h-screen flex-col bg-bg-page">
      <TopBar
        onToggleSidebar={toggleSidebar}
        onToggleControls={toggleControlPanel}
        sidebarOpen={isSidebarOpen}
        controlsOpen={isControlsOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Sidebar ── */}
        <CategorySidebar
          categories={sidebarCategories}
          templates={sidebarTemplates}
          selectedCategory={effectiveCategory}
          selectedTemplate={effectiveTemplate}
          onSelectCategory={selectCategory}
          onSelectTemplate={selectTemplate}
          isOpen={isSidebarOpen}
        />

        {/* ── Center: Canvas ── */}
        <main className="relative flex flex-1 flex-col overflow-auto">
          <CharacterCanvas
            categoryId={effectiveCategory}
            templateId={effectiveTemplate}
          />
          <CanvasControls />

          {/* Debug: render cache inspector (dev-only) */}
          {process.env.NODE_ENV !== "production" && <CacheDevTools />}
        </main>

        {/* ── Right Panel ── */}
        <ControlPanel isOpen={isControlsOpen} />
      </div>

      {/* ── Export Dialog ── */}
      <ExportDialog />

      {/* ── Onboarding Tour ── */}
      <OnboardingOverlay />
    </div>
  );
}
