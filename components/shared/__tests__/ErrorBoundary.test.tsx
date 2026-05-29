import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "../ErrorBoundary";

// Stub component that throws on render
function Bomb({ shouldThrow }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("💣 KABOOM");
  }
  return <div data-testid="child">All good</div>;
}

// Suppress React error logging during throw tests
function muteReactError() {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  return spy;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children normally when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Hello world</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello world");
  });

  it("catches a render error and displays the fallback UI", () => {
    const spy = muteReactError();
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    // Default fallback heading
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    // Reload button
    expect(
      screen.getByRole("button", { name: /reload page/i }),
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it("renders custom fallback instead of default when provided", () => {
    const spy = muteReactError();
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Oops!</div>}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("custom-fallback")).toHaveTextContent("Oops!");
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    spy.mockRestore();
  });

  it("reload button exists and handles click without throwing", async () => {
    const spy = muteReactError();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    const btn = screen.getByRole("button", { name: /reload page/i });

    // Clicking reload triggers setState + window.location.reload()
    // jsdom's reload is a no-op, and the Bomb re-throws so the fallback
    // stays visible. We verify the click completes without error.
    await expect(userEvent.click(btn)).resolves.toBeUndefined();

    // Fallback is still displayed (Bomb re-throws on re-render)
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    spy.mockRestore();
  });

  it("logs to console.error with the provided name", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary name="TestBoundary">
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("TestBoundary"),
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });
});
