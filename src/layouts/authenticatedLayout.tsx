import { ReactElement, ReactNode } from "react";

/**
 * Wraps a component with an authenticated container that provides the default application layout.
 * This layout ensures proper styling and structure for authenticated pages.
 *
 * @param props - Component properties
 * @param props.children - Child components to render within the layout
 * @param props.className - Optional CSS classes to apply to the outer container
 * @returns The wrapped component with authenticated layout styling
 */
export function AuthenticatedLayout({
  children,
  className,
  ...props
}: {
  className?: string;
  children: ReactNode;
}): ReactElement | null {

  return (
    <>
      <div className={className} {...props}>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {children}
        </div>
      </div>
    </>
  );
};
