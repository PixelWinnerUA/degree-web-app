import { GetProductsQuery } from "@utils/typings/types/products/products.types";
import { GetStatisticsDto } from "@utils/typings/types/supplier/supplier.types";

const PAGE_ORIGIN = import.meta.env.VITE_API_URL;

export const API_URLS = {
    auth: {
        login: `${PAGE_ORIGIN}/api/auth/login`,
        register: `${PAGE_ORIGIN}/api/auth/register`
    },
    getUserData: `${PAGE_ORIGIN}/api/users`,
    storages: {
        main: `${PAGE_ORIGIN}/api/storages`,
        getById: (id: number) => `${PAGE_ORIGIN}/api/storages/${id}`,
        deleteUser: `${PAGE_ORIGIN}/api/storages/deleteUser`,
        addUser: `${PAGE_ORIGIN}/api/storages/addUser`,
        list: `${PAGE_ORIGIN}/api/storages/list`
    },
    shelves: {
        main: `${PAGE_ORIGIN}/api/shelves`,
        getAll: (storageId: number) => `${PAGE_ORIGIN}/api/shelves/${storageId}`
    },
    products: {
        main: `${PAGE_ORIGIN}/api/products/`,
        getAll: (query: GetProductsQuery) => {
            const baseUrl = `${PAGE_ORIGIN}/api/products/?shelfId=${query.shelfId}&page=${query.page}&limit=${query.limit}`;

            return query.name ? `${baseUrl}&name=${query.name}` : baseUrl;
        },
        search: (name: string) => `${PAGE_ORIGIN}/api/products/search/?name=${name}`
    },
    suppliers: {
        main: `${PAGE_ORIGIN}/api/suppliers/`,
        getStatistics: ({ startDate, endDate }: GetStatisticsDto) => `${PAGE_ORIGIN}/api/suppliers/statistics?startDate=${startDate}&endDate=${endDate}`
    }
};
