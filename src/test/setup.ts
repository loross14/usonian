/**
 * Vitest Test Setup
 *
 * This file configures the testing environment with:
 * - @testing-library/jest-dom matchers
 * - jsdom environment cleanup
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
