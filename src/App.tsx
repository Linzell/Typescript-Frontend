import React, { ReactElement, Suspense } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ThemeProvider } from "@/providers/theme-provider";
import { router } from "@/providers/router-provider";

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

import './App.css'

/**
 * Main application component that handles routing and toast notifications.
 *
 * This component is wrapped in Tailwind ThemeProvider and StrictMode at the root level
 * to provide Material-UI theming and additional development checks.
 *
 * @example
 * ```tsx
 * // Basic usage in root
 * <React.StrictMode>
 *   <App />
 * </React.StrictMode>
 * ```
 *
 * @returns {React.ReactElement} The rendered application component with routing and notifications
 * @see {@link ThemeProvider} For theme configuration
 * @see {@link BrowserRouter} For routing implementation
 * @see {@link ToastContainer} For notification system
 */
function App(): ReactElement {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Suspense fallback={<div data-testid="suspense-loading">Loading...</div>}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          {showDevtools && (
            <ReactQueryDevtoolsProduction />
          )}
          <RouterProvider router={router} />
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App
