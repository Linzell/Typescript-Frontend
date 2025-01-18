import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { captureException, flush } from "@sentry/react";
import { useTranslation } from "react-i18next";

interface ErrorComponentProps {
  /** The error that occurred */
  error: Error;
  /** Optional custom error message to display */
  message?: string;
}

/**
 * Component that displays an error message with support contact info
 * @param props - Component props
 * @param props.error - The error that occurred
 * @param props.message - Optional custom error message to display
 */
export function ErrorComponent(props: ErrorComponentProps) {
  const { t } = useTranslation();

  useEffect(() => {
    captureException(props.error);
    void flush(2000);
  }, [props.error]);

  return (
    <div className="flex min-h-screen size-full items-center justify-center">
      <div className="flex max-w-[960px] flex-col items-center gap-x-6 sm:flex-row">
        <div className="grow text-center sm:text-left">
          <h1 className="text-xl font-semibold">
            {props.message || t("errorComponent.title")}
          </h1>
          <div className="mt-2">
            <div className="text-sm">
              <p>
                {t("errorComponent.message")}
              </p>
              <p>
                {t("errorComponent.message2")}{` `}
                <Button
                  variant="link"
                  className="h-auto p-0 text-orange-500"
                  asChild
                >
                  <a href="mailto:linzellart@gmail.com">
                    {t("errorComponent.message3")}
                  </a>
                </Button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
