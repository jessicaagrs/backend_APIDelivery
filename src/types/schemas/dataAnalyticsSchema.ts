import { Type } from "@sinclair/typebox";

const DataAnalyticsOrdersByMonthSchema = Type.Object({
    months: Type.Array(Type.String()),
    totalValues: Type.Array(Type.Number()),
    totalOrders: Type.Array(Type.Number()),
});

const DataAnalyticsOrdersByStatusSchema = Type.Object({
    months: Type.Array(Type.String()),
    totalValues: Type.Array(Type.Number()),
    totalOrders: Type.Array(Type.Number()),
    status: Type.Array(Type.String()),
});

const DataAnalyticsNewCustomersSchema = Type.Object({
    months: Type.Array(Type.String()),
    newCustomers: Type.Array(Type.Number()),
});

const DataAnalyticsShopmansSchema = Type.Object({
    months: Type.Array(Type.String()),
    totalValues: Type.Array(Type.Number()),
    totalOrders: Type.Array(Type.Number()),
    shopmans: Type.Array(Type.String()),
});

export {
    DataAnalyticsNewCustomersSchema,
    DataAnalyticsOrdersByMonthSchema,
    DataAnalyticsOrdersByStatusSchema,
    DataAnalyticsShopmansSchema,
};
