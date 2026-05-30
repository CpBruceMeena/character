import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUIStore } from "@/lib/stores/ui-store";

// Ensure base template definitions are registered (side-effect imports)
import "@/lib/templates/definitions/cartoon-base-a";

// Import after mocks are set up
async function loadControlPanel() {
  const mod = await import("../ControlPanel");
  return mod.ControlPanel;
}

describe("ControlPanel", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ── Tab rendering ──

  it("renders all tab buttons", async () => {
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    expect(screen.getByRole("tab", { name: /identity/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /body/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /face/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /hair/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /clothing/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /accessories/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /background/i })).toBeInTheDocument();
  });

  it("marks the active tab as selected", async () => {
    useUIStore.setState({ activeControlSection: "face" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    const faceTab = screen.getByRole("tab", { name: /face/i });
    expect(faceTab).toHaveAttribute("aria-selected", "true");
  });

  it("switches content when a tab is clicked", async () => {
    useUIStore.setState({ activeControlSection: "body" });

    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    // Body tab shows sliders
    expect(screen.getByText("Proportions")).toBeInTheDocument();

    // Click the Face tab
    const faceTab = screen.getByRole("tab", { name: /face/i });
    await userEvent.click(faceTab);

    // Face content should now be visible — template-specific controls for base-a
    expect(screen.getByText("Eye Size")).toBeInTheDocument();
    // Body content should be gone
    expect(screen.queryByText("Proportions")).not.toBeInTheDocument();
  });

  it("has correct default active tab", async () => {
    useUIStore.setState({ activeControlSection: "body" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    // Body is the default active tab
    expect(screen.getByText("Proportions")).toBeInTheDocument();
  });

  // ── Content rendering ──

  it("renders identity panel with gender and body type selects", async () => {
    useUIStore.setState({ activeControlSection: "identity" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    expect(screen.getByText("Gender Presentation")).toBeInTheDocument();
    expect(screen.getByText("Body Type")).toBeInTheDocument();
  });

  it("renders face panel with eye size slider and expression select", async () => {
    useUIStore.setState({ activeControlSection: "face" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    // Template-specific face controls for base-a
    expect(screen.getByText("Eye Size")).toBeInTheDocument();
    expect(screen.getByText("Expression")).toBeInTheDocument();
  });

  it("renders background panel with type selector", async () => {
    useUIStore.setState({ activeControlSection: "background" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    expect(screen.getByText("Background Style")).toBeInTheDocument();
    // The type select should contain checker, solid, gradient options
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
  });

  it("renders sliders for body tab controls", async () => {
    useUIStore.setState({ activeControlSection: "body" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    // Body controls: Height, Width, Head Size, Limb Proportion
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("Width")).toBeInTheDocument();
    expect(screen.getByText("Head Size")).toBeInTheDocument();
    expect(screen.getByText("Limb Proportion")).toBeInTheDocument();
  });

  // ── Visibility ──

  it("has zero width when isOpen is false", async () => {
    const ControlPanel = await loadControlPanel();
    const { container } = render(<ControlPanel isOpen={false} />);

    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    // The w-0 class is applied when closed
    expect(aside!.className).toContain("w-0");
  });

  it("has proper width when isOpen is true", async () => {
    const ControlPanel = await loadControlPanel();
    const { container } = render(<ControlPanel isOpen={true} />);

    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside!.className).toContain("w-[300px]");
  });

  it("renders toggles in accessories panel", async () => {
    useUIStore.setState({ activeControlSection: "accessories" });
    const ControlPanel = await loadControlPanel();
    render(<ControlPanel isOpen={true} />);

    // Template-specific accessory toggles for base-a template
    // Each accessory toggle has its own label
    expect(screen.getByText("Backpack")).toBeInTheDocument();

    // All accessory toggles should be rendered for base-a template
    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBe(9); // 9 accessories: backpack, scarf, necklace, earrings, glasses, mask, headband, hat, crown
  });
});
