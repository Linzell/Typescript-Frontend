import { lazy } from "react";
import { z } from "zod";

import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { AuthProvider, useAuthContext } from "@/providers/auth-provider";

import { AuthenticatedLayout } from "@/layouts/authenticatedLayout";

import { SignInPage } from "@/pages/auth/SignInPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { LogoutPage } from "@/pages/auth/LogoutPage";

import { MedicationsPage } from "@/pages/medications/MedicationsPage";
import { MedicationDetailPage } from "@/pages/medications/MedicationDetailPage";

import { NotFound } from "@/components/NotFound";
import { ErrorComponent } from "@/components/ErrorComponent";

/**
 * Lazy loaded router devtools component for development
 */
const LazyTanStackRouterDevtools = lazy(() =>
  import("@tanstack/router-devtools").then(({ TanStackRouterDevtools }) => ({
    default: TanStackRouterDevtools,
  })),
);

/**
 * Root component that wraps the entire application
 * Provides auth context, helmet for managing document head, and toast notifications
 */
function RootComponent() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Outlet />
        <ToastContainer hideProgressBar />
        {process.env.NODE_ENV === "development" && <LazyTanStackRouterDevtools />}
      </HelmetProvider>
    </AuthProvider>
  );
}

/**
 * Protected route wrapper component that checks authentication
 * Redirects to sign in if user is not authenticated
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" search={{ redirectToPath: window.location.pathname }} />;
  }

  return children;
}

/**
 * Public route wrapper component that redirects authenticated users to the main app
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 */
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/app/medications" />;
  }

  return children;
}

/**
 * Validation schema for authentication related search parameters
 */
const AuthSharedSearch = z.object({
  redirectToPath: z.string().optional().default("/"),
});

/**
 * Validation schema for medications list search and sort parameters
 */
const MedicationsSearchSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["name", "manufacturer", "activeIngredient"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// Route Definitions
const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

// Public Routes
const publicLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => (
    <PublicOnlyRoute>
      <Outlet />
    </PublicOnlyRoute>
  ),
});

// Auth Routes
const authLayout = createRoute({
  getParentRoute: () => publicLayout,
  path: "auth",
  component: () => <Outlet />,
});

const signInRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "sign-in",
  validateSearch: AuthSharedSearch,
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "sign-up",
  validateSearch: AuthSharedSearch,
  component: SignUpPage,
});

const logoutRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "logout",
  component: LogoutPage,
});

// Protected Routes
const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "app",
  component: () => (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    </ProtectedRoute>
  ),
});

// Root redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
      return <Navigate to="/app/medications" />;
    }
    return <Navigate to="/auth/sign-in" />;
  },
});

// Medications routes
const medicationsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "medications",
  component: () => <Outlet />,
});

const medicationsListRoute = createRoute({
  getParentRoute: () => medicationsRoute,
  path: "/",
  validateSearch: MedicationsSearchSchema,
  component: MedicationsPage,
});

const medicationDetailRoute = createRoute({
  getParentRoute: () => medicationsRoute,
  path: "$medicationId",
  component: MedicationDetailPage,
});

// Not Found Route
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

// Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  publicLayout.addChildren([
    authLayout.addChildren([
      signInRoute,
      signUpRoute,
      logoutRoute,
    ]),
  ]),
  appLayout.addChildren([
    medicationsRoute.addChildren([
      medicationsListRoute,
      medicationDetailRoute,
    ]),
  ]),
  notFoundRoute,
]);

/**
 * Create and export the router instance with authentication context
 */
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

/**
 * Declare the router context type for TypeScript
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
