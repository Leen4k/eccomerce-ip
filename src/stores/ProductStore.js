import { defineStore } from 'pinia';
//import ProductCard from './components/ProductCard';

export const useProductStore = defineStore('product', {
    state: () => ({
        useProductStore: [
            {
                //image: require('@/assets/product1.jpg').default,
                title: 'Product 1',
                subTitle: 'Description for Product 1',
                price: '$20',
            },
            {
                //image: require('@/assets/product2.jpg').default,
                title: 'Product 2',
                subTitle: 'Description for Product 2',
                price: '$30',
            },
            // Add more products as needed
        ],
    }),

    getters: {
        getAllProducts: (state) => {
            return state.products;
        },

        getProductById: (state) => (productId) => {
            return state.products.find((product) => product.id === productId);
        },
    },

    actions: {
        // Add any additional actions as needed
    },
});

export default useProductStore;
