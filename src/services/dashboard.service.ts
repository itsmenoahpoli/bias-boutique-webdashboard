import $httpClient from "./api.service";

interface DashboardSummary {
  total_products: number;
  total_orders: number;
  total_customers: number;
}

export const useDashboardService = () => {
  const getDashboardSummary = async (): Promise<DashboardSummary> => {
    const response = await $httpClient.get("/dashboard/summary");
    return response.data;
  };

  return {
    getDashboardSummary,
  };
};
