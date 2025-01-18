// src/features/medications/components/PackagingSection.test.tsx
import { expect, test, describe } from "bun:test";
import { render } from "@testing-library/react";
import { PackagingSection } from "./PackagingSection";

describe("PackagingSection", () => {
  test("renders with correct title", () => {
    const packaging = ["30 tablets", "60 tablets"];
    const { container } = render(<PackagingSection packaging={packaging} />);

    const titleElement = container.querySelector(".font-semibold.leading-none.tracking-tight");
    expect(titleElement?.textContent).toBe("Available Packaging");
  });

  test("renders all packaging items", () => {
    const packaging = ["30 tablets", "60 tablets", "90 tablets"];
    const { container } = render(<PackagingSection packaging={packaging} />);

    const items = container.querySelectorAll("p.font-medium");
    expect(items.length).toBe(packaging.length);

    items.forEach((item, index) => {
      expect(item.textContent).toBe(packaging[index]);
    });
  });

  test("renders empty list when no packaging provided", () => {
    const { container } = render(<PackagingSection packaging={[]} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(0);
  });

  test("applies correct styling classes", () => {
    const packaging = ["30 tablets"];
    const { container } = render(<PackagingSection packaging={packaging} />);

    // Test card structure
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("border");
    expect(card.className).toContain("bg-card");

    // Test list styling
    const list = container.querySelector("ul");
    expect(list?.className).toContain("space-y-4");

    // Test list item styling
    const listItem = container.querySelector("li");
    expect(listItem?.className).toContain("border-b");
    expect(listItem?.className).toContain("pb-4");
  });

  test("verifies complete component structure", () => {
    const packaging = ["30 tablets"];
    const { container } = render(<PackagingSection packaging={packaging} />);

    // Verify card structure
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("rounded-xl");

    // Verify header
    const header = container.querySelector(".flex.flex-col.space-y-1\\.5.p-6");
    expect(header).toBeDefined();

    // Verify title
    const title = container.querySelector(".font-semibold.leading-none.tracking-tight");
    expect(title?.textContent).toBe("Available Packaging");

    // Verify content section
    const content = container.querySelector(".p-6.pt-0");
    expect(content).toBeDefined();

    // Verify list structure
    const list = container.querySelector("ul.space-y-4");
    expect(list).toBeDefined();
  });
});
