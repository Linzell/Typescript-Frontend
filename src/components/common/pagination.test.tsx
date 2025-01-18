// src/components/common/pagination.test.tsx
import { expect, test, beforeEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { PaginationComponent } from "./pagination";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  cleanup();
});

test("renders pagination with correct number of pages", () => {
  const { container } = render(
    <PaginationComponent
      currentPage={1}
      totalPages={5}
      onPageChange={() => { }}
    />
  );

  const pageLinks = container.querySelectorAll('a[href="#"]:not([aria-label])');
  expect(pageLinks.length).toBe(5);
});

test("marks current page as active", () => {
  const { container } = render(
    <PaginationComponent
      currentPage={2}
      totalPages={5}
      onPageChange={() => { }}
    />
  );

  const activePageLink = container.querySelector('a[aria-current="page"]');
  expect(activePageLink?.textContent).toBe("2");
});

test("calls onPageChange when clicking next", async () => {
  let nextPage = 0;
  const handlePageChange = (page: number) => {
    nextPage = page;
  };

  const { container } = render(
    <PaginationComponent
      currentPage={1}
      totalPages={5}
      onPageChange={handlePageChange}
    />
  );

  const nextButton = container.querySelector('[data-testid="next-button"]');
  await userEvent.click(nextButton!);
  expect(nextPage).toBe(2);
});

test("calls onPageChange when clicking previous", async () => {
  let prevPage = 0;
  const handlePageChange = (page: number) => {
    prevPage = page;
  };

  const { container } = render(
    <PaginationComponent
      currentPage={2}
      totalPages={5}
      onPageChange={handlePageChange}
    />
  );

  const prevButton = container.querySelector('[data-testid="prev-button"]');
  await userEvent.click(prevButton!);
  expect(prevPage).toBe(1);
});

test("disables previous button on first page", () => {
  const { container } = render(
    <PaginationComponent
      currentPage={1}
      totalPages={5}
      onPageChange={() => { }}
    />
  );

  const prevButton = container.querySelector('[data-testid="prev-button"]');
  expect(prevButton?.getAttribute("aria-disabled")).toBe("true");
});

test("disables next button on last page", () => {
  const { container } = render(
    <PaginationComponent
      currentPage={5}
      totalPages={5}
      onPageChange={() => { }}
    />
  );

  const nextButton = container.querySelector('[data-testid="next-button"]');
  expect(nextButton?.getAttribute("aria-disabled")).toBe("true");
});
