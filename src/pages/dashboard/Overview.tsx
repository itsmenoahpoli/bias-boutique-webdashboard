import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function Overview() {
  return (
    <div>
      <PageMeta
        title="Dashboard Overview | Bias Boutique Dashboard"
        description="Overview dashboard for Bias Boutique admin panel"
      />
      <PageBreadcrumb pageTitle="Dashboard Overview" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Dashboard Overview
        </h3>
      </div>
    </div>
  );
}
