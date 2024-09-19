import DataAnalyticsRepository from "../../repositories/dataAnalytics/dataAnalytics";

const dataAnalyticsRepository = new DataAnalyticsRepository();

class DataAnalyticsService {
    async getOrdersSummaryByPeriod(storeId: string, startDate: Date, endDate: Date) {
        const orders = await dataAnalyticsRepository.getOrdersSummaryByPeriod(storeId, startDate, endDate);

        if (!orders) {
            return {
                months: [],
                totalValues: [],
                totalOrders: [],
            };
        }

        return orders;
    }

    async getOrdersByStatusByPeriod(storeId: string, startDate: Date, endDate: Date) {
        const orders = await dataAnalyticsRepository.getOrdersByStatusByPeriod(storeId, startDate, endDate);

        if (!orders) {
            return {
                months: [],
                status: [],
                totalValues: [],
                totalOrders: [],
            };
        }

        return orders;
    }

    async getNewCustomersInStore(storeId: string, startDate: Date, endDate: Date) {
        const customers = await dataAnalyticsRepository.getNewCustomersInStore(storeId, startDate, endDate);

        if (!customers) {
            return {
                months: [],
                newCustomers: [],
            };
        }

        return customers;
    }
}

export default DataAnalyticsService;
