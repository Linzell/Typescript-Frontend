// frontend/src/lib/utils.test.ts
import { expect, test, describe } from "bun:test";
import { cn } from "./utils";

describe("cn (className merger utility)", () => {
  test("combines multiple class strings", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  test("handles undefined and null values", () => {
    const result = cn("class1", undefined, "class2", null, "class3");
    expect(result).toBe("class1 class2 class3");
  });

  test("merges Tailwind classes correctly", () => {
    const result = cn(
      "px-2 py-1",
      "px-4",
      "bg-blue-500",
      "hover:bg-blue-600"
    );
    expect(result).toBe("py-1 px-4 bg-blue-500 hover:bg-blue-600");
  });

  test("handles conditional classes", () => {
    const isActive = true;
    const isPrimary = false;

    const result = cn(
      "base-class",
      isActive && "active",
      isPrimary && "primary"
    );
    expect(result).toBe("base-class active");
  });

  test("properly merges conflicting Tailwind classes", () => {
    const result = cn(
      "text-sm text-gray-500",
      "text-lg text-blue-500"
    );
    expect(result).toBe("text-lg text-blue-500");
  });

  test("handles array of classes", () => {
    const result = cn([
      "class1",
      "class2",
      { "class3": true, "class4": false }
    ]);
    expect(result).toBe("class1 class2 class3");
  });

  test("handles complex conditional object", () => {
    const result = cn({
      "base-class": true,
      "active": true,
      "disabled": false,
      "hidden": undefined
    });
    expect(result).toBe("base-class active");
  });

  test("merges responsive Tailwind classes correctly", () => {
    const result = cn(
      "w-full md:w-1/2",
      "md:w-1/3",
      "lg:w-1/4"
    );
    expect(result).toBe("w-full md:w-1/3 lg:w-1/4");
  });

  test("handles empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  test("deduplicates identical classes", () => {
    const result = cn(
      "text-center",
      "text-center",
      "text-center"
    );
    expect(result).toBe("text-center");
  });
});
