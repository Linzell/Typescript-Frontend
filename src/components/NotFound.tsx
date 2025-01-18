import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { captureMessage } from "@sentry/react";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/providers/theme-provider";

/**
 * 404 Not Found page component.
 *
 * This component is rendered when a route is not found in the application.
 * It displays a 404 error message with localized text and styling based on the current theme.
 * Captures the not found event in Sentry for monitoring.
 *
 * @component
 * @example
 * ```tsx
 * <NotFound />
 * ```
 * @see {@link useTranslation} for i18n functionality
 * @see {@link useTheme} for theme styling
 * @see {@link useRouter} for routing functionality
 * @returns {JSX.Element} The rendered 404 Not Found page component with localized text
 */
export function NotFound() {
  const router = useRouter();
  const { t } = useTranslation("translation", { keyPrefix: "notFound" });
  const { theme } = useTheme();

  captureMessage("404 Not Found", {
    level: "warning",
    extra: {
      href1: router.history.location.href,
      href2: window.location.href,
      href3: router.latestLocation.href,
    },
  });

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-2.5">
        <h2 className="text-5xl font-bold">{t("title")}</h2>
        <h3 className="text-xl font-semibold">{t("description")}</h3>
        <Button variant="secondary" onClick={() => router.history.back()}>
          {t("goBack")}
        </Button>

        <Helmet>
          <style key="not-found-styles">
            {`
              html {
                background:
                  url(/images/bg-top-shine.svg) no-repeat left top,
                  url(/images/bg-bottom-shine.svg) no-repeat right bottom,
                  ${theme === "dark" ? "#0b0d11" : "#f9f9f9"};
              }

              body {
                background: transparent !important;
                color: ${theme === "dark" ? "#fcfcfc" : "#333"} !important;
              }
            `}
          </style>
        </Helmet>
      </div>
    </>
  );
}
