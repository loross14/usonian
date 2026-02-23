/**
 * HeroFilter Component Tests
 *
 * NOTE: This project uses Vitest but does not have @testing-library/react installed.
 * To run these tests, install the required dependencies:
 *
 *   npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom
 *
 * And update vitest.config.ts to use jsdom environment:
 *
 *   test: {
 *     environment: 'jsdom',  // Change from 'node' to 'jsdom'
 *     ...
 *   }
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { HeroFilter, formatArchitectName, truncateLabel } from "./HeroFilter";
import type { ExperienceFilter } from "@/types";

// Mock ViewToggle component
vi.mock("./ViewToggle", () => ({
  ViewToggle: ({
    view,
    onChange,
    className,
  }: {
    view: string;
    onChange: (view: "list" | "grid") => void;
    className?: string;
  }) => (
    <div data-testid="view-toggle" className={className}>
      <button onClick={() => onChange("grid")}>GRID</button>
      <button onClick={() => onChange("list")}>LIST</button>
      <span data-testid="current-view">{view}</span>
    </div>
  ),
}));

// Default props factory
const createDefaultProps = (overrides = {}) => ({
  currentStatus: "all" as ExperienceFilter,
  onStatusChange: vi.fn(),
  view: "grid" as "list" | "grid",
  onViewChange: vi.fn(),
  currentArchitect: null as string | null,
  architectOptions: [
    { id: "arch-1", name: "Frank Lloyd Wright" },
    { id: "arch-2", name: "Richard Neutra" },
    { id: "arch-3", name: "John Lautner" },
  ],
  onArchitectChange: vi.fn(),
  currentState: null as string | null,
  stateOptions: ["California", "Arizona", "New York", "Illinois"],
  onStateChange: vi.fn(),
  ...overrides,
});

describe("HeroFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // ============================================
  // NAME FORMATTING TESTS
  // ============================================
  describe("Name Formatting", () => {
    it("formats multi-word names as first initial + last word", () => {
      expect(formatArchitectName("Frank Lloyd Wright")).toBe("F. Wright");
      expect(formatArchitectName("Richard Neutra")).toBe("R. Neutra");
      expect(formatArchitectName("John Lautner")).toBe("J. Lautner");
    });

    it("returns single-word names unchanged", () => {
      expect(formatArchitectName("Neutra")).toBe("Neutra");
    });

    it("handles extra whitespace", () => {
      expect(formatArchitectName("  Frank  Lloyd   Wright  ")).toBe("F. Wright");
    });
  });

  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders all 5 experience tabs (ALL, BUY, VISIT, STAY, OFF-MARKET)", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      // The tabs use shortLabels: ALL, BUY, VISIT, STAY, OFF
      expect(screen.getByRole("tab", { name: /ALL/i })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /BUY/i })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /VISIT/i })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /STAY/i })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /OFF/i })).toBeInTheDocument();
    });

    it("renders architect dropdown with label", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      // The dropdown should display "ARCHITECT" when no value is selected
      expect(screen.getByText("ARCHITECT")).toBeInTheDocument();
    });

    it("renders state dropdown with label", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      // The dropdown should display "STATE" when no value is selected
      expect(screen.getByText("STATE")).toBeInTheDocument();
    });

    it("renders architect dropdown with options when opened", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      // Click the architect dropdown button to open it
      const architectButton = screen.getByText("ARCHITECT");
      fireEvent.click(architectButton);

      // Check that options are rendered (names are formatted as first initial + last name)
      expect(screen.getByText("ALL ARCHITECT")).toBeInTheDocument();
      expect(screen.getByText("F. Wright")).toBeInTheDocument();
      expect(screen.getByText("R. Neutra")).toBeInTheDocument();
      expect(screen.getByText("J. Lautner")).toBeInTheDocument();
    });

    it("renders state dropdown with options when opened", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      // Click the state dropdown button to open it
      const stateButton = screen.getByText("STATE");
      fireEvent.click(stateButton);

      // Check that options are rendered
      expect(screen.getByText("ALL STATE")).toBeInTheDocument();
      expect(screen.getByText("California")).toBeInTheDocument();
      expect(screen.getByText("Arizona")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Illinois")).toBeInTheDocument();
    });

    it("active tab has correct 'active' class", () => {
      const props = createDefaultProps({ currentStatus: "sale" });
      render(<HeroFilter {...props} />);

      // Find the BUY tab (sale maps to BUY)
      const buyTab = screen.getByRole("tab", { name: /BUY/i });
      expect(buyTab).toHaveClass("active");

      // Other tabs should not have active class
      const allTab = screen.getByRole("tab", { name: /^ALL$/i });
      expect(allTab).not.toHaveClass("active");
    });

    it("active tab has aria-selected=true", () => {
      const props = createDefaultProps({ currentStatus: "visit" });
      render(<HeroFilter {...props} />);

      const visitTab = screen.getByRole("tab", { name: /VISIT/i });
      expect(visitTab).toHaveAttribute("aria-selected", "true");

      const allTab = screen.getByRole("tab", { name: /^ALL$/i });
      expect(allTab).toHaveAttribute("aria-selected", "false");
    });

    it("renders with expanded class by default", () => {
      const props = createDefaultProps();
      const { container } = render(<HeroFilter {...props} />);

      const filterElement = container.querySelector(".hero-filter");
      expect(filterElement).toHaveClass("hero-filter--expanded");
    });
  });

  // ============================================
  // INTERACTION TESTS
  // ============================================
  describe("Interactions", () => {
    it("clicking a tab calls onStatusChange with correct value", () => {
      const onStatusChange = vi.fn();
      const props = createDefaultProps({ onStatusChange });
      render(<HeroFilter {...props} />);

      // Click the BUY tab
      fireEvent.click(screen.getByRole("tab", { name: /BUY/i }));
      expect(onStatusChange).toHaveBeenCalledWith("sale");

      // Click the VISIT tab
      fireEvent.click(screen.getByRole("tab", { name: /VISIT/i }));
      expect(onStatusChange).toHaveBeenCalledWith("visit");

      // Click the STAY tab
      fireEvent.click(screen.getByRole("tab", { name: /STAY/i }));
      expect(onStatusChange).toHaveBeenCalledWith("stay");

      // Click the OFF tab
      fireEvent.click(screen.getByRole("tab", { name: /OFF/i }));
      expect(onStatusChange).toHaveBeenCalledWith("offmarket");
    });

    it("selecting architect calls onArchitectChange with correct id", () => {
      const onArchitectChange = vi.fn();
      const props = createDefaultProps({ onArchitectChange });
      render(<HeroFilter {...props} />);

      // Open the architect dropdown
      fireEvent.click(screen.getByText("ARCHITECT"));

      // Select an architect (names are formatted as first initial + last name)
      fireEvent.click(screen.getByText("F. Wright"));
      expect(onArchitectChange).toHaveBeenCalledWith("arch-1");
    });

    it("selecting 'ALL ARCHITECT' calls onArchitectChange with null", () => {
      const onArchitectChange = vi.fn();
      const props = createDefaultProps({
        onArchitectChange,
        currentArchitect: "arch-1",
      });
      const { container } = render(<HeroFilter {...props} />);

      // Find and click the architect dropdown button (first dropdown)
      const dropdownBtns = container.querySelectorAll(".hero-dropdown-btn");
      fireEvent.click(dropdownBtns[0]);

      // Select ALL ARCHITECT
      fireEvent.click(screen.getByText("ALL ARCHITECT"));
      expect(onArchitectChange).toHaveBeenCalledWith(null);
    });

    it("selecting state calls onStateChange with correct value", () => {
      const onStateChange = vi.fn();
      const props = createDefaultProps({ onStateChange });
      render(<HeroFilter {...props} />);

      // Open the state dropdown
      fireEvent.click(screen.getByText("STATE"));

      // Select a state
      fireEvent.click(screen.getByText("California"));
      expect(onStateChange).toHaveBeenCalledWith("California");
    });

    it("selecting 'ALL STATE' calls onStateChange with null", () => {
      const onStateChange = vi.fn();
      const props = createDefaultProps({
        onStateChange,
        currentState: "California",
      });
      const { container } = render(<HeroFilter {...props} />);

      // Find and click the state dropdown button
      const dropdownBtns = container.querySelectorAll(".hero-dropdown-btn");
      fireEvent.click(dropdownBtns[1]); // Second dropdown is state

      // Select ALL STATE
      fireEvent.click(screen.getByText("ALL STATE"));
      expect(onStateChange).toHaveBeenCalledWith(null);
    });

    it("clicking all experience tabs in sequence works correctly", () => {
      const onStatusChange = vi.fn();
      const props = createDefaultProps({ onStatusChange });
      render(<HeroFilter {...props} />);

      const tabsAndValues = [
        { label: /^ALL$/i, value: "all" },
        { label: /BUY/i, value: "sale" },
        { label: /VISIT/i, value: "visit" },
        { label: /STAY/i, value: "stay" },
        { label: /OFF/i, value: "offmarket" },
      ];

      tabsAndValues.forEach(({ label, value }) => {
        fireEvent.click(screen.getByRole("tab", { name: label }));
        expect(onStatusChange).toHaveBeenCalledWith(value);
      });

      expect(onStatusChange).toHaveBeenCalledTimes(5);
    });
  });

  // ============================================
  // EDGE CASE TESTS
  // ============================================
  describe("Edge Cases", () => {
    it("long architect names are formatted then truncated if still > 14 chars", () => {
      const props = createDefaultProps({
        currentArchitect: "arch-long",
        architectOptions: [
          {
            id: "arch-long",
            // This name becomes "A. VeryLongLastNameHere" after formatting (23 chars)
            // Then truncated to "A. VeryLongLas..." (14 chars + ...)
            name: "Alexander VeryLongLastNameHere",
          },
        ],
      });
      const { container } = render(<HeroFilter {...props} />);

      // Name is first formatted (F. Lastname), then truncated if > 14 chars
      // "Alexander VeryLongLastNameHere" → "A. VeryLongLastNameHere" (23 chars) → "A. VeryLongLas..."
      const dropdownLabel = container.querySelector(".hero-dropdown-label");
      expect(dropdownLabel?.textContent).toBe("A. VeryLongLas...");
    });

    it("architect names exactly 14 characters are not truncated", () => {
      const props = createDefaultProps({
        currentArchitect: "arch-exact",
        architectOptions: [{ id: "arch-exact", name: "ExactlyFourtn" }], // 13 chars
      });
      const { container } = render(<HeroFilter {...props} />);

      const dropdownLabels = container.querySelectorAll(".hero-dropdown-label");
      expect(dropdownLabels[0]?.textContent).toBe("ExactlyFourtn");
    });

    it("architect names with 14 characters show without truncation", () => {
      const props = createDefaultProps({
        currentArchitect: "arch-14",
        architectOptions: [{ id: "arch-14", name: "Exactly14Chars" }], // 14 chars
      });
      const { container } = render(<HeroFilter {...props} />);

      const dropdownLabels = container.querySelectorAll(".hero-dropdown-label");
      expect(dropdownLabels[0]?.textContent).toBe("Exactly14Chars");
    });

    it("clicking outside dropdown closes it", async () => {
      const props = createDefaultProps();
      const { container } = render(<HeroFilter {...props} />);

      // Open the architect dropdown
      fireEvent.click(screen.getByText("ARCHITECT"));

      // Verify dropdown is open
      expect(screen.getByText("ALL ARCHITECT")).toBeInTheDocument();

      // Click outside (on the main container)
      fireEvent.mouseDown(document.body);

      // The dropdown menu should no longer be visible
      // Wait for the effect to close the dropdown
      expect(screen.queryByText("ALL ARCHITECT")).not.toBeInTheDocument();
    });

    it("clicking inside dropdown does not close it", () => {
      const props = createDefaultProps();
      const { container } = render(<HeroFilter {...props} />);

      // Open the architect dropdown
      fireEvent.click(screen.getByText("ARCHITECT"));

      // Click on the dropdown menu (but not on an option)
      const dropdownMenu = container.querySelector(".hero-dropdown-menu");
      if (dropdownMenu) {
        fireEvent.mouseDown(dropdownMenu);
      }

      // Dropdown should still be open
      expect(screen.getByText("ALL ARCHITECT")).toBeInTheDocument();
    });

    it("empty architect options array renders dropdown without options", () => {
      const props = createDefaultProps({ architectOptions: [] });
      const { container } = render(<HeroFilter {...props} />);

      // Open the architect dropdown
      fireEvent.click(screen.getByText("ARCHITECT"));

      // Should still show the "ALL ARCHITECT" option
      expect(screen.getByText("ALL ARCHITECT")).toBeInTheDocument();

      // Should not have any other architect options
      const dropdownItems = container.querySelectorAll(".hero-dropdown-item");
      expect(dropdownItems.length).toBe(1); // Only "ALL ARCHITECT"
    });

    it("empty state options array renders dropdown without options", () => {
      const props = createDefaultProps({ stateOptions: [] });
      const { container } = render(<HeroFilter {...props} />);

      // Open the state dropdown
      fireEvent.click(screen.getByText("STATE"));

      // Should still show the "ALL STATE" option
      expect(screen.getByText("ALL STATE")).toBeInTheDocument();

      // Count dropdown items - should only be 2 total dropdowns, state has 1 item
      const stateDropdown = container.querySelectorAll(".hero-dropdown")[1];
      const stateItems = stateDropdown?.querySelectorAll(".hero-dropdown-item");
      expect(stateItems?.length).toBe(1); // Only "ALL STATE"
    });

    it("dropdown button shows 'has-value' class when value is selected", () => {
      const props = createDefaultProps({ currentArchitect: "arch-1" });
      const { container } = render(<HeroFilter {...props} />);

      const architectDropdownBtn = container.querySelectorAll(
        ".hero-dropdown-btn"
      )[0];
      expect(architectDropdownBtn).toHaveClass("has-value");
    });

    it("dropdown button does not show 'has-value' class when no value selected", () => {
      const props = createDefaultProps({ currentArchitect: null });
      const { container } = render(<HeroFilter {...props} />);

      const architectDropdownBtn = container.querySelectorAll(
        ".hero-dropdown-btn"
      )[0];
      expect(architectDropdownBtn).not.toHaveClass("has-value");
    });

    it("selected option in dropdown menu has 'selected' class", () => {
      const props = createDefaultProps({ currentArchitect: "arch-2" });
      const { container } = render(<HeroFilter {...props} />);

      // Open architect dropdown
      const architectDropdownBtn = container.querySelectorAll(
        ".hero-dropdown-btn"
      )[0];
      fireEvent.click(architectDropdownBtn);

      // Find the selected item in the dropdown menu (has .selected class)
      const selectedItem = container.querySelector(
        ".hero-dropdown-item.selected"
      );
      expect(selectedItem).toBeInTheDocument();
      expect(selectedItem?.textContent).toBe("R. Neutra");
    });

    it("chevron icon has 'open' class when dropdown is open", () => {
      const props = createDefaultProps();
      const { container } = render(<HeroFilter {...props} />);

      // Initially closed
      let chevron = container.querySelector(".hero-dropdown-chevron");
      expect(chevron).not.toHaveClass("open");

      // Open the architect dropdown
      fireEvent.click(screen.getByText("ARCHITECT"));

      // Now check if chevron has open class
      chevron = container.querySelectorAll(".hero-dropdown-chevron")[0];
      expect(chevron).toHaveClass("open");
    });
  });

  // ============================================
  // INTEGRATION-LIKE TESTS
  // ============================================
  describe("Component Integration", () => {
    it("changing filters in sequence maintains correct state", () => {
      const onStatusChange = vi.fn();
      const onArchitectChange = vi.fn();
      const onStateChange = vi.fn();

      const props = createDefaultProps({
        onStatusChange,
        onArchitectChange,
        onStateChange,
      });

      const { container } = render(<HeroFilter {...props} />);

      // 1. Click BUY tab
      fireEvent.click(screen.getByRole("tab", { name: /BUY/i }));
      expect(onStatusChange).toHaveBeenCalledWith("sale");

      // 2. Select an architect (names are formatted as first initial + last name)
      fireEvent.click(screen.getByText("ARCHITECT"));
      fireEvent.click(screen.getByText("F. Wright"));
      expect(onArchitectChange).toHaveBeenCalledWith("arch-1");

      // 3. Select a state
      fireEvent.click(screen.getByText("STATE"));
      fireEvent.click(screen.getByText("California"));
      expect(onStateChange).toHaveBeenCalledWith("California");

      // All callbacks should have been called once
      expect(onStatusChange).toHaveBeenCalledTimes(1);
      expect(onArchitectChange).toHaveBeenCalledTimes(1);
      expect(onStateChange).toHaveBeenCalledTimes(1);
    });

    it("renders ViewToggle component", () => {
      const props = createDefaultProps();
      render(<HeroFilter {...props} />);

      expect(screen.getByTestId("view-toggle")).toBeInTheDocument();
    });

    it("displays correct view in ViewToggle", () => {
      const props = createDefaultProps({ view: "list" });
      render(<HeroFilter {...props} />);

      expect(screen.getByTestId("current-view")).toHaveTextContent("list");
    });
  });
});
