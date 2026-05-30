import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCharacterStore } from "@/lib/stores/character-store";

// ── Mocks ──

const mockTemplate = {
  id: "test-character",
  name: "Test Character",
  category: "cartoon" as const,
  thumbnailSvg: "",
  layers: [],
  controls: [],
};

vi.mock("@/lib/templates/registry", () => ({
  getTemplate: vi.fn((id: string) => {
    // Return null when no template is selected (empty id)
    if (!id) return null;
    return mockTemplate;
  }),
}));

vi.mock("@/lib/canvas/renderer", () => ({
  renderCharacter: vi.fn(() => Promise.resolve({} as HTMLCanvasElement)),
}));

vi.mock("@/lib/canvas/export", () => ({
  exportCharacter: vi.fn(() =>
    Promise.resolve({
      blob: new Blob(["test"], { type: "image/png" }),
      filename: "test-character.png",
      sizeBytes: 4,
      width: 600,
      height: 800,
    }),
  ),
  EXPORT_PRESETS: [
    { id: "fullbody", label: "Full Body", format: "png", width: 600, height: 800, transparent: false },
    { id: "social", label: "Social", format: "png", width: 300, height: 300, transparent: false },
    { id: "profile", label: "Profile", format: "svg", width: 200, height: 200, transparent: true },
  ],
}));

vi.mock("@/lib/utils/download", () => ({
  downloadBlob: vi.fn(),
}));

// ── Helpers ──

function openDialog() {
  useCharacterStore.setState({
    charName: "Test Hero",
    categoryId: "cartoon",
    templateId: "test-character",
  });
  useUIStore.setState({ isExportDialogOpen: true });
}

function closeDialog() {
  useUIStore.setState({ isExportDialogOpen: false });
}

// Dynamic import so mocks are applied before module loads
async function loadExportDialog() {
  const mod = await import("../ExportDialog");
  return mod.ExportDialog;
}

describe("ExportDialog", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    closeDialog();
  });

  it("does not render when closed", async () => {
    closeDialog();
    const ExportDialog = await loadExportDialog();
    const { container } = render(<ExportDialog />);
    expect(container.innerHTML).toBe("");
  });

  it("renders all three format buttons (PNG, JPEG, SVG) when open", async () => {
    openDialog();
    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    expect(screen.getByText("PNG")).toBeInTheDocument();
    expect(screen.getByText("JPEG")).toBeInTheDocument();
    expect(screen.getByText("SVG")).toBeInTheDocument();
  });

  it("renders preset buttons", async () => {
    openDialog();
    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    expect(screen.getByText("Full Body")).toBeInTheDocument();
    expect(screen.getByText("Social")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("hides scale selection when SVG format is active", async () => {
    openDialog();
    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    // Click SVG format button
    const svgBtn = screen.getByText("SVG");
    await userEvent.click(svgBtn);

    // Scale buttons (1×, 2×, 4×) should not be present
    expect(screen.queryByText("1×")).not.toBeInTheDocument();
    expect(screen.queryByText("2×")).not.toBeInTheDocument();
    expect(screen.queryByText("4×")).not.toBeInTheDocument();

    // SVG format info should appear instead
    expect(screen.getByText(/Format details/)).toBeInTheDocument();
  });

  it("shows scale buttons when PNG format is active", async () => {
    openDialog();
    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    // By default PNG is active — scale buttons should be visible
    expect(screen.getByText("1×")).toBeInTheDocument();
    expect(screen.getByText("2×")).toBeInTheDocument();
    expect(screen.getByText("4×")).toBeInTheDocument();
  });

  it("shows error when no template is selected", async () => {
    useCharacterStore.setState({
      charName: "Test Hero",
      categoryId: "cartoon",
      templateId: null,
    });
    useUIStore.setState({ isExportDialogOpen: true });

    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    // Click download
    const downloadBtn = screen.getByRole("button", { name: /download/i });
    await userEvent.click(downloadBtn);

    expect(
      screen.getByText(/no template selected/i),
    ).toBeInTheDocument();
  });

  it("closes when Cancel is clicked", async () => {
    openDialog();
    useUIStore.setState({ isExportDialogOpen: true });

    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);

    expect(useUIStore.getState().isExportDialogOpen).toBe(false);
  });

  it("renders the dialog title", async () => {
    openDialog();
    const ExportDialog = await loadExportDialog();
    render(<ExportDialog />);

    expect(screen.getByText("Export Character")).toBeInTheDocument();
  });
});
