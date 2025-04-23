import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function Products() {
  return (
    <div>
      <PageMeta
        title="Manage Products | Bias Boutique Dashboard"
        description="Product management dashboard for Bias Boutique admin panel"
      />
      <PageBreadcrumb pageTitle="Manage Products" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Manage Products
        </h3>
      </div>
    </div>
  );
}
