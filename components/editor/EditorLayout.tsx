"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { TopBar } from "./TopBar";
import { CategorySidebar } from "./CategorySidebar";
import { CharacterCanvas } from "@/components/canvas/CharacterCanvas";
import { CanvasControls } from "@/components/canvas/CanvasControls";
import { CacheDevTools } from "@/components/debug/CacheDevTools";
import { ControlPanel } from "./ControlPanel";
import { ExportDialog } from "./ExportDialog";
import { useCharacterStore, hydrateFromStorage } from "@/lib/stores/character-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { getCategories, getTemplatesForCategory } from "@/lib/templates/registry";
import { useOnboarding } from "@/lib/utils/use-onboarding";
import { OnboardingTooltip } from "./OnboardingTooltip";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { UrlStateSync } from "@/lib/utils/use-url-sharing";
import type { CategoryId } from "@/lib/templates/schema";

// Static imports ensure template definitions are registered at module load
import "@/lib/templates/definitions/cartoon-base-a";
import "@/lib/templates/definitions/cartoon-pet";
import "@/lib/templates/definitions/fantasy-knight";
import "@/lib/templates/definitions/fantasy-elf";
import "@/lib/templates/definitions/sci-fi-armor";
import "@/lib/templates/definitions/sci-fi-cyborg";
import "@/lib/templates/definitions/steampunk-explorer";
import "@/lib/templates/definitions/modern-casual";
import "@/lib/templates/definitions/victorian-gentleman";

// Init persistence on the client
import { initPersistence } from "@/lib/stores/character-store";

function OnboardingOverlay() {
  const { isActive, currentStep, step, totalSteps, next, dismiss } =
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
  // Initialize — hydrate from localStorage then subscribe to persistent saves
  useEffect(() => {
    hydrateFromStorage();
    initPersistence();
  }, []);

  const searchParams = useSearchParams();

  const selectedCategory = useCharacterStore((s) => s.categoryId);
  const selectedTemplate = useCharacterStore((s) => s.templateId);
  const selectCategory = useCharacterStore((s) => s.selectCategory);
  const selectTemplate = useCharacterStore((s) => s.selectTemplate);

  // When a template param is in the URL (e.g. from gallery), auto-select it atomically
  useEffect(() => {
    const templateParam = searchParams.get("template");
    if (!templateParam) return;
    // Find which category this template belongs to
    const allTemplates = getCategories()
      .flatMap((c) => c.templateIds.map((tid) => ({ tid, catId: c.id })));
    const match = allTemplates.find((t) => t.tid === templateParam);
    if (match && templateParam !== selectedTemplate) {
      // Batch both updates atomically — avoids briefly resetting templateId to null
      useCharacterStore.setState({
        categoryId: match.catId,
        templateId: templateParam,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only: reads URL once on page load
  }, []); // only on mount

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
        : "cartoon-base-a";

  return (
    <ErrorBoundary name="EditorLayout">
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
          <ErrorBoundary name="CharacterCanvas">
            <CharacterCanvas
              categoryId={effectiveCategory}
              templateId={effectiveTemplate}
            />
          </ErrorBoundary>
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

      {/* ── URL State Sync (invisible) ── */}
      <UrlStateSync />
      </div>
    </ErrorBoundary>
  );
}
