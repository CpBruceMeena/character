"use client";

import { useMemo } from "react";
import { ControlSection } from "./ControlSection";
import { SliderControl } from "./SliderControl";
import { ColorPickerControl } from "./ColorPickerControl";
import { ToggleControl } from "./ToggleControl";
import { SelectControl } from "./SelectControl";
import { useCharacterStore } from "@/lib/stores/character-store";
import { useUIStore, type ControlSection as ControlSectionType } from "@/lib/stores/ui-store";
import { getTemplate } from "@/lib/templates/registry";
import type { ControlDefinition } from "@/lib/templates/schema";

interface Tab {
  id: ControlSectionType;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  {
    id: "identity",
    label: "Identity",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "body",
    label: "Body",
    icon: "M12 4.5a3 3 0 100 6 3 3 0 000-6zM6.5 18.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5",
  },
  {
    id: "face",
    label: "Face",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zM8.5 10a1 1 0 100-2 1 1 0 000 2zM15.5 10a1 1 0 100-2 1 1 0 000 2z",
  },
  {
    id: "hair",
    label: "Hair",
    icon: "M4.5 13.5c0-4 3-7 7.5-7s7.5 3 7.5 7v2a2 2 0 01-2 2H6.5a2 2 0 01-2-2v-2z",
  },
  {
    id: "clothing",
    label: "Clothing",
    icon: "M9 3.75V6m6-2.25V6m-3-2.25a2.25 2.25 0 00-2.25 2.25v1.5M6 9.75h12M6 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25v-7.5",
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
  },
  {
    id: "background",
    label: "Background",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

interface ControlPanelProps {
  isOpen: boolean;
}

/* ── Helper: render a single template control ── */

interface ControlRendererProps {
  control: ControlDefinition;
}

/** Map control types to appropriate store actions */
function useControlDispatch(control: ControlDefinition) {
  const toggleAccessory = useCharacterStore((s) => s.toggleAccessory);
  const setOutfitColor = useCharacterStore((s) => s.setOutfitColor);
  const setGender = useCharacterStore((s) => s.setGender);
  const setBodyType = useCharacterStore((s) => s.setBodyType);
  const setHeight = useCharacterStore((s) => s.setHeight);
  const setWidth = useCharacterStore((s) => s.setWidth);
  const setHeadSize = useCharacterStore((s) => s.setHeadSize);
  const setLimbProportions = useCharacterStore((s) => s.setLimbProportions);
  const setEyeSize = useCharacterStore((s) => s.setEyeSize);
  const setExpression = useCharacterStore((s) => s.setExpression);
  const setSkinTone = useCharacterStore((s) => s.setSkinTone);
  const setHairStyle = useCharacterStore((s) => s.setHairStyle);
  const setHairColor = useCharacterStore((s) => s.setHairColor);
  const setOutfit = useCharacterStore((s) => s.setOutfit);

  return useMemo(() => {
    const path = control.targets[0];

    if (control.type === "toggle") {
      return {
        value: undefined,
        onChange: () => toggleAccessory(path),
      };
    }

    if (path.startsWith("outfitColors.")) {
      const zone = path.split(".")[1];
      return {
        value: undefined, // resolved by parent
        onChange: (v: string) => setOutfitColor(zone, v),
      };
    }

    // Map store property paths to setter actions
    switch (path) {
      case "gender": return { value: undefined, onChange: (v: string) => setGender(v as "masculine" | "feminine" | "androgynous") };
      case "bodyType": return { value: undefined, onChange: (v: string) => setBodyType(v as string) };
      case "height": return { value: undefined, onChange: (v: number) => setHeight(v) };
      case "width": return { value: undefined, onChange: (v: number) => setWidth(v) };
      case "headSize": return { value: undefined, onChange: (v: number) => setHeadSize(v) };
      case "limbProportions": return { value: undefined, onChange: (v: number) => setLimbProportions(v) };
      case "eyeSize": return { value: undefined, onChange: (v: number) => setEyeSize(v) };
      case "expression": return { value: undefined, onChange: (v: string) => setExpression(v) };
      case "skinTone": return { value: undefined, onChange: (v: string) => setSkinTone(v) };
      case "hairStyle": return { value: undefined, onChange: (v: string) => setHairStyle(v) };
      case "hairColor": return { value: undefined, onChange: (v: string) => setHairColor(v) };
      case "outfit": return { value: undefined, onChange: (v: string) => setOutfit(v) };
      default: return { value: undefined, onChange: () => {} };
    }
  }, [control, toggleAccessory, setOutfitColor, setGender, setBodyType, setHeight, setWidth, setHeadSize, setLimbProportions, setEyeSize, setExpression, setSkinTone, setHairStyle, setHairColor, setOutfit]);
}

function ControlRenderer({ control }: ControlRendererProps) {
  const store = useCharacterStore();
  const { onChange } = useControlDispatch(control);

  // Resolve the current value from the store based on the control's primary target
  const path = control.targets[0];
  let value: unknown;

  if (control.type === "toggle") {
    value = store.accessories.toggles[path] ?? false;
  } else if (path.startsWith("outfitColors.")) {
    const zone = path.split(".")[1];
    value = (store.outfitColors as Record<string, string>)[zone] ?? "#000000";
  } else {
    // Resolve dot-path from store (e.g., "outfitColors.primary")
    const parts = path.split(".");
    let v: unknown = store as unknown as Record<string, unknown>;
    for (const p of parts) {
      if (v === null || typeof v !== "object") { v = undefined; break; }
      v = (v as Record<string, unknown>)[p];
    }
    value = v;
  }

  switch (control.type) {
    case "slider":
      return (
        <SliderControl
          label={control.label}
          value={(value as number) ?? control.defaultValue as number ?? 50}
          min={control.min ?? 0}
          max={control.max ?? 100}
          step={control.step ?? 1}
          onChange={onChange as (v: number) => void}
        />
      );

    case "select":
      return (
        <SelectControl
          label={control.label}
          value={(value as string) ?? control.defaultValue as string ?? ""}
          options={control.options ?? []}
          onChange={onChange as (v: string) => void}
        />
      );

    case "color":
      return (
        <ColorPickerControl
          label={control.label}
          value={(value as string) ?? control.defaultValue as string ?? "#D4A574"}
          onChange={onChange as (v: string) => void}
        />
      );

    case "toggle":
      return (
        <ToggleControl
          label={control.label}
          checked={(value as boolean) ?? (control.defaultValue as boolean) ?? false}
          onChange={onChange as unknown as (v: boolean) => void}
        />
      );

    default:
      return null;
  }
}

/* ── Helper: group controls by a key function ── */

function groupControls(
  controls: ControlDefinition[],
  groupBy: (c: ControlDefinition) => string,
): Map<string, ControlDefinition[]> {
  const groups = new Map<string, ControlDefinition[]>();
  for (const c of controls) {
    const key = groupBy(c);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c);
  }
  return groups;
}

/* ── Main Component ── */

export function ControlPanel({ isOpen }: ControlPanelProps) {
  const activeTab = useUIStore((s) => s.activeControlSection);
  const setActiveTab = useUIStore((s) => s.setActiveControlSection);
  const templateId = useCharacterStore((s) => s.templateId);
  const template = templateId ? getTemplate(templateId) : null;

  // Universal store selectors (for universal controls like part visibility, background)
  const gender = useCharacterStore((s) => s.gender);
  const bodyType = useCharacterStore((s) => s.bodyType);
  const setGender = useCharacterStore((s) => s.setGender);
  const setBodyType = useCharacterStore((s) => s.setBodyType);

  const height = useCharacterStore((s) => s.height);
  const width = useCharacterStore((s) => s.width);
  const headSize = useCharacterStore((s) => s.headSize);
  const limbProportions = useCharacterStore((s) => s.limbProportions);
  const setHeight = useCharacterStore((s) => s.setHeight);
  const setWidth = useCharacterStore((s) => s.setWidth);
  const setHeadSize = useCharacterStore((s) => s.setHeadSize);
  const setLimbProportions = useCharacterStore((s) => s.setLimbProportions);
  const partVisibility = useCharacterStore((s) => s.partVisibility);
  const setPartVisibility = useCharacterStore((s) => s.setPartVisibility);

  // Background selectors (universal)
  const background = useCharacterStore((s) => s.background);
  const backgroundMode = useCharacterStore((s) => s.backgroundMode);
  const setBackground = useCharacterStore((s) => s.setBackground);
  const setBackgroundMode = useCharacterStore((s) => s.setBackgroundMode);

  // Render template controls with grouped sections
  // excludeLabels: skip controls whose label matches universal controls already rendered in the tab
  function renderTemplateControls(excludeLabels?: Set<string>) {
    // Get raw controls for this section, excluding any that duplicate universal controls
    const sectionControls = (
      template?.controls.filter(
        (c) => c.section === activeTab && (!excludeLabels || !excludeLabels.has(c.label))
      ) ?? []
    );
    if (sectionControls.length === 0) {
      return (
        <div className="rounded-[10px] border border-dashed border-gray-300 p-4 text-center">
          <p className="text-xs text-text-tertiary">
            No specific options for this section in the current template.
          </p>
        </div>
      );
    }

    // Re-group after filtering
    const filteredGroups = groupControls(sectionControls, (c) => c.label);

    const rendered: React.ReactNode[] = [];
    filteredGroups.forEach((controls, groupName) => {
      // If a group has exactly 1 control and its label matches the group name,
      // render directly without redundant ControlSection wrapper
      if (controls.length === 1 && controls[0].label === groupName) {
        rendered.push(<ControlRenderer key={controls[0].id} control={controls[0]} />);
      } else {
        rendered.push(
          <ControlSection key={groupName} title={groupName} defaultOpen>
            {controls.map((c) => (
              <ControlRenderer key={c.id} control={c} />
            ))}
          </ControlSection>,
        );
      }
    });
    return rendered;
  }

  return (
    <aside
      className={`flex flex-col border-l border-border bg-bg-card transition-all duration-200 ${
        isOpen ? "w-[300px] min-w-[300px]" : "w-0 min-w-0 overflow-hidden"
      }`}
    >
      {/* Tab bar — scrollable for up to 7 tabs */}
      <nav
        data-onboarding-target="controls-tabs"
        className="flex overflow-x-auto border-b border-border px-2 pt-2 scrollbar-none"
        role="tablist"
        aria-label="Character controls"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 flex-col items-center gap-1 rounded-t-[8px] px-2.5 py-2 text-[11px] font-medium transition-colors ${
                isActive
                  ? "bg-bg-page text-amber-700"
                  : "text-text-tertiary hover:bg-gray-50 hover:text-text-secondary"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              <span className="text-[10px] leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Tab panels */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Identity panel — universal controls + template-specific */}
        {activeTab === "identity" && (
          <div role="tabpanel" id="panel-identity" aria-labelledby="tab-identity" className="space-y-4">
            <ControlSection title="Gender Presentation" defaultOpen>
              <SelectControl
                label="Gender"
                value={gender}
                options={[
                  { value: "masculine", label: "Masculine" },
                  { value: "feminine", label: "Feminine" },
                  { value: "androgynous", label: "Androgynous" },
                ]}
                onChange={(v) => setGender(v as "masculine" | "feminine" | "androgynous")}
              />
            </ControlSection>
            <ControlSection title="Body Type">
              <SelectControl
                label="Build"
                value={bodyType}
                options={[
                  { value: "slim", label: "Slim" },
                  { value: "athletic", label: "Athletic" },
                  { value: "curvy", label: "Curvy" },
                  { value: "broad", label: "Broad" },
                  { value: "petite", label: "Petite" },
                ]}
                onChange={setBodyType as (v: string) => void}
              />
            </ControlSection>
            {/* Template-specific identity controls (excluding universal Gender/Build) */}
            {renderTemplateControls(new Set(["Gender", "Build"]))}
          </div>
        )}

        {/* Body panel — universal proportions + template-specific */}
        {activeTab === "body" && (
          <div role="tabpanel" id="panel-body" aria-labelledby="tab-body" className="space-y-4">
            <ControlSection title="Proportions" defaultOpen>
              <SliderControl label="Height" value={height} min={0} max={100} onChange={setHeight} />
              <SliderControl label="Width" value={width} min={0} max={100} onChange={setWidth} />
              <SliderControl label="Head Size" value={headSize} min={0} max={100} onChange={setHeadSize} />
              <SliderControl label="Limb Proportion" value={limbProportions} min={0} max={100} onChange={setLimbProportions} />
            </ControlSection>
            <ControlSection title="Part Visibility">
              <ToggleControl label="Head" checked={partVisibility["head"] ?? true} onChange={(v) => setPartVisibility("head", v)} />
              <ToggleControl label="Torso" checked={partVisibility["torso"] ?? true} onChange={(v) => setPartVisibility("torso", v)} />
              <ToggleControl label="Arms" checked={partVisibility["arms"] ?? true} onChange={(v) => setPartVisibility("arms", v)} />
              <ToggleControl label="Legs" checked={partVisibility["legs"] ?? true} onChange={(v) => setPartVisibility("legs", v)} />
            </ControlSection>
            {renderTemplateControls(new Set(["Height", "Width", "Head Size", "Limb Proportion", "Head", "Torso", "Arms", "Legs"]))}
          </div>
        )}

        {/* Face panel — template-specific */}
        {activeTab === "face" && renderTemplateControls()}

        {/* Hair panel — template-specific */}
        {activeTab === "hair" && renderTemplateControls()}

        {/* Clothing panel — template-specific */}
        {activeTab === "clothing" && renderTemplateControls()}

        {/* Accessories panel — template-specific */}
        {activeTab === "accessories" && renderTemplateControls()}

        {/* Background panel — universal */}
        {activeTab === "background" && (
          <div role="tabpanel" id="panel-background" aria-labelledby="tab-background" className="space-y-4">
            <ControlSection title="Background Style" defaultOpen>
              <SelectControl
                label="Type"
                value={backgroundMode}
                options={[
                  { value: "checker", label: "Checker (default)" },
                  { value: "solid", label: "Solid Color" },
                  { value: "gradient", label: "Gradient" },
                ]}
                onChange={(v) => setBackgroundMode(v as "checker" | "solid" | "gradient")}
              />
            </ControlSection>
            {(backgroundMode === "solid" || backgroundMode === "gradient") && (
              <ControlSection title="Colors">
                <ColorPickerControl
                  label={backgroundMode === "solid" ? "Background Color" : "Primary Color"}
                  value={background.color}
                  onChange={(c) => setBackground({ ...background, color: c })}
                />
                {backgroundMode === "gradient" && (
                  <ColorPickerControl
                    label="Secondary Color"
                    value={background.secondaryColor ?? "#cffafe"}
                    onChange={(c) => setBackground({ ...background, secondaryColor: c })}
                  />
                )}
              </ControlSection>
            )}
            {backgroundMode === "checker" && (
              <div className="rounded-[10px] border border-border bg-gray-50 p-3 text-center text-xs text-text-tertiary">
                The checkerboard pattern uses your canvas background color settings.
                Switch to <strong>Solid Color</strong> or <strong>Gradient</strong> for custom backgrounds.
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
