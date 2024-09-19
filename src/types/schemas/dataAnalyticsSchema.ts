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

export { DataAnalyticsOrdersByMonthSchema, DataAnalyticsOrdersByStatusSchema };
