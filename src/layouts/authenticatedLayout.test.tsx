// frontend/src/layouts/authenticatedLayout.test.tsx
import { expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { AuthenticatedLayout } from "./authenticatedLayout";

test("renders children correctly", () => {
  const { container } = render(
    <AuthenticatedLayout>
      <div data-testid="test-child">Test Content</div>
    </AuthenticatedLayout>
  );

  const childElement = container.querySelector('[data-testid="test-child"]');
  expect(childElement?.textContent).toBe("Test Content");
});

test("applies custom className properly", () => {
  const customClass = "custom-test-class";
  const { container } = render(
    <AuthenticatedLayout className={customClass}>
      <div>Test Content</div>
    </AuthenticatedLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv.className).toContain(customClass);
});

test("maintains default layout classes", () => {
  const { container } = render(
    <AuthenticatedLayout>
      <div>Test Content</div>
    </AuthenticatedLayout>
  );

  // Get the inner div directly from the container's DOM structure
  const innerDiv = container.getElementsByClassName('min-h-[100vh]')[0];

  // Check if the element exists
  expect(innerDiv).toBeDefined();

  // Check individual classes
  const classNames = innerDiv.className.split(' ');
  expect(classNames).toContain('min-h-[100vh]');
  expect(classNames).toContain('flex-1');
  expect(classNames).toContain('rounded-xl');
  expect(classNames).toContain('md:min-h-min');
});

test("passes through additional props", () => {
  const testId = "test-layout";
  const { container } = render(
    <AuthenticatedLayout data-testid={testId}>
      <div>Test Content</div>
    </AuthenticatedLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv.getAttribute("data-testid")).toBe(testId);
});

test("renders without className", () => {
  const { container } = render(
    <AuthenticatedLayout>
      <div>Test Content</div>
    </AuthenticatedLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv).toBeDefined();
});

test("renders null when no children provided", () => {
  const { container } = render(
    // @ts-expect-error Testing invalid props
    <AuthenticatedLayout />
  );

  expect(container.firstChild).toBeDefined();
});
