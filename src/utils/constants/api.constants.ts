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
        addUser: `${PAGE_ORIGIN}/api/storages/addUser`
    },
    shelves: {
        main: `${PAGE_ORIGIN}/api/shelves`,
        getAll: (storageId: number) => `${PAGE_ORIGIN}/api/shelves/${storageId}`
    },
    products: {
        getAll: (shelfId: number) => `${PAGE_ORIGIN}/api/products/${shelfId}`
    }
};
