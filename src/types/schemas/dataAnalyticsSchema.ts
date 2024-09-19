import { Type } from "@sinclair/typebox";

const DataAnalyticsSchema = Type.Object({
    months: Type.Array(Type.String()),
    totalValues: Type.Array(Type.Number()),
    totalOrders: Type.Array(Type.Number()),
});

export { DataAnalyticsSchema };
