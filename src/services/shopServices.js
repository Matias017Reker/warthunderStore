import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../databases/database";

export const shopApi = createApi({
reducerPath: 'shopApi',
baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
endpoints: (builder) => ({
    getCategories: builder.query({
        query: () => 'categories.json',
    }),
    getProducts: builder.query({
        query: () => 'products.json',
    }),
}),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = shopApi;