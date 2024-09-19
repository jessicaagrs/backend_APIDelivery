import DataAnalyticsRepository from "../../repositories/dataAnalytics/dataAnalytics";

const dataAnalyticsRepository = new DataAnalyticsRepository();

class DataAnalyticsService {
    async getTotalOrdersFromPeriod(
        storeId: string | undefined,
        startDate: Date | undefined,
        endDate: Date | undefined
    ) {
        if (!storeId || !startDate || !endDate) {
            throw new Error("O id da loja, a data inicial e final são necessários para a pesquisa");
        }
        const orders = await dataAnalyticsRepository.getTotalOrdersFromPeriod(storeId, startDate, endDate);

        if (!orders) {
            return {
                months: [],
                totalValues: [],
                totalOrders: [],
            };
        }

        return orders;
    }
}

export default DataAnalyticsService;
