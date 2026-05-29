"use client";

import { ControlSection } from "./ControlSection";
import { SliderControl } from "./SliderControl";
import { ColorPickerControl } from "./ColorPickerControl";
import { ToggleControl } from "./ToggleControl";
import { SelectControl } from "./SelectControl";
import { useCharacterStore } from "@/lib/stores/character-store";
import { useUIStore, type ControlSection as ControlSectionType } from "@/lib/stores/ui-store";

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

export function ControlPanel({ isOpen }: ControlPanelProps) {
  const activeTab = useUIStore((s) => s.activeControlSection);
  const setActiveTab = useUIStore((s) => s.setActiveControlSection);

  // Character store selectors
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
  const setPartVisibility = useCharacterStore((s) => s.setPartVisibility);

  const eyeSize = useCharacterStore((s) => s.eyeSize);
  const expression = useCharacterStore((s) => s.expression);
  const skinTone = useCharacterStore((s) => s.skinTone);
  const setEyeSize = useCharacterStore((s) => s.setEyeSize);
  const setExpression = useCharacterStore((s) => s.setExpression);
  const setSkinTone = useCharacterStore((s) => s.setSkinTone);

  const hairStyle = useCharacterStore((s) => s.hairStyle);
  const hairColor = useCharacterStore((s) => s.hairColor);
  const setHairStyle = useCharacterStore((s) => s.setHairStyle);
  const setHairColor = useCharacterStore((s) => s.setHairColor);

  const outfit = useCharacterStore((s) => s.outfit);
  const outfitColors = useCharacterStore((s) => s.outfitColors);
  const setOutfit = useCharacterStore((s) => s.setOutfit);
  const setOutfitColor = useCharacterStore((s) => s.setOutfitColor);

  const toggleAccessory = useCharacterStore((s) => s.toggleAccessory);

  // Background selectors
  const background = useCharacterStore((s) => s.background);
  const backgroundMode = useCharacterStore((s) => s.backgroundMode);
  const setBackground = useCharacterStore((s) => s.setBackground);
  const setBackgroundMode = useCharacterStore((s) => s.setBackgroundMode);

  return (
    <aside
      className={`flex flex-col border-l border-border bg-bg-card transition-all duration-200 ${
        isOpen ? "w-[300px] min-w-[300px]" : "w-0 min-w-0 overflow-hidden"
      }`}
    >
      {/* Tab bar */}
      <nav
        data-onboarding-target="controls-tabs"
        className="flex border-b border-border px-2 pt-2"
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
              className={`flex flex-1 flex-col items-center gap-1 rounded-t-[8px] px-1 py-2 text-[11px] font-medium transition-colors ${
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
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Tab panels */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Identity panel */}
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
          </div>
        )}

        {/* Body panel */}
        {activeTab === "body" && (
          <div role="tabpanel" id="panel-body" aria-labelledby="tab-body" className="space-y-4">
            <ControlSection title="Proportions" defaultOpen>
              <SliderControl label="Height" value={height} min={0} max={100} onChange={setHeight} />
              <SliderControl label="Width" value={width} min={0} max={100} onChange={setWidth} />
              <SliderControl label="Head Size" value={headSize} min={0} max={100} onChange={setHeadSize} />
              <SliderControl label="Limb Proportion" value={limbProportions} min={0} max={100} onChange={setLimbProportions} />
            </ControlSection>
            <ControlSection title="Part Visibility">
              <ToggleControl label="Head" defaultChecked onChange={(v) => setPartVisibility("head", v)} />
              <ToggleControl label="Torso" defaultChecked onChange={(v) => setPartVisibility("torso", v)} />
              <ToggleControl label="Arms" defaultChecked onChange={(v) => setPartVisibility("arms", v)} />
              <ToggleControl label="Legs" defaultChecked onChange={(v) => setPartVisibility("legs", v)} />
            </ControlSection>
          </div>
        )}

        {/* Face panel */}
        {activeTab === "face" && (
          <div role="tabpanel" id="panel-face" aria-labelledby="tab-face" className="space-y-4">
            <ControlSection title="Facial Features" defaultOpen>
              <SliderControl label="Eye Size" value={eyeSize} min={20} max={100} onChange={setEyeSize} />
              <SelectControl
                label="Expression"
                value={expression}
                options={[
                  { value: "neutral", label: "Neutral" },
                  { value: "happy", label: "Happy" },
                  { value: "serious", label: "Serious" },
                  { value: "surprised", label: "Surprised" },
                  { value: "sad", label: "Sad" },
                ]}
                onChange={setExpression}
              />
            </ControlSection>
            <ControlSection title="Skin Tone">
              <ColorPickerControl label="Skin Color" value={skinTone} onChange={setSkinTone} />
            </ControlSection>
          </div>
        )}

        {/* Hair panel */}
        {activeTab === "hair" && (
          <div role="tabpanel" id="panel-hair" aria-labelledby="tab-hair" className="space-y-4">
            <ControlSection title="Hair Style" defaultOpen>
              <SelectControl
                label="Style"
                value={hairStyle}
                options={[
                  { value: "short", label: "Short" },
                  { value: "long", label: "Long" },
                  { value: "curly", label: "Curly" },
                  { value: "wavy", label: "Wavy" },
                  { value: "bald", label: "Bald" },
                  { value: "ponytail", label: "Ponytail" },
                  { value: "bun", label: "Bun" },
                ]}
                onChange={setHairStyle}
              />
            </ControlSection>
            <ControlSection title="Hair Color">
              <ColorPickerControl label="Hair Color" value={hairColor} onChange={setHairColor} />
            </ControlSection>
          </div>
        )}

        {/* Clothing panel */}
        {activeTab === "clothing" && (
          <div role="tabpanel" id="panel-clothing" aria-labelledby="tab-clothing" className="space-y-4">
            <ControlSection title="Outfit" defaultOpen>
              <SelectControl
                label="Style"
                value={outfit}
                options={[
                  { value: "casual", label: "Casual" },
                  { value: "formal", label: "Formal" },
                  { value: "sporty", label: "Sporty" },
                  { value: "armor", label: "Armor" },
                  { value: "robe", label: "Robe" },
                ]}
                onChange={setOutfit}
              />
            </ControlSection>
            <ControlSection title="Outfit Colors">
              <ColorPickerControl label="Primary" value={outfitColors.primary} onChange={(c) => setOutfitColor("primary", c)} />
              <ColorPickerControl label="Secondary" value={outfitColors.secondary} onChange={(c) => setOutfitColor("secondary", c)} />
              <ColorPickerControl label="Accent" value={outfitColors.accent} onChange={(c) => setOutfitColor("accent", c)} />
            </ControlSection>
          </div>
        )}

        {/* Accessories panel */}
        {activeTab === "accessories" && (
          <div role="tabpanel" id="panel-accessories" aria-labelledby="tab-accessories" className="space-y-4">
            <ControlSection title="Headwear" defaultOpen>
              <ToggleControl label="Hat" onChange={() => toggleAccessory("hat")} />
              <ToggleControl label="Crown" onChange={() => toggleAccessory("crown")} />
              <ToggleControl label="Headband" onChange={() => toggleAccessory("headband")} />
            </ControlSection>
            <ControlSection title="Face">
              <ToggleControl label="Glasses" onChange={() => toggleAccessory("glasses")} />
              <ToggleControl label="Earrings" onChange={() => toggleAccessory("earrings")} />
              <ToggleControl label="Mask" onChange={() => toggleAccessory("mask")} />
            </ControlSection>
            <ControlSection title="Extras">
              <ToggleControl label="Scarf" onChange={() => toggleAccessory("scarf")} />
              <ToggleControl label="Necklace" onChange={() => toggleAccessory("necklace")} />
              <ToggleControl label="Backpack" onChange={() => toggleAccessory("backpack")} />
            </ControlSection>
          </div>
        )}

        {/* Background panel */}
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
