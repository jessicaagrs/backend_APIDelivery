export interface OrderAnalytics {
    months: string[];
    totalValues: number[];
    totalOrders: number[];
    status?: string[];
}

export interface CustomersAnalytics {
    months: string[];
    newCustomers: number[];
}

export interface ShopmansAnalytics {
    months: string[];
    totalValues: number[];
    totalOrders: number[];
    shopmans: string[];
}
