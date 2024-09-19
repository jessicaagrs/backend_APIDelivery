import prismaClient from "../../../db/prisma";
import { CustomersAnalytics, OrderAnalytics } from "../../../types/model/orderModel";

class DataAnalyticsRepository {
    async getOrdersSummaryByPeriod(storeId: string, startDate: Date, endDate: Date) {
        const orders: OrderAnalytics[] = await prismaClient.$queryRaw`
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

    async getOrdersByStatusByPeriod(storeId: string, startDate: Date, endDate: Date) {
        const orders: OrderAnalytics[] = await prismaClient.$queryRaw`
                SELECT 
                  TO_CHAR("createdAt", 'MM/YYYY') AS "months",
                  "status",
                  SUM("value") AS "totalValues",
                  COUNT(*) AS "totalOrders"
                FROM "Orders"
                WHERE "storeId" = ${storeId} 
                  AND "createdAt" BETWEEN ${startDate}::timestamp AND ${endDate}::timestamp
                GROUP BY TO_CHAR("createdAt", 'MM/YYYY'), "status"
                ORDER BY TO_CHAR("createdAt", 'MM/YYYY');
              `;

        return {
            months: orders.map(row => row.months),
            status: orders.map(row => row.status),
            totalValues: orders.map(row => row.totalValues),
            totalOrders: orders.map(row => row.totalOrders),
        };
    }

    async getNewCustomersInStore(storeId: string, startDate: Date, endDate: Date) {
        const customers: CustomersAnalytics[] = await prismaClient.$queryRaw`
                    SELECT 
                          TO_CHAR(c."createdAt", 'MM/YYYY') AS "months",
                          COUNT(DISTINCT c."id") AS "newCustomers"
                    FROM "Customers" c
                        INNER JOIN "Orders" o ON o."customerId" = c."id"
                    WHERE c."createdAt" BETWEEN ${startDate}::timestamp AND ${endDate}::timestamp
                        AND o."storeId" = ${storeId} 
                    GROUP BY TO_CHAR(c."createdAt", 'MM/YYYY')
                    ORDER BY TO_CHAR(c."createdAt", 'MM/YYYY');
                  `;

        return {
            months: customers.map(row => row.months),
            newCustomers: customers.map(row => row.newCustomers),
        };
    }
}

export default DataAnalyticsRepository;
