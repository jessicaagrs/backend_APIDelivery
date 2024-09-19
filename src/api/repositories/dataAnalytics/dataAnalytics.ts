import prismaClient from "../../../db/prisma";
import { OrderByMonth } from "../../../types/model/orderModel";

class DataAnalyticsRepository {
    async getTotalOrdersFromPeriod(storeId: string, startDate: Date, endDate: Date) {
        const orders: OrderByMonth[] = await prismaClient.$queryRaw`
                SELECT 
                  TO_CHAR("createdAt", 'MM/YYYY') AS "months",
                  SUM("value") AS "totalValues",
                  COUNT(*) AS "totalOrders"
                FROM "Orders"
                WHERE "storeId" = ${storeId} 
                AND "createdAt" BETWEEN ${startDate}::timestamp AND ${endDate}::timestamp
                GROUP BY TO_CHAR("createdAt", 'MM/YYYY')
                ORDER BY TO_CHAR("createdAt", 'MM/YYYY');
              `;

        return {
            months: orders.map(row => row.months),
            totalValues: orders.map(row => row.totalValues),
            totalOrders: orders.map(row => row.totalOrders),
        };
    }
}

export default DataAnalyticsRepository;
