import PageBreadcrumb from "../../components/_archives/common/PageBreadCrumb";
import ComponentCard from "../../components/_archives/common/ComponentCard";
import BarChartOne from "../../components/_archives/charts/bar/BarChartOne";
import PageMeta from "../../components/_archives/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
