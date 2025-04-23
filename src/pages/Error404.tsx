import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";

export default function Error404() {
  return (
    <>
      <PageMeta
        title="404 Not Found | Bias Boutique Dashboard"
        description="Page not found error"
      />
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="text-center">
          <img
            src="/images/error/404.svg"
            alt="404"
            className="mx-auto mb-8 h-40 w-auto dark:hidden"
          />
          <img
            src="/images/error/404-dark.svg"
            alt="404"
            className="mx-auto mb-8 hidden h-40 w-auto dark:block"
          />

          <h2 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white/90">
            Page Not Found
          </h2>
          <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
