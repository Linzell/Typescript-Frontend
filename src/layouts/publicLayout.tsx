// frontend/src/layouts/publicLayout.tsx
import { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout component for public pages (unauthenticated users)
 * Provides a consistent layout structure for auth pages
 *
 * @param props - Component properties
 * @param props.children - Child components to render within the layout
 * @param props.className - Optional CSS classes to apply to the container
 * @returns The wrapped component with public layout styling
 */
export function PublicLayout({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <div className={className} {...props}>
      <div
        className={cn(
          "flex min-h-[100vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
