"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shared/Button";
import { IconButton } from "@/components/shared/IconButton";
import {
  useCharacterStore,
  undo,
  redo,
  getTemporalState,
} from "@/lib/stores/character-store";
import { useUIStore } from "@/lib/stores/ui-store";

interface TopBarProps {
  onToggleSidebar: () => void;
  onToggleControls: () => void;
  sidebarOpen: boolean;
  controlsOpen: boolean;
}

export function TopBar({
  onToggleSidebar,
  onToggleControls,
  sidebarOpen,
  controlsOpen,
}: TopBarProps) {
  const charName = useCharacterStore((s) => s.charName);
  const setName = useCharacterStore((s) => s.setName);
  const randomize = useCharacterStore((s) => s.randomize);
  const reset = useCharacterStore((s) => s.reset);
  const toggleExportDialog = useUIStore((s) => s.toggleExportDialog);

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(charName);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Subscribe to temporal store for undo/redo availability
  useEffect(() => {
    const update = () => {
      const ts = getTemporalState();
      setCanUndo(ts.pastStates.length > 0);
      setCanRedo(ts.futureStates.length > 0);
    };
    update();
    const unsub = (useCharacterStore as any).temporal.subscribe(update);
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-card/90 px-3 py-2 backdrop-blur-md sm:px-4">
      <div className="flex items-center justify-between gap-2">
        {/* Left: logo + toggle buttons */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="hidden font-[family-name:var(--font-display-fredoka)] text-base font-semibold text-amber-700 sm:inline"
          >
            CharacterForge Pro
          </a>

          {/* Sidebar toggle */}
          <IconButton
            label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={onToggleSidebar}
            className="hidden lg:flex"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              )}
            </svg>
          </IconButton>
        </div>

        {/* Center: character name */}
        <div className="flex items-center gap-2">
          {editing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => {
                setName(editValue);
                setEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setName(editValue);
                  setEditing(false);
                }
              }}
              className="max-w-[180px] rounded-[6px] border border-amber-300 bg-amber-50 px-2 py-1 text-sm font-medium text-amber-900 outline-none focus:ring-2 focus:ring-amber-400 sm:max-w-[240px]"
              autoFocus
            />
          ) : (
            <button
              onClick={() => {
                setEditValue(charName);
                setEditing(true);
              }}
              className="group flex items-center gap-1.5 rounded-[6px] px-2 py-1 text-sm font-medium text-text-primary transition-colors hover:bg-gray-100"
              aria-label="Edit character name"
            >
              <span className="truncate max-w-[160px] sm:max-w-[220px]">
                {charName}
              </span>
              <svg
                className="h-3.5 w-3.5 shrink-0 text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop action buttons */}
          <div className="hidden items-center gap-1 sm:flex">
            <IconButton
              label="Undo (⌘Z)"
              onClick={undo}
              disabled={!canUndo}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </IconButton>

            <IconButton
              label="Redo (⌘⇧Z)"
              onClick={redo}
              disabled={!canRedo}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
              </svg>
            </IconButton>

            <div className="mx-1 h-5 w-px bg-border" />

            <IconButton label="Randomize character" onClick={randomize}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </IconButton>

            <IconButton label="Reset character" onClick={reset}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>

          {/* Controls toggle (mobile/tablet) */}
          <IconButton
            label={controlsOpen ? "Hide controls" : "Show controls"}
            onClick={onToggleControls}
            className="lg:hidden"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </IconButton>

          {/* Export CTA */}
          <Button
            variant="coral"
            size="sm"
            className="whitespace-nowrap"
            onClick={toggleExportDialog}
          >
            Export
            <svg
              className="ml-1 h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
