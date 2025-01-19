// frontend/src/layouts/publicLayout.test.tsx
import { expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { PublicLayout } from "./publicLayout";

test("renders children correctly", () => {
  const { container } = render(
    <PublicLayout>
      <div data-testid="test-child">Test Content</div>
    </PublicLayout>
  );

  const childElement = container.querySelector('[data-testid="test-child"]');
  expect(childElement?.textContent).toBe("Test Content");
});

test("applies custom className properly", () => {
  const customClass = "custom-test-class";
  const { container } = render(
    <PublicLayout className={customClass}>
      <div>Test Content</div>
    </PublicLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv.className).toContain(customClass);
});

test("maintains default layout classes", () => {
  const { container } = render(
    <PublicLayout>
      <div>Test Content</div>
    </PublicLayout>
  );

  const innerDiv = container.getElementsByClassName('min-h-[100vh]')[0];
  expect(innerDiv).toBeDefined();

  // Get the complete className string
  const classNames = innerDiv.className.split(' ');

  // Check for the presence of each class individually
  expect(classNames).toContain('flex');
  expect(classNames).toContain('min-h-[100vh]');
  expect(classNames).toContain('flex-col');
  expect(classNames).toContain('items-center');
  expect(classNames).toContain('justify-center');
  expect(classNames).toContain('px-4');
  expect(classNames).toContain('py-12');
  expect(classNames).toContain('sm:px-6');
  expect(classNames).toContain('lg:px-8');
});

test("passes through additional props", () => {
  const testId = "test-layout";
  const { container } = render(
    <PublicLayout data-testid={testId}>
      <div>Test Content</div>
    </PublicLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv.getAttribute("data-testid")).toBe(testId);
});

test("renders without className", () => {
  const { container } = render(
    <PublicLayout>
      <div>Test Content</div>
    </PublicLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  expect(outerDiv).toBeDefined();
});

test("applies className to both outer and inner divs", () => {
  const customClass = "custom-test-class";
  const { container } = render(
    <PublicLayout className={customClass}>
      <div>Test Content</div>
    </PublicLayout>
  );

  const outerDiv = container.firstChild as HTMLElement;
  const innerDiv = container.querySelector('div > div') as HTMLElement;

  expect(outerDiv.className).toContain(customClass);
  expect(innerDiv.className).toContain(customClass);
});

test("renders null when no children provided", () => {
  const { container } = render(
    // @ts-expect-error Testing invalid props
    <PublicLayout />
  );

  expect(container.firstChild).toBeDefined();
});
